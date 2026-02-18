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

# Data model Event

id: number

title: string

category: string

event_date_time: YYYY-MM-DD-HH-MM-SS

location: string

description: Text

is_favorite: boolean
