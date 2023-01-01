import React from "react";

function CreateAppointment(props) {
  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-info"
        data-toggle="modal"
        data-target="#myModal"
        onClick={props.getAppointments}
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
            <div className="modal-body form-flex">
              Title:
              <input type="text" name="title" onChange={props.handleChange} />
              Date:
              <input type="date" name="date" onChange={props.handleChange} />
              Time:
              <input type="time" name="time" onChange={props.handleChange} />
              Patient:
              <input
                type="number"
                name="patient_id"
                onChange={props.handleChange}
              />
              Doctor:
              <select
                type="number"
                name="doctor_id"
                onChange={props.handleChange}
              >
                <option hidden value="">
                  Select one below
                </option>
                {props.doctors.map((doctor) => (
                  <option value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
              Specialty:
              <select
                type="number"
                name="specialty_id"
                onChange={props.handleChange}
              >
                <option hidden value="">
                  Select one below
                </option>
                <option value="1">Orthopedy</option>
                <option value="2">Cardiology</option>
                <option value="3">Dermatology</option>
              </select>
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
