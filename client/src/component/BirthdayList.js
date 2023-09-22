import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const BirthdayList = () => {

  const [birthdayData, setBirthdayData] = useState([]);
  const [isData, setIsData] = useState(false);

  const getAllBirthdays = async () => {
    try {
      const token = localStorage.getItem("usersdatatoken");
      const data = await fetch(`${BASE_URL}/api/get-all-dobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token
        }
      });
      const res = await data.json();

      if(data.status === 201) {
        setIsData(true);
        setBirthdayData(res.data);
      }
      if(data.status === 422) {
        setIsData(false);
        toast.error(res.message);
      }

    } catch (error) {
      toast.error("Something went wrong please try again");
    }
  }

  useEffect(()=> {
    getAllBirthdays();
  }, []);

  return (
    <>
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {
              isData ?
                (
                  birthdayData.map((data, index)=> {
                    return (
                      <tr >
                        <td>{ data.name }</td>
                        <td>{ data.email }</td>
                        <td>{ data.dob.split('T')[0] }</td>
                      </tr>
                    )
                  })
                  // <></>
                )
              :
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100vh",
                    }}
                  >
                    Loading... &nbsp;
                    <CircularProgress />
                  </Box>
                </>
            }
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default BirthdayList;
