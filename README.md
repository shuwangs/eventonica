# eventonica

## MVP
- [ ] Add / Delete

- [ ] Search by date

- [ ] Search by category

- [ ] useReducer（ actions/state）

- [ ] tests + README

## Nice to have

- [ ] ⭐ Favorite Events

- [ ] Upcoming / Past Events 

- [ ] Debounced search（300ms）

- [ ] fuzzy match, 

- [ ] Calendar view
  
## Component Hierarchy
- App (State Center):  useReducer，manage all the state

- SearchBar: user's input deal with  Debounced Search。

- EventForm:  Add Event logic。

- EventList:  Upcoming / Past , update, delete

- EventCard: 

---

## APIs

### Users:
- POST /api/users  --- add user
- DELETE /api/users/:id --- delete user


### event owner
- GET /api/events --- get all events. SELECT * FROM events
- POST /api/events  --- add new events INSERT INTO events
- GET /api/events/search -- supporting search event. SELECT WHERE *** FROM events
- DELETE /api/events/:id. -- DELETE where id = eventID from events;

### favorite 
- Get /api/users/:userId/favorites --- a user's favorite list
- POST /api/favorites     --- INSERT INTO favorites (u_id, e_id)
- DELETE /api/favorites   --- DELETE FROM favorites (u_id, e_id)