import React from "react";
import DayList from "../components/DayList";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import {getAppointmentsForDay, getInterview} from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
    const { state, setDay, bookInterview, cancelInterview } = useApplicationData();
    const appointments = getAppointmentsForDay(state, state.day);
    const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    //console.log("appointment", appointment)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        interviewersDay={state.interviewersDay}
        cancelInterview={cancelInterview}
      />

      );
    }); 
  
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the “Project Setup & Familiarity” activity. */}
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
       {schedule}
        <Appointment key="last" time="5pm" />
      </section>
     </main>
  );
}
