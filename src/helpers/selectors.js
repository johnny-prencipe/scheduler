export default function getAppointmentsForDay(state, day) {
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

