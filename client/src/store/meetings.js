const GET_MEETING = "meeting/single";
const GET_MEETINGS = "meeting/all";

const loadMeeting = (meeting) => {
  return {
    type: GET_MEETING,
    meeting: meeting,
  };
};

const loadMeetings = (meetings) => {
  return {
    type: GET_MEETINGS,
    meetings: meetings,
  };
};

export const getMeetings = () => {
  return async (dispatch) => {
    const res = await fetch("/api/meetings", {
      method: "GET",
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadMeetings(res.data.meetings));
    }
    return res;
  };
};

export default function meetingsReducer(state = {}, action) {
  switch (action.type) {
    case GET_MEETING:
      return { ...state, meeting: action.meeting };
    case GET_MEETINGS:
      return { ...state, meetings: action.meetings };
    default:
      return state;
  }
}
