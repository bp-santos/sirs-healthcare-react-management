import React from "react";
import CreateAppointment from "./CreateAppointment";
import Appointments from "./Appointments";
import "./Form.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      doctors: [],
      patients: [],
      singledata: {
        title: "",
        description: "",
        date: "",
        time: "",
        is_confirmed: "",
        patient_id: "",
        doctor_id: "",
        specialty_id: "",
      },
    };
    this.getAppointments = this.getAppointments.bind(this);
    this.getAppointment = this.getAppointment.bind(this);
    this.createAppointment = this.createAppointment.bind(this);
    this.updateAppointment = this.updateAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getAppointments() {
    this.setState({ loading: true }, () => {
      fetch(
        "http://"
          .concat(window.location.hostname)
          .concat(":5000")
          .concat("/appointments")
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            loading: false,
            alldata: result,
          });
        })
        .catch(console.log);
    });
    this.setState({ loading: true }, () => {
      fetch(
        "http://"
          .concat(window.location.hostname)
          .concat(":5000")
          .concat("/doctors")
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            loading: false,
            doctors: result,
          });
        })
        .catch(console.log);
    });
    this.setState({ loading: true }, () => {
      fetch(
        "http://"
          .concat(window.location.hostname)
          .concat(":5000")
          .concat("/patients")
      )
        .then((res) => res.json())
        .then((result) => {
          this.setState({
            loading: false,
            patients: result,
          });
        })
        .catch(console.log);
    });
  }

  handleChange(event) {
    var title = this.state.singledata.title;
    var description = this.state.singledata.description;
    var date = this.state.singledata.date;
    var time = this.state.singledata.time;
    var patient_id = this.state.singledata.patient_id;
    var is_confirmed = this.state.singledata.is_confirmed;
    var doctor_id = this.state.singledata.doctor_id;
    var specialty_id = this.state.singledata.specialty_id;
    if (event.target.name === "title") title = event.target.value;
    if (event.target.name === "description") description = event.target.value;
    if (event.target.name === "date") date = event.target.value;
    if (event.target.name === "time") time = event.target.value;
    if (event.target.name === "is_confirmed") is_confirmed = event.target.value;
    if (event.target.name === "patient_id") patient_id = event.target.value;
    if (event.target.name === "doctor_id") doctor_id = event.target.value;
    if (event.target.name === "specialty_id") specialty_id = event.target.value;

    this.setState({
      singledata: {
        title: title,
        description: description,
        date: date,
        time: time,
        is_confirmed: is_confirmed,
        patient_id: patient_id,
        doctor_id: doctor_id,
        specialty_id: specialty_id,
      },
    });
  }

  createAppointment(e) {
    e.preventDefault();

    console.warn("The form was submitted with the following data:");
    console.warn(this.state);

    fetch(
      "http://"
        .concat(window.location.hostname)
        .concat(":5000")
        .concat("/appointments"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.singledata),
      }
    );
  }

  getAppointment(event, id) {
    this.setState(() => {
      fetch(
        "http://"
          .concat(window.location.hostname)
          .concat(":5000")
          .concat("/appointments/") + id
      )
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          this.setState({
            singledata: {
              title: result[0].title,
              description: result[0].description,
              date: result[0].date,
              time: result[0].time,
              is_confirmed: result[0].is_confirmed,
              patient_id: result[0].patient_id,
              doctor_id: result[0].doctor_id,
              specialty_id: result[0].specialty_id,
            },
          });
        });
    });
  }

  updateAppointment(event, id) {
    fetch(
      "http://"
        .concat(window.location.hostname)
        .concat(":5000")
        .concat("/appointments/") + id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state.singledata),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          singledata: {
            title: "",
            description: "",
            date: "",
            time: "",
            is_confirmed: "",
            patient_id: "",
            doctor_id: "",
            specialty_id: "",
          },
        });
        window.location.reload(false);
      });
  }

  deleteAppointment(event, id) {
    fetch(
      "http://"
        .concat(window.location.hostname)
        .concat(":5000")
        .concat("/appointments/") + id,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then(() => {
        this.setState({
          singledata: {
            title: "",
            description: "",
            date: "",
            time: "",
            is_confirmed: "",
            patient_id: "",
            doctor_id: "",
            specialty_id: "",
          },
        });
        window.location.reload(false);
      });
  }

  logOut() {
    sessionStorage.removeItem("token");
    window.location.reload(false);
  }

  render() {
    const AppointmentAppointments = (
      <Appointments
        alldata={this.state.alldata}
        doctors={this.state.doctors}
        patients={this.state.patients}
        singledata={this.state.singledata}
        getAppointment={this.getAppointment}
        updateAppointment={this.updateAppointment}
        deleteAppointment={this.deleteAppointment}
        handleChange={this.handleChange}
      />
    );

    return (
      <div className="container">
        <span className="title-bar">
          <button
            type="button"
            className="btn btn-primary space-right"
            onClick={this.getAppointments}
          >
            Get appointments
          </button>
          <CreateAppointment
            getAppointments={this.getAppointments}
            doctors={this.state.doctors}
            patients={this.state.patients}
            createAppointment={this.createAppointment}
            handleChange={this.handleChange}
          />
          <button
            type="button"
            className="btn btn-info space-left"
            onClick={this.logOut}
          >
            Log-out
          </button>
        </span>
        <br></br>
        <div className="space-bottom"></div>
        {AppointmentAppointments}
      </div>
    );
  }
}

export default Form;
