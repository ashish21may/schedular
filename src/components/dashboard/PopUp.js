import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const PopUp = ({ onToggle, selectedCell }) => {
  const schedular = useSelector((state) => state.MeetingReducer.meetingData);
  const [meetingDetails, setMeetingDetails] = useState([]);

  useEffect(() => {
    if (selectedCell && schedular) {
      const selectedMeeting = schedular.filter(
        (item) => item.id === Number(selectedCell)
      );
      console.log(selectedMeeting)
      selectedMeeting.length && setMeetingDetails(selectedMeeting);
    }
    return () => setMeetingDetails({});
  }, [selectedCell]);

  const closePopUp = () => {
    onToggle();
  };

  return (
    <div className="pop-up" id="popup">
      {meetingDetails.length ? (
        <>
          <h3>Meeting Details for the selected Date</h3>
          {meetingDetails.map((meeting,index) => {
            return (
              <div key={`${meeting.name}-${index}`} className="content">
                <ul>
                  <li>
                    <span>Name: </span>
                    <span>{meeting.name}</span>
                  </li>
                  <li>
                    <span>Date: </span>
                    <span>{meeting.date}</span>
                  </li>
                  <li>
                    <span>Description: </span>
                    <span>{meeting.description}</span>
                  </li>
                  <li>
                    <span>Attendees are: </span>
                    <ul className="margin-left-none">
                      {meeting.emails &&
                        meeting.emails.map((user, index) => {
                          return <li key={`${user}-${index}`}> {user} </li>;
                        })}
                    </ul>
                  </li>
                </ul>
              </div>
            )
          })}
          <div className="actions">
            <button className="toggle-button" onClick={closePopUp}>
              close
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="content"> No Meeting scheduled </div>
          <div className="actions">
            <button className="toggle-button" onClick={closePopUp}>
              close
            </button>
          </div>
        </>
      )}
    </div>
  );
};
