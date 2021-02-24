import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Menu } from "../menu";
import { PopUp } from "./PopUp";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const [editMeeting, setEditMeeting] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [selectedCell, setSelectedCell] = useState();
  const [scheduledDates, setScheduledDates] = useState([]);
  const schedular = useSelector((state) => state.MeetingReducer.meetingData);

  useEffect(() => {
    setEditMeeting(false);
    return () => setSelectedCell(null);
  }, []);

  useEffect(() => {
    if (schedular) {
      const scheduledDates = schedular.map((item) => item.id);
      scheduledDates && setScheduledDates(scheduledDates);
    }
    selectedCell && setShowPopUp(true);
  }, [selectedCell, schedular]);

  // below is set of hardcoded data but can be made generic in future as per need
  const weekOne = [1, 2, 3, 4, 5, 6, 7];
  const weekTwo = [8, 9, 10, 11, 12, 13, 14];
  const weekThree = [15, 16, 17, 18, 19, 20, 21];
  const weekFour = [22, 23, 24, 25, 26, 27, 28];

  const daysInMonth = [weekOne, weekTwo, weekThree, weekFour];
  const daysInWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  let timer = 0;
  let delay = 200;

  const meetingSchedular = (e, cell) => {
    // clearTimeout(timer);
    setEditMeeting(true);
    setSelectedCell(cell);
  };

  const meetingDetailsPopUp = (e, cell) => {
    timer = setTimeout(function () {
      setSelectedCell(cell);
    }, delay);
  };

  const closePopUp = () => {
    setShowPopUp(!showPopUp);
  };

  if (editMeeting) {
    return (
      <Redirect
        to={{
          pathname: "/schedular",
          state: { id: selectedCell, editMeeting },
        }}
      />
    );
  }

  return (
    <div className="dashboard">
      <Menu />
      <h2>Feburary 2021</h2>
      <div className="calender-container">
        <div className="calender-days-name">
          {daysInWeek.map((weekDay, index) => (
            <div key={`${weekDay}-${index}`} className="calender-cell">
              {weekDay}
            </div>
          ))}
        </div>
        {daysInMonth.map((day, index) => {
          return (
            <div key={`${day}-${index}`} className="calender-week">
              {" "}
              {day.map((cell) => (
                <div
                  key={cell}
                  id={cell}
                  className={`calender-cell ${
                    cell === selectedCell ? "colored-cell" : ""
                  }`}
                  onClick={(e) => meetingDetailsPopUp(e, cell)}
                  onDoubleClick={(e) => meetingSchedular(e, cell)}
                >
                  <div>{cell}</div>
                  {scheduledDates.find(
                    (value) => Number(value) === Number(cell)
                  ) ? (
                    <div className="calender-cell-blue-circle"> </div>
                  ) : null}
                </div>
              ))}{" "}
            </div>
          );
        })}
      </div>
      <div className="popup-box">
        {showPopUp ? (
          <PopUp onToggle={closePopUp} selectedCell={selectedCell} />
        ) : null}
      </div>
    </div>
  );
};
