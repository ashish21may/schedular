export const addMeeting = (meetingData) => {
  return { type: "ADD", payload: {meetingData} };
};
export const editMeetingSchedule = (meetingData) => {
  return { type: "EDIT", payload: { meetingData, id: meetingData.id } };
};
