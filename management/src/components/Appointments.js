import React from "react";
import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteAppointment";

function Appointments(props) {
  var rows = [];
  var confirmed = "";
  var specialty = "";
  var description = "";
  props.alldata.forEach((element) => {
    if (element.is_confirmed === 0) confirmed = "Not confirmed";
    if (element.is_confirmed === 1) confirmed = "Confirmed";

    if (element.specialty_id === 1) specialty = "Orthopedy";
    if (element.specialty_id === 2) specialty = "Cardiology";
    if (element.specialty_id === 3) specialty = "Dermatology";

    if (element.description === "") description = "None";
    else description = element.description;

    props.doctors.forEach((doctor) => {
      if (element.doctor_id === doctor.id) {
        element.doctor_id = doctor.name;
      }
    });

    props.patients.forEach((patient) => {
      if (element.patient_id === patient.id) {
        element.patient_id = patient.name;
      }
    });

    rows.push(
      <tr key={element.id}>
        <td>{element.title}</td>
        <td>{description}</td>
        <td>{element.date.slice(0, 10)}</td>
        <td>{element.time}</td>
        <td>{confirmed}</td>
        <td>{element.patient_id}</td>
        <td>{element.doctor_id}</td>
        <td>{specialty}</td>
        <td>
          <UpdateAppointment
            elementId={element.id}
            singledata={props.singledata}
            doctors={props.doctors}
            patients={props.patients}
            getAppointment={props.getAppointment}
            updateAppointment={props.updateAppointment}
            handleChange={props.handleChange}
          ></UpdateAppointment>
        </td>
        <td>
          <DeleteAppointment
            elementId={element.id}
            singledata={props.singledata}
            doctors={props.doctors}
            getAppointment={props.getAppointment}
            deleteAppointment={props.deleteAppointment}
          ></DeleteAppointment>
        </td>
      </tr>
    );
  });
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          <th>Patient</th>
          <th>Doctor</th>
          <th>Specialty</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Appointments;
