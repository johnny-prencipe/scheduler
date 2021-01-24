function getAppointmentsForDay(state, day) {
  const appointments = [];
  
  state.days.forEach(appointment => {
    if (appointment.name === day) {
      for (const id of appointment.appointments) {
        appointments.push(state.appointments[id]);
      }
    }
  });
  return appointments;
};

function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const returnObj = {};
  for (const id in state.interviewers) {
    if (interview.interviewer === state.interviewers[id].id) {
      returnObj.student = interview.student;
      returnObj.interviewer = state.interviewers[id];
    }
  }

  return returnObj;
}

export { getAppointmentsForDay, getInterview };