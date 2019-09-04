INSERT INTO doThingsDaily_users (user_name, full_name, password)
    VALUES 
    ('test', 'test', 'test');

INSERT INTO doThingsDaily_todos  (user_id, day_of_week, full_name, checked)
    VALUES
    (1, 'Saturday', 'Do Dishes', false),
    (1, 'Sunday', 'Do Fishes', false),
    (1, 'Monday', 'Do Something', false),
    (1, 'Tuesday', 'Read', false),
    (1, 'Wednesday', 'Code', false),
    (1, 'Thursday', 'Clean', false),
    (1, 'Friday', 'Brush Teeth', false);