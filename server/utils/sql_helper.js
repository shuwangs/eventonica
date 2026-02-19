
// Manager function:

// User table: id, name, email, is_manager
export const GET_ALL_USERS = `
    SELECT id, name, email
    FROM eventsdb.users
`;

export const ADD_USER = `
    INSERT INTO eventsdb.users (name, email)
    VALUES ($1, $2)
    RETURNING *;
`;

export const DELETE_USER = `
    DELETE FROM eventsdb.users
    WHERE id = $1
    RETURNING *;
`
// user_favorites Table: user_id, event_id
export const ADD_FAVORITE = `
    INSERT INTO eventsdb.user_favorites (user_id, event_id)
    VALUES ($1, $2)
    RETURNING *;
`;

export const GET_USER_FAVORITES = `
    SELECT uf.user_id, uf.event_id, e.name, e.event_date_time, e.location,e.description, ec.name AS category_name
    FROM eventsdb.user_favorites AS uf
    LEFT JOIN eventsdb.events AS e ON uf.event_id = e.id
    LEFT JOIN eventsdb.events_categories AS ec ON e.id = ec.event_id
    WHERE user_id = $1
`;

export const DELETE_FAVORITE = `
    DELETE FROM eventsdb.user_favorites
    WHERE user_id = $1 AND event_id = $2
    RETURNING *;    
`;

// Event related fields: id, name, event_date_time, location, category, description;
// events Table: id, name, event_date_time, location, category, description
// categories Table: id, name
// event_categories Table: event_id, category_id

const ADD_EVENT =  ``;

const DELETE_EVENT = ``;

const UPDATE_EVENT = ``;


// USer and Manager shared function;

const GET_EVENTS = ``;

const GET_EVENTS_BY_CATEGORY = ``;

// User function

const ADD_FAVORITE = ``;

const GET_USER_FAVORITES = ``;


