SET search_path TO eventsdb;
INSERT INTO categories (name)
VALUES 
('Tech'),
('Networking'),
('Workshop'),
('Education'),
('Community'),
('Career')
ON CONFLICT (name) DO NOTHING;

INSERT INTO events 
(name, event_date_time, location, category, description, is_favorite)
VALUES
('Mock Interview Night', '2026-03-05 18:00:00', 'Zoom', 'Tech','Practice technical interviews', false),
('Open Source Meetup', '2026-03-10 19:00:00', 'DC Hub', 'Networking', 'Contribute together', false),
('Friday Game Night', '2026-02-14 20:00:00', 'Online', 'Workshop', 'Fun and relax', true),
('React Advanced Workshop', '2026-04-01 10:00:00', 'Tech Center', 'Workshop', 'Deep dive into hooks', false),
('Women in Tech Networking', '2026-03-20 17:30:00', 'DC Downtown', 'Education','Meet industry leaders', true),
('Resume Review Session', '2026-02-01 12:00:00', 'Zoom', 'Career', 'Bring your resume', false),
('Mindfulness & Coding', '2026-01-15 09:00:00', 'Community Center', 'Community','Balance productivity and health', false),
('Data Structures Crash Course',  '2026-04-15 13:00:00', 'Online', 'Tech','Big-O and beyond', false),
('AI Summit 2027', '2027-06-10 09:00:00', 'Convention Center','Career', 'AI industry leaders', false),
-- Past event
('Holiday Celebration', '2025-12-20 18:00:00', 'DC HQ', 'Career','End of year party', true);



INSERT INTO users (name, email, is_manager)
VALUES
('Bobo Manager', 'alice@example.com', TRUE),
('Bob User', 'bob@example.com', FALSE)
ON CONFLICT (email) DO NOTHING;