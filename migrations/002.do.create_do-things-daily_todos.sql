CREATE TYPE week AS ENUM (
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
);

CREATE TABLE doThingsDaily_todos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER 
        REFERENCES doThingsDaily_users(id) ON DELETE CASCADE NOT NULL,
    day_of_week week NOT NULL,
    full_name TEXT NOT NULL,
    checked BOOLEAN DEFAULT false
);