--
-- PostgreSQL database dump
--

\restrict jHleeasKYXHYV4WS0AfaLXY7cGavWe9K3w5OvmSxPPUxNM2mX2sVmUJjMcIuQrx

-- Dumped from database version 18.1 (Postgres.app)
-- Dumped by pg_dump version 18.1 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY eventsdb.user_favorites DROP CONSTRAINT IF EXISTS user_favorites_user_id_fkey;
ALTER TABLE IF EXISTS ONLY eventsdb.user_favorites DROP CONSTRAINT IF EXISTS user_favorites_event_id_fkey;
ALTER TABLE IF EXISTS ONLY eventsdb.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY eventsdb.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY eventsdb.user_favorites DROP CONSTRAINT IF EXISTS user_favorites_pkey;
ALTER TABLE IF EXISTS ONLY eventsdb.events DROP CONSTRAINT IF EXISTS events_pkey;
ALTER TABLE IF EXISTS ONLY eventsdb.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY eventsdb.categories DROP CONSTRAINT IF EXISTS categories_name_key;
ALTER TABLE IF EXISTS eventsdb.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS eventsdb.events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS eventsdb.categories ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS eventsdb.users_id_seq;
DROP TABLE IF EXISTS eventsdb.users;
DROP TABLE IF EXISTS eventsdb.user_favorites;
DROP SEQUENCE IF EXISTS eventsdb.events_id_seq;
DROP TABLE IF EXISTS eventsdb.events;
DROP SEQUENCE IF EXISTS eventsdb.categories_id_seq;
DROP TABLE IF EXISTS eventsdb.categories;
DROP SCHEMA IF EXISTS eventsdb;
--
-- Name: eventsdb; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA eventsdb;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: eventsdb; Owner: -
--

CREATE TABLE eventsdb.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: eventsdb; Owner: -
--

CREATE SEQUENCE eventsdb.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: eventsdb; Owner: -
--

ALTER SEQUENCE eventsdb.categories_id_seq OWNED BY eventsdb.categories.id;


--
-- Name: events; Type: TABLE; Schema: eventsdb; Owner: -
--

CREATE TABLE eventsdb.events (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    event_date_time timestamp without time zone NOT NULL,
    location character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    description text,
    is_favorite boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: events_id_seq; Type: SEQUENCE; Schema: eventsdb; Owner: -
--

CREATE SEQUENCE eventsdb.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: eventsdb; Owner: -
--

ALTER SEQUENCE eventsdb.events_id_seq OWNED BY eventsdb.events.id;


--
-- Name: user_favorites; Type: TABLE; Schema: eventsdb; Owner: -
--

CREATE TABLE eventsdb.user_favorites (
    user_id integer NOT NULL,
    event_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: users; Type: TABLE; Schema: eventsdb; Owner: -
--

CREATE TABLE eventsdb.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text,
    is_manager boolean DEFAULT false NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: eventsdb; Owner: -
--

CREATE SEQUENCE eventsdb.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: eventsdb; Owner: -
--

ALTER SEQUENCE eventsdb.users_id_seq OWNED BY eventsdb.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.categories ALTER COLUMN id SET DEFAULT nextval('eventsdb.categories_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.events ALTER COLUMN id SET DEFAULT nextval('eventsdb.events_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.users ALTER COLUMN id SET DEFAULT nextval('eventsdb.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: eventsdb; Owner: -
--

COPY eventsdb.categories (id, name) FROM stdin;
1	Tech
2	Networking
3	Workshop
4	Education
5	Community
6	Career
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: eventsdb; Owner: -
--

COPY eventsdb.events (id, name, event_date_time, location, category, description, is_favorite, created_at) FROM stdin;
1	Mock Interview Night	2026-03-05 18:00:00	Zoom	Tech	Practice technical interviews	f	2026-02-25 02:08:38.749716-05
2	Open Source Meetup	2026-03-10 19:00:00	DC Hub	Networking	Contribute together	f	2026-02-25 02:08:38.749716-05
3	Friday Game Night	2026-02-14 20:00:00	Online	Workshop	Fun and relax	t	2026-02-25 02:08:38.749716-05
4	React Advanced Workshop	2026-04-01 10:00:00	Tech Center	Workshop	Deep dive into hooks	f	2026-02-25 02:08:38.749716-05
5	Women in Tech Networking	2026-03-20 17:30:00	DC Downtown	Education	Meet industry leaders	t	2026-02-25 02:08:38.749716-05
6	Resume Review Session	2026-02-01 12:00:00	Zoom	Career	Bring your resume	f	2026-02-25 02:08:38.749716-05
7	Mindfulness & Coding	2026-01-15 09:00:00	Community Center	Community	Balance productivity and health	f	2026-02-25 02:08:38.749716-05
8	Data Structures Crash Course	2026-04-15 13:00:00	Online	Tech	Big-O and beyond	f	2026-02-25 02:08:38.749716-05
9	AI Summit 2027	2027-06-10 09:00:00	Convention Center	Career	AI industry leaders	f	2026-02-25 02:08:38.749716-05
10	Holiday Celebration	2025-12-20 18:00:00	DC HQ	Career	End of year party	t	2026-02-25 02:08:38.749716-05
\.


--
-- Data for Name: user_favorites; Type: TABLE DATA; Schema: eventsdb; Owner: -
--

COPY eventsdb.user_favorites (user_id, event_id, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: eventsdb; Owner: -
--

COPY eventsdb.users (id, name, email, is_manager) FROM stdin;
1	Bobo Manager	alice@example.com	t
2	Bob User	test1@example.com	f
4	Test1 User	test2@example.com	f
5	Test2 User	test3@example.com	f
6	Test3 User	test4@example.com	f
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: eventsdb; Owner: -
--

SELECT pg_catalog.setval('eventsdb.categories_id_seq', 6, true);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: eventsdb; Owner: -
--

SELECT pg_catalog.setval('eventsdb.events_id_seq', 10, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: eventsdb; Owner: -
--

SELECT pg_catalog.setval('eventsdb.users_id_seq', 6, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: user_favorites user_favorites_pkey; Type: CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.user_favorites
    ADD CONSTRAINT user_favorites_pkey PRIMARY KEY (user_id, event_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: user_favorites user_favorites_event_id_fkey; Type: FK CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.user_favorites
    ADD CONSTRAINT user_favorites_event_id_fkey FOREIGN KEY (event_id) REFERENCES eventsdb.events(id) ON DELETE CASCADE;


--
-- Name: user_favorites user_favorites_user_id_fkey; Type: FK CONSTRAINT; Schema: eventsdb; Owner: -
--

ALTER TABLE ONLY eventsdb.user_favorites
    ADD CONSTRAINT user_favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES eventsdb.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict jHleeasKYXHYV4WS0AfaLXY7cGavWe9K3w5OvmSxPPUxNM2mX2sVmUJjMcIuQrx

