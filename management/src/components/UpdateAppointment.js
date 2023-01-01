import React from "react";
import "../App.css";

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
            <div className="modal-body form-flex">
              Title:
              <input
                type="text"
                name="title"
                disabled
                value={props.singledata.title}
                onChange={props.handleChange}
              />
              Description:
              <input
                type="text"
                name="description"
                value={props.singledata.description}
                onChange={props.handleChange}
              />
              Date:
              <input
                type="date"
                name="date"
                value={props.singledata.date.slice(0, 10)}
                onChange={props.handleChange}
              />
              Time:
              <input
                type="time"
                name="time"
                value={props.singledata.time}
                onChange={props.handleChange}
              />
              Status:
              <select
                type="number"
                name="is_confirmed"
                value={props.singledata.is_confirmed}
                onChange={props.handleChange}
              >
                <option hidden value="">
                  Select one below
                </option>
                <option value="0">Not confirmed</option>
                <option value="1">Confirmed</option>
              </select>
              Doctor:
              <select
                type="number"
                name="doctor_id"
                disabled
                value={props.singledata.doctor_id}
                onChange={props.handleChange}
              >
                {props.doctors.map((doctor) => (
                  <option value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
              Specialty:
              <select
                type="number"
                name="specialty_id"
                disabled
                value={props.singledata.specialty_id}
                onChange={props.handleChange}
              >
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
