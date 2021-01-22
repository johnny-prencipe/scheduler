export function getAppointmentsForDay(state, day) {
  const appointments = [];
  
  state.days.forEach(item => {
    if (item.name === day) {
      for (const id of item.appointments) {
        appointments.push(state.appointments[id]);
      }
    }
  });
  return appointments;
};