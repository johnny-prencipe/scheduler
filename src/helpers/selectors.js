const getAppointmentsForDay = (state, day) => {
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

const getInterview = (state, interview) => {
  const returnObj = {};
  if (!interview) return null;

  for (let id in state.interviewers) {
    if (interview.interviewer === state.interviewers[id].id) {
      returnObj.student = interview.student;
      returnObj.interviewer = state.interviewers[id];
    }
  }

  return returnObj;
}

const getInterviewersForDay = (state, day) => {
  const interviewers = [];

  state.days.forEach(interviewer => {
    if (interviewer.name === day) {
      for (const id of interviewer.interviewers) {
        interviewers.push(state.interviewers[id]);
      }
    }
  });

  return interviewers;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };