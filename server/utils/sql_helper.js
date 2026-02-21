
// Manager function:

// User table: id, name, email, is_manager
export const GET_ALL_USERS = `
    SELECT id, name, email, is_manager
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
export const ADD_USER_FAVORITE = `
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

export const DELETE_USER_FAVORITE = `
    DELETE FROM eventsdb.user_favorites
    WHERE user_id = $1 AND event_id = $2
    RETURNING *;    
`;

// Event related fields: id, name, event_date_time, location, category, description;
// events Table: id, name, event_date_time, location, category, description
// categories Table: id, name
// events_categories Table: event_id, category_id

export const ADD_INTO_EVENTS =  `
    INSERT INTO eventsdb.events (name, event_date_time, location, description)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
`;

export const DELETE_EVENT = `
    DELETE FROM events
    WHERE id = $1
    RETURNING *;
`;

export const UPDATE_EVENT = `
    UPDATE events
    SET name = $2, event_date_time = $3, location = $4, description = $5
    WHERE id = $1
    RETURNING *;
`;


// USer and Manager shared function;
// TODO: 
// T0 FIX: merge categories won't work
export const GET_ALL_EVENTS = `
    SELECT e.id, e.name, e.event_date_time,  e.location, e.category, e.description
    FROM eventsdb.events e
`;


export const GET_SINGLE_EVENTS = `
    SELECT e.id, e.name, e.event_date_time, e.location, e.description, ec.name AS category_name
    FROM eventsdb.events AS e
    LEFT JOIN eventsdb.events_categories AS ec ON e.id = ec.event_id
    WHERE e.id = $1;
`;

export const GET_EVENTS_BY_CATEGORY = `
    SELECT e.id, e.name, e.event_date_time, e.location, e.description, ec.name AS category_name
    FROM eventsdb.events AS e
    LEFT JOIN eventsdb.events_categories AS ec ON e.id = ec.event_id
    WHERE ec.name = $1;
`;

export const GET_EVENTS_BY_DATE = `
    SELECT e.id, e.name, e.event_date_time, e.location, e.description, ec.name AS category_name
    FROM eventsdb.events AS e
    LEFT JOIN eventsdb.events_categories AS ec ON e.id = ec.event_id
    WHERE DATE(e.event_date_time) = $1;
`;

export const GET_ALL_CATEGORIES = `
    SELECT id, name
    FROM eventsdb.categories;
`;

export const ADD_TO_CATEGORIES = `
    INSERT INTO eventsdb.categories (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
    RETURNING *;
`;

export const ADD_EVENT_CATEGORY = `
    INSERT INTO eventsdb.events_categories (event_id, category_id)
    VALUES ($1, $2)
    RETURNING *;
`;

export const DELETE_EVENT_CATEGORY = `
    DELETE FROM eventsdb.events_categories
    WHERE event_id = $1 AND category_id = $2
    RETURNING *;
`;

export const DELETE_CATEGORY = `
    DELETE FROM eventsdb.categories
    WHERE id = $1
    RETURNING *;
`;

export const GET_ALL_CATEGORY = `
    SELECT name FROM eventsdb.categories
`;
