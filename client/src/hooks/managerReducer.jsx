export const initialState = {
  events: [],
  users: [],
  loading: false,
  error: null,
  editingEvent: null,
  ui: {
    activeTab: "events",
    showEventForm: false,
  },
};

export const ACTIONS = {
  fetchEvents: "fetchEvents",
  fetchUsers: "fetchUsers",
  createEvent: "createEvent",
  deleteEvent: "deleteEvent",
  updateEvent: "updateEvent",
  deleteUser: "deleteUser",
  setActiveTab: "setActiveTab",
  setError: "setError",
  setLoading: "setLoading",
  setEditingEvent: "setEditingEvent",
  setShowEventForm: "setShowEventForm",
};

export function managerReducer(state, action) {
  switch (action.type) {
    case ACTIONS.fetchEvents:
      return { ...state, events: action.payload };

    case ACTIONS.fetchUsers:
      return { ...state, users: action.payload };

    case ACTIONS.createEvent:
      return { ...state, events: [...state.events, action.payload] };

    case ACTIONS.deleteEvent:
      return {
        ...state,
        events: state.events.filter((e) => e.id !== action.payload),
      };
    case ACTIONS.setShowEventForm:
      return {
        ...state,
        ui: { ...state.ui, showEventForm: action.payload },
      };

    case ACTIONS.setActiveTab:
      return {
        ...state,
        ui: { ...state.ui, activeTab: action.payload },
      };

    case ACTIONS.setLoading:
      return { ...state, loading: action.payload };

    case ACTIONS.setError:
      return { ...state, error: action.payload };

    case ACTIONS.updateEvent:
      return {
        ...state,
        events: state.events.map((e) =>
          e.id === action.payload.id ? action.payload : e,
        ),
        editingEvent: null,
      };

    default:
      return state;
  }
}
