import React, { useState, useEffect } from "react";
import { MultipleInputBox } from "./MultipleInputBox";

export const SchedularForm = ({ onSubmit, initialData = {} }) => {
  const [meetingData, setMeetingData] = useState(initialData);
  const [attendeeEmails, setAttendeeEmails] = useState([]);
  const [noEmailError, setNoEmailError] = useState(false);

  useEffect(() => {
    if (Object.keys(initialData).length !== 0 ) {
      const currentData = {...initialData};
      console.log(currentData)
      setMeetingData(initialData)
      setAttendeeEmails(currentData.emails)
    }
  }, [initialData])

  const handleInputChange = (e) => {
    setMeetingData({ ...meetingData, [e.target.name]: e.target.value });
  };

  const handleEmailDetails = (emails) => {
    setMeetingData({ ...meetingData, emails });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {...meetingData};
    if(updatedData.emails && updatedData.emails.length) {
      const cellId = new Date(updatedData.date).getDate();
      updatedData.id = cellId;
      Object.keys(initialData).length === 0 ? onSubmit(updatedData) : onSubmit(updatedData, cellId);
    } else {
      setNoEmailError(true)
    }

  };

  return (
    <div className="schedular-form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" for="date">
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
          <label className="form-label" for="name">
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
          <label className="form-label" for="description">
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
          <label className="form-label" for="attendees">
            Attendees
          </label>
          <MultipleInputBox onEmailUpdate={handleEmailDetails} attendeeEmails={attendeeEmails} noEmailError={noEmailError}/>
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
