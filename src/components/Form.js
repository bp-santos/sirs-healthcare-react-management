import React from "react";
import CreateAppointment from "./CreateAppointment";
import Appointments from "./Appointments";
import "./Form.css";

// npx json-server --watch public/json/Schedule.json --port 8000

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singledata: {
        firstName: "",
        lastName: "",
        specialty: "",
        date: "",
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
      fetch("http://localhost:8000/appointments")
        .then((res) => res.json())
        .then((result) =>
          this.setState({
            loading: false,
            alldata: result,
          })
        )
        .catch(console.log);
    });
  }

  handleChange(event) {
    var firstName = this.state.singledata.firstName;
    var lastName = this.state.singledata.lastName;
    var specialty = this.state.singledata.specialty;
    var date = this.state.singledata.date;
    if (event.target.name === "firstName") firstName = event.target.value;
    if (event.target.name === "lastName") lastName = event.target.value;
    if (event.target.name === "specialty") specialty = event.target.value;
    if (event.target.name === "date") date = event.target.value;

    this.setState({
      singledata: {
        firstName: firstName,
        lastName: lastName,
        specialty: specialty,
        date: date,
      },
    });
  }

  createAppointment() {
    fetch("http://localhost:8000/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.singledata),
    }).then(
      this.setState({
        singledata: {
          firstName: "",
          lastName: "",
          specialty: "",
          date: "",
        },
      })
    );
  }

  getAppointment(event, id) {
    this.setState(
      {
        singledata: {
          firstName: "Loading...",
          lastName: "Loading...",
          specialty: "Loading...",
          date: "Loading...",
        },
      },
      () => {
        fetch("http://localhost:8000/appointments/" + id)
          .then((res) => res.json())
          .then((result) => {
            this.setState({
              singledata: {
                firstName: result.firstName,
                lastName: result.lastName,
                specialty: result.specialty,
                date: result.date,
              },
            });
          });
      }
    );
  }

  updateAppointment(event, id) {
    fetch("http://localhost:8000/appointments/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.singledata),
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          singledata: {
            firstName: "",
            lastName: "",
            specialty: "",
            date: "",
          },
        });
        this.getAppointments();
      });
  }

  deleteAppointment(event, id) {
    fetch("http://localhost:8000/appointments/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          singledata: {
            firstName: "",
            lastName: "",
            specialty: "",
            date: "",
          },
        });
        this.getAppointments();
      });
  }

  render() {
    const AppointmentAppointments = (
      <Appointments
        alldata={this.state.alldata}
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
            className="btn btn-primary"
            onClick={this.getAppointments}
          >
            Get appointments
          </button>
          <CreateAppointment
            singledata={this.state.singledata}
            createAppointment={this.createAppointment}
            handleChange={this.handleChange}
          />
        </span>
        <br />
        {AppointmentAppointments}
      </div>
    );
  }
}

export default Form;
