import React, { useState, useEffect } from "react";
import { MultipleInputBox } from "./MultipleInputBox";
import { useLocation } from "react-router-dom";

export const SchedularForm = ({ onSubmit, initialData = {} }) => {
  const [meetingData, setMeetingData] = useState(initialData);
  const [attendeeEmails, setAttendeeEmails] = useState([]);
  const [noEmailError, setNoEmailError] = useState(false);
  const location = useLocation();
  const editMeeting = location && location.state && location.state.editMeeting;

  useEffect(()=>{
    !editMeeting && setMeetingData({})
  }, [editMeeting])

  useEffect(() => {
    if (Object.keys(initialData).length !== 0) {
      const currentData = { ...initialData };
      setMeetingData(initialData);
      setAttendeeEmails(currentData.emails);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleEmailDetails = (emails) => {
    setMeetingData({ ...meetingData, emails });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...meetingData };
    if (updatedData.emails && updatedData.emails.length) {
      const cellId = new Date(updatedData.date).getDate();
      updatedData.id = cellId;
      Object.keys(initialData).length === 0
        ? onSubmit(updatedData)
        : onSubmit(updatedData, cellId);
    } else {
      setNoEmailError(true);
    }
  };

  return (
    <div className="schedular-form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="date">
            Date
          </label>
          <input
            className="form-input"
            type="date"
            name="date"
            min="2021-02-01"
            max="2021-02-28"
            value={meetingData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            name="name"
            value={meetingData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="description">
            Description
          </label>
          <input
            className="form-input"
            type="text"
            name="description"
            value={meetingData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="attendees">
            Attendees
          </label>
          <MultipleInputBox
            onEmailUpdate={handleEmailDetails}
            attendeeEmails={attendeeEmails}
            noEmailError={noEmailError}
          />
        </div>

        <div className="form-group">
          <button type="submit" name="button">
            {" "}
            Submit{" "}
          </button>
        </div>
      </form>
    </div>
  );
};
