import { useState, useEffect } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    //axios request here...
    const daysReq = Axios.get("/api/days")
    const apptReq = Axios.get("/api/appointments")
    const intReq = Axios.get("/api/interviewers")
    Promise.all([daysReq, apptReq, intReq]).then((res) => {
      setState({ ...state, days: res[0].data, appointments: res[1].data, interviewers: res[2].data })

    })
  }, [])

  function updateSpots(day, appointments) {
    let spots = 0;
    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: updateSpots(day, appointments) }
      }
      return day;
    })
    return Axios.put(`/api/appointments/${id}`, {
      interview
    }).then(() => {
      setState({
        ...state,
        appointments,
        days
      });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const days = state.days.map(day => {
      if (day.appointments.includes(id)) {
        return { ...day, spots: updateSpots(day, appointments) }
      }
      return day;
    })
    return Axios.delete(`/api/appointments/${id}`).then(() => {
      setState({
        ...state,
        appointments,
        days
      });
    });
  }

  return { cancelInterview, bookInterview, state, setDay }

}