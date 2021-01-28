import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from "./DayList"
import useApplicationData from "../hooks/useApplicationData"
import Appointment from "components/Appointment/index"
import { getAppointmentsForDay, getInterviewersForDay } from "../helpers/selectors"

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    deleteAppointment,
  } = useApplicationData()

  console.log('state: ', state)

  const dayInterviewers = getInterviewersForDay(state, state.day)
  const dailyAppointments = getAppointmentsForDay(state, state.day)

  const schedule = dailyAppointments.map(appointment => {
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={appointment.interview}
      interviewers={state.interviewers}
      dayInterviewers={dayInterviewers}
      bookInterview={bookInterview}
      onDelete={deleteAppointment}
      />
      )
    })

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
        <Appointment key={'last'} time={'5pm'} interviewers={state.interviewers} />
      </section>

    </main>
  );
}
