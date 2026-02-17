CREATE SCHEMA IF NOT EXISTS eventsdb;

-- Create tables for events
CREATE TABLE IF NOT EXISTS eventsdb.events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER,
    event_date_time TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    is_favorite BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tables for categories
CREATE TABLE IF NOT EXISTS eventsdb.categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- add a foreign key constraint to link events to categories
ALTER TABLE eventsdb.events 
    ADD CONSTRAINT fk_events_category_id
    FOREIGN KEY (category_id)
    REFERENCES eventsdb.categories(id) 
;

-- create a junction table for many-to-many relationship between events and categories
CREATE TABLE IF NOT EXISTS eventsdb.events_categories (
    event_id INTEGER  REFERENCES eventsdb.events(id) ON DELETE CASCADE,
    category_id INTEGER  REFERENCES eventsdb.categories(id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, category_id)
);


