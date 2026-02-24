export const initialState = {
  data: {
    eventsAll: [],
    users: [],
  },
  status: {
    loading: false,
    error: null,
  },

  ui: {
    manager: {
      activeTab: "events",
      showEventForm: false,
      editingEvent: null,
    },
    users: {},
  },
};

export const ACTIONS = {
  setEventsAll: "setEventsAll",
  setUsers: "setUsers",

  createEvent: "createEvent",
  deleteEvent: "deleteEvent",
  updateEvent: "updateEvent",

  setActiveTab: "setActiveTab",
  setEditingEvent: "setEditingEvent",
  setShowEventForm: "setShowEventForm",

  setError: "setError",
  setLoading: "setLoading",
};

export function appReducer(state, action) {
  switch (action.type) {
    // get users and events
    case ACTIONS.setEventsAll:
      return {
        ...state,
        data: { ...state.data, eventsAll: action.payload },
      };
    case ACTIONS.setUsers:
      return { ...state, data: { ...state.data, users: action.payload } };

    // Create, delete and update event.
    case ACTIONS.createEvent:
      return {
        ...state,
        data: {
          ...state.data,
          eventsAll: [...state.data.eventsAll, action.payload],
        },
      };

    case ACTIONS.deleteEvent:
      return {
        ...state,
        data: {
          ...state.data,
          eventsAll: state.data.eventsAll.filter(
            (e) => e.id !== action.payload,
          ),
        },
      };

    case ACTIONS.updateEvent:
      return {
        ...state,
        data: {
          ...state.data,
          eventsAll: state.data.eventsAll.map((e) =>
            e.id === action.payload.id ? action.payload : e,
          ),
        },
        ui: {
          ...state.ui,
          manager: { ...state.ui.manager, editingEvent: null },
        },
      };

    // ui-manager
    case ACTIONS.setShowEventForm:
      return {
        ...state,
        ui: {
          ...state.ui,
          manager: { ...state.ui.manager, showEventForm: action.payload },
        },
      };

    case ACTIONS.setActiveTab:
      return {
        ...state,
        ui: {
          ...state.ui,
          manager: { ...state.ui.manager, activeTab: action.payload },
        },
      };
    case ACTIONS.setEditingEvent:
      return {
        ...state,
        ui: {
          ...state.ui,
          manager: { ...state.ui.manager, editingEvent: action.payload },
        },
      };

    // status
    case ACTIONS.setLoading:
      return { ...state, status: { ...state.status, loading: action.payload } };

    case ACTIONS.setError:
      return { ...state, status: { ...state.status, error: action.payload } };

    default:
      return state;
  }
}
