import {describe, test, expect} from 'vitest';
import {appReducer, initialState, ACTIONS} from '../appReducer.js';

describe('appReducer test', () => {


    test('should return the initial state when no action is provided', () => {
        const newState = appReducer(initialState, { type: "UNKNOWN" });
        expect(newState).toEqual(initialState);
    });

    test("setEventsAll replaces eventsAll", () => {
        const events = [{ id: 1, name: "A" }];

        const newState = appReducer(initialState, {
            type: ACTIONS.setEventsAll,
            payload: events,
        });

        expect(newState.data.eventsAll).toEqual(events);
  });

    test("setUsers replaces users", () => {
        const users = [{ id: 1, name: "User" }];

        const newState = appReducer(initialState, {
        type: ACTIONS.setUsers,
        payload: users,
        });

            expect(newState.data.users).toEqual(users);
        });

    test("createEvent appends event", () => {
        const event = { id: 1, name: "New Event" };

        const newState = appReducer(initialState, {
        type: ACTIONS.createEvent,
        payload: event,
        });

        expect(newState.data.eventsAll).toHaveLength(1);
        expect(newState.data.eventsAll[0]).toEqual(event);
    });

    test("updateEvent updates an existing event", () => {
        const initialEvent = { id: 1, name: "Old Event" };
        const updatedEvent = { id: 1, name: "Updated Event" };

        const stateWithEvent = {
        ...initialState,
        data: {
            ...initialState.data,
            eventsAll: [initialEvent],
        },
        };

        const newState = appReducer(stateWithEvent, {
        type: ACTIONS.updateEvent,
        payload: updatedEvent,
        });

        expect(newState.data.eventsAll[0]).toEqual(updatedEvent);
    });

    test("deleteEvent removes an event", () => {
        const eventToDelete = { id: 1, name: "Event to Delete" };

        const stateWithEvent = {
        ...initialState,
        data: {
            ...initialState.data,
            eventsAll: [eventToDelete],
        },
        };
        
        const newState = appReducer(stateWithEvent, {
        type: ACTIONS.deleteEvent,
        payload: eventToDelete.id,
        });

        expect(newState.data.eventsAll).toHaveLength(0);
    });

    test("setShowEventForm toggles modal", () => {
        const newState = appReducer(initialState, {
        type: ACTIONS.setShowEventForm,
        payload: true,
        });

        expect(newState.ui.manager.showEventForm).toBe(true);
    });

    test("setActiveTab changes the active tab", () => {
        const newState = appReducer(initialState, {
        type: ACTIONS.setActiveTab,
        payload: "users",
        });
        
        expect(newState.ui.manager.activeTab).toBe("users");
    });

    test("setEditingEvent sets the editing event", () => {
        const eventToEdit = { id: 1, name: "Event to Edit" };
        
        const newState = appReducer(initialState, {
        type: ACTIONS.setEditingEvent,
        payload: eventToEdit,
        });
        expect(newState.ui.manager.editingEvent).toEqual(eventToEdit);
    });
    test("setLoading sets the loading state", () => {
        const newState = appReducer(initialState, {
        type: ACTIONS.setLoading,
        payload: true,
        });
        expect(newState.status.loading).toBe(true); 
    });

    test("setError sets the error state", () => {
        const errorMessage = "An error occurred";
        const newState = appReducer(initialState, {
        type: ACTIONS.setError,
        payload: errorMessage,
        });
        expect(newState.status.error).toBe(errorMessage); 
    });

    test("setUsers favorite events", () => {
        const favEvents = [{ id: 1, name: "Favorite Event" }];

        const newState = appReducer(initialState, {
        type: ACTIONS.setUserFavEvents,
        payload: favEvents,
        });

        expect(newState.data.userFavEvents).toEqual(favEvents);
    });

})
 