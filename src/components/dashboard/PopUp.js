import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';

export const PopUp = ({ onToggle, selectedCell }) => {
  const schedular = useSelector(state => state.meetingData)
  const [meetingDetails, setMeetingDetails] = useState({})

  useEffect(() => {
    if(selectedCell) {
      const selectedMeeting = schedular.find(item => item.id === Number(selectedCell));
      selectedMeeting && setMeetingDetails(selectedMeeting);
    }
    return ()=> setMeetingDetails({})
  }, [selectedCell])

  const closePopUp = () => {
    onToggle();
  };

  return (
    <div className="pop-up" id="popup">
      {meetingDetails.id ? (
        <>
        <h3>Meeting Details for the selected Date</h3>
        <div className="content"> 
          <ul>
            <li>Name: <span>{meetingDetails.name}</span></li>
            <li>Date: <span>{meetingDetails.date}</span></li>
            <li>Description: <span>{meetingDetails.description}</span></li>
            <li>Attendees are: <ul>{meetingDetails.emails && meetingDetails.emails.map(user=>{
              return <li> {user} </li>
            })}</ul></li>
          </ul>
         </div>
        <div class="actions">
          <button class="toggle-button" onClick={closePopUp}>
            close
          </button>
        </div>
        </>
      ):<> 
      <div className="content"> No Meeting scheduled </div>
      <div class="actions">
      <button class="toggle-button" onClick={closePopUp}>
        close
      </button>
    </div>
    </>}
    </div>
  );
};
