import { useState } from "react";

const BirthdayList = ({ birthday, showDOB }) => {
  const [user, setUser] = useState(null);
  
  const ShowModal = () => {
    return (
      <div
        className={`modal fade ${user ? "show d-block" : ""}`}
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        onClick={() => setUser(null)}
      >
        <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="staticBackdropLabel">
                {user?.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setUser(null)}
              /> 
            </div>
            <div className="modal-body text-start">
              <p><span className="font-weight-bold">Name: </span> {user?.name}</p>
              <p><span className="font-weight-bold">Date of Birth: </span> {user?.dob.split("T")[0]}</p>
              <p><span className="font-weight-bold">Email: </span> {user?.email}</p>
              <p><span className="font-weight-bold">Phone Number: </span> {user?.phone}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <tbody>
        {birthday?.map((bd, index) => {
          return (
            <tr key={index} onClick={() => setUser(bd)} className="cursor-pointer">
              <td className="text-center">{bd.name}</td>
              {showDOB && (
                <td className="text-center">{bd.dob.split("T")[0]}</td>
              )}
            </tr>
          );
        })}
      </tbody>
      <ShowModal />
    </>
  );
};

export default BirthdayList;
