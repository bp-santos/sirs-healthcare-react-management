import React from "react";

function CreateAppointment(props) {
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#myModal"
      >
        Create new appointment
      </button>
      <div
        className="modal fade"
        id="myModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title" id="exampleModalLabel">
                New appointment
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
              <br />
              Last Name:
              <input
                type="text"
                name="lastName"
                value={props.singledata.lastName}
                onChange={props.handleChange}
              />
              <br />
              Specialty:
              <select
                type="text"
                name="specialty"
                value={props.singledata.specialty}
                onChange={props.handleChange}
              >
                <option value="Orthopedy">Orthopedy</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
              </select>
              <br />
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
                onClick={props.createAppointment}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreateAppointment;
