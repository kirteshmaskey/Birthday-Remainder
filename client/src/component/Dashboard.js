import React, { useContext, useEffect, useState } from "react";
import CircluarLoading from "./reusable/CircularLoading";
import { useNavigate } from "react-router-dom";
import dataNotFound from "../images/dataNotFound.webp";
import { toast } from "react-toastify";
import { LoginContext } from "./ContextProvider/Context";
import BirthdayList from "./BirthdayList";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Dashboard = () => {
  const { validLogin, setValidLogin } = useContext(LoginContext);
  const [todaysBirthday, setTodaysBirthday] = useState([]);
  const [upcomingBirthday, setUpcomingBirthday] = useState([]);
  const [allBirthday, setAllBirthday] = useState();

  const navigate = useNavigate();

  const getAllBirthdays = async () => {
    try {
      const token = localStorage.getItem("usersdatatoken");
      const data = await fetch(`${BASE_URL}/api/get-all-dobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const res = await data.json();

      if (data.status === 201) {
        setBirthday(res.data);
        setValidLogin(true);
      } else if (data.status === 422) {
        toast.error(res.message);
      } else if (data.status === 403) {
        setValidLogin(false);
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  };

  const setBirthday = (birthday) => {
    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the date 15 days from now
    const inFifteenDays = new Date();
    inFifteenDays.setDate(today.getDate() + 15);

    // Sort data by day and month, then by year if day and month are the same
    const sortedData = [...birthday].sort((a, b) => {
      const dobA = new Date(a.dob);
      const dobB = new Date(b.dob);
      if (
        dobA.getMonth() === dobB.getMonth() &&
        dobA.getDate() === dobB.getDate()
      ) {
        return dobA.getFullYear() - dobB.getFullYear();
      }
      dobA.setFullYear(2000); // Use a common year for comparison
      dobB.setFullYear(2000); 
      return dobA.getTime() - dobB.getTime();
    });

    // Filter data for birthdays today
    const birthdaysToday = sortedData.filter((person) => {
      const dob = new Date(person.dob);
      return (
        dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()
      );
    });

    // Filter data for birthdays in the next 15 days, excluding today
    const birthdaysInNextFifteenDays = sortedData.filter((person) => {
      const dobThisYear = new Date(person.dob);
      dobThisYear.setFullYear(today.getFullYear());
      const dobNextYear = new Date(person.dob);
      dobNextYear.setFullYear(today.getFullYear() + 1);
      return (
        (dobThisYear.getDate() !== today.getDate() &&
          dobThisYear.getMonth !== today.getMonth()) &&
        ((dobThisYear.getTime() > today.getTime() &&
          dobThisYear.getTime() <= inFifteenDays.getTime()) ||
        (dobNextYear.getTime() > today.getTime() &&
          dobNextYear.getTime() <= inFifteenDays.getTime()))
      );
    });

    setTodaysBirthday(birthdaysToday);
    setUpcomingBirthday(birthdaysInNextFifteenDays);
    setAllBirthday(sortedData);
  };

  useEffect(() => {
    getAllBirthdays();
  }, []);

  return (
    <>
      {validLogin ? (
        <>
          <div className="container col-12 col-lg-8 mt-5">
            <div className="container">
              <div className="row text-center">
                <div className="col-12 col-md-6 my-4">
                  <h4>Today's Birthday</h4>
                  <table className="container col-8 col-md-6">
                    <BirthdayList birthday={todaysBirthday} showDOB={false} />
                  </table>
                </div>
                <div className="col-12 col-md-6 my-4">
                  <h4>Upcoming Birthday</h4>
                  <table className="container col-8 col-md-6">
                    <BirthdayList birthday={upcomingBirthday} showDOB={true} />
                  </table>
                </div>
              </div>
              <hr />
              <div className="row text-center">
                <div className="col-12 my-4">
                  <h4>All Birthdays</h4>
                  <table className="table table-striped border w-100">
                    <thead>
                      <tr>
                        <th className="text-center">Name</th>
                        <th className="text-center">DOB</th>
                      </tr>
                    </thead>
                    <BirthdayList birthday={allBirthday} showDOB={true} />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <CircluarLoading />
        </>
      )}
    </>
  );
};

export default Dashboard;
