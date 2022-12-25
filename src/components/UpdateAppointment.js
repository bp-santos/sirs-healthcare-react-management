import React from "react";

function UpdateAppointment(props) {
  const modalIdentifier = "update" + props.elementId;
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
        Update
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
                Update Appointment
              </span>
              <button type="button" className="close" data-dismiss="modal">
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              First Name:
              <input
                type="text"
                name="firstName"
                value={props.singledata.firstName}
                onChange={props.handleChange}
              />
              <br></br>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={props.singledata.lastName}
                onChange={props.handleChange}
              />
              <br></br>
              Specialty:
              <select
                type="text"
                name="specialty"
                value={props.singledata.specialty}
                onChange={props.handleChange}
              >
                <option value="Orthopedy" selected>
                  Orthopedy
                </option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
              </select>
              <br></br>
              Date:
              <input
                type="datetime-local"
                placeholder="date"
                name="date"
                value={props.singledata.date}
                onChange={props.handleChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={(event) =>
                  props.updateAppointment(event, props.elementId)
                }
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UpdateAppointment;
