export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const getDay = state.days.find(currentDay => currentDay.name === day);
  if (!getDay) {
    return []
  }
  const appt = getDay.appointments.map((id) => {
    return state.appointments[id]
  })
  return appt;
}


export function getInterview(state, interview){
  if(!interview){
    return null
  }
  return {student: interview.student, interviewer: state.interviewers[interview.interviewer]}
}

export function getInterviewersForDay(state, day) {
  const getDay = state.days.find(currentDay => currentDay.name === day);
  if (!getDay) {
    return []
  }
  const dayInterviewer = getDay.interviewers.map((id) => {
    return state.interviewers[id]
  })
  return dayInterviewer;
}
