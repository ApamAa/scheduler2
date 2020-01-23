import React, { useState, useEffect } from "react";
import DayList from "../components/DayList";
import Appointment from "../components/Appointment";
import "components/Application.scss";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png(3 kB)",
      }
    }
  },
  {
    id: 3,
    time: "10am",
    interview: {
      student: "Apama",
      interviewer: {
        id: 1,
        name: "Leonardo Da Vinci",
        avatar: "https://pbs.twimg.com/profile_images/658475024047849472/Gf0oMwxg_400x400.jpg",

      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Mounika",
      interviewer: {
        id: 1,
        name: "michelangelo",
        avatar: "https://is4-ssl.mzstatic.com/image/thumb/Purple91/v4/4f/3c/71/4f3c718a-aeda-e995-e549-8f6bb8b10025/source/256x256bb.jpg",
      }
    }
  },
  {
    id: 5,
    time: "11:30pm",
    interview: {
      student: "Evelyn",
      interviewer: {
        id: 1,
        name: "Vincent Van Gohg",
        avatar: "https://news.artnet.com/app/news-upload/2014/11/Vincent-Van-Gogh-Self-Portrait-256x256.jpg",

      }
    }
  }
];

export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });


  useEffect(() => {
    axios.get("http://localhost:8001/api/days").then(response => setDays(response.data));
  }, []);
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
      {appointments.map(appointment =>  {
        return (
        <Appointment
          key={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
          />)
      })
    }
        <Appointment key="last" time="5pm" />
      </section>
     </main>
  );
}
