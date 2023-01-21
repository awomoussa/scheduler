import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./DayListItem.scss"


export default function DayListItem(props) {

  const [spotNumber, setSpotNumber] = useState(props.spots)//"1"

  const formatSpots = (spots) => {
    if (spots === 0) {
      setSpotNumber('no')
    }
    else {
      setSpotNumber(String(spots))
    }
  }

  useEffect(() => {
    formatSpots(props.spots)
  }, [props.spots]) //


  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  return (
    <li data-testid="day" onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{spotNumber} {spotNumber === 'no' || props.spots > 1 ? 'spots' : 'spot'} remaining</h3>
    </li>
  );
}
