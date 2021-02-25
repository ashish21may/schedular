import React, { useEffect, useState } from "react";
import { Menu } from "../menu";
import { SchedularForm } from "./SchedularForm";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { addMeeting, editMeetingSchedule } from "../../actions";

export const Schedular = () => {
  const dispatch = useDispatch();
  const schedular = useSelector((state) => state.MeetingReducer.meetingData);
  const location = useLocation();
  const [editableMeeting, setEditableMeeting] = useState({});
  const [goToDashBoard, setGoToDashBoard] = useState(false);
  const id = location && location.state && location.state.id;
  const editMeeting = location && location.state && location.state.editMeeting;

  useEffect(() => {
    if (id && schedular) {
      const selectedDate = schedular.find((item) => item.id === Number(id));
      selectedDate && setEditableMeeting(selectedDate);
    }
  }, [id]);

  const submitMeetingDetails = (meetingData, editId) => {
    if (editId) {
      dispatch(editMeetingSchedule(meetingData));
    } else {
      dispatch(addMeeting(meetingData));
    }
    setGoToDashBoard(true);
  };

  if (goToDashBoard) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="schedular-container">
      <Menu />
      <h2>{editMeeting ? "Edit Meeting details" : "Create Meeting"}</h2>
      <SchedularForm
        onSubmit={submitMeetingDetails}
        initialData={editableMeeting}
      />
    </div>
  );
};
