
INSERT INTO eventsdb.categories (name)
VALUES 
('Tech'),
('Networking'),
('Workshop'),
('Education'),
('Community'),
('Career')
ON CONFLICT (name) DO NOTHING;

INSERT INTO eventsdb.events 
(name, event_date_time, location, description, is_favorite)
VALUES
('Mock Interview Night', '2026-03-05 18:00:00', 'Zoom', 'Practice technical interviews', false),
('Open Source Meetup', '2026-03-10 19:00:00', 'DC Hub', 'Contribute together', false),
('Friday Game Night', '2026-02-14 20:00:00', 'Online', 'Fun and relax', true),
('React Advanced Workshop', '2026-04-01 10:00:00', 'Tech Center', 'Deep dive into hooks', false),
('Women in Tech Networking', '2026-03-20 17:30:00', 'DC Downtown', 'Meet industry leaders', true),
('Resume Review Session', '2026-02-01 12:00:00', 'Zoom', 'Bring your resume', false),
('Mindfulness & Coding', '2026-01-15 09:00:00', 'Community Center', 'Balance productivity and health', false),
('Data Structures Crash Course',  '2026-04-15 13:00:00', 'Online', 'Big-O and beyond', false),
('AI Summit 2027', '2027-06-10 09:00:00', 'Convention Center', 'AI industry leaders', false),
-- Past event
('Holiday Celebration', '2025-12-20 18:00:00', 'DC HQ', 'End of year party', true);


INSERT INTO eventsdb.users (name, email, is_manager)
VALUES
('Bobo Manager', 'alice@example.com', TRUE),
('Bob User', 'bob@example.com', FALSE)
ON CONFLICT (email) DO NOTHING;