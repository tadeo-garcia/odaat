const GET_MEETING = "meetings/single";
const GET_MEETINGS = "meetings/all";

const loadMeeting = (meeting) => {
  return {
    type: GET_MEETING,
    meeting,
  };
};

const loadMeetings = (meetings) => {
  return {
    type: GET_MEETINGS,
    meetings: meetings,
  };
};

export const getMeeting = (meetingId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/meetings/search_by_id?id=${meetingId}`, {
      method: "GET",
    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadMeeting(res.data.meeting));
    }
    return res;
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

export const createMeeting = (
  userId,
  title,
  location,
  description,
  date,
  time,
  lat,
  lng,
  virtual,
  zoomId,
  official
) => {
  return async (dispatch) => {
    const res = await fetch("/api/meetings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
        location,
        description,
        date,
        time,
        lat,
        lng,
        virtual,
        zoomId,
        official,
      }),
    });
    res.data = await res.json();
    if (res.ok) {
      dispatch(loadMeeting(res.data.meeting));
    }
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
