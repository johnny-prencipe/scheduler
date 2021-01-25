import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList.js"

import Appointment from "components/Appointment/index";
import "components/Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "helpers/selectors";

export default function Application(props) {

  const bookInterview = (id, interview) => {
    console.log(id, interview);
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const setDays = days => setState({ ...state, days });
  const setDay = day => setState(prev => ({...prev, day}));
  
  const schedule = dailyAppointments.map(appointment => {

    return (
      <Appointment
        bookInterview={bookInterview}
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
        interviewers={dailyInterviewers}
      />
    );
  });

  console.log('Schedule:', schedule);

  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days/"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then(all => {  
      const [days, appointments, interviewers] = all;
      setState(prev => ({...prev, days: days.data, appointments: appointments.data, interviewers: interviewers.data}))
    });
  }, [])

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />

      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
      </nav>

      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
