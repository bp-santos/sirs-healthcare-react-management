import React from "react";
import UpdateAppointment from "./UpdateAppointment";
import DeleteAppointment from "./DeleteAppointment";

function Appointments(props) {
  var rows = [];
  props.alldata.forEach((element) => {
    rows.push(
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.firstName}</td>
        <td>{element.lastName}</td>
        <td>{element.specialty}</td>
        <td>{element.date}</td>
        <td>
          <UpdateAppointment
            elementId={element.id}
            singledata={props.singledata}
            getAppointment={props.getAppointment}
            updateAppointment={props.updateAppointment}
            handleChange={props.handleChange}
          ></UpdateAppointment>
        </td>
        <td>
          <DeleteAppointment
            elementId={element.id}
            singledata={props.singledata}
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
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Specialty</th>
          <th>Date</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default Appointments;
