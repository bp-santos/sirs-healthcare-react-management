import React from "react";
import "../App.css";

function DeleteAppointment(props) {
  const modalIdentifier = "delete" + props.elementId;
  const dataTarget = "#" + modalIdentifier;
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target={dataTarget}
        onClick={(e) => props.getAppointment(e, props.elementId)}
      >
        Delete
      </button>
      <div
        className="modal fade"
        id={modalIdentifier}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title" id="exampleModalLabel">
                Delete Appointment
              </span>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <br></br>
            <div className="text">Are you sure you want to proceed?</div>
            <br></br>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(event) =>
                  props.deleteAppointment(event, props.elementId)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default DeleteAppointment;
