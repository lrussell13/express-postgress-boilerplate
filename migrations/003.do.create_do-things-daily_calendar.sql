CREATE TABLE doThingsDaily_calendar (
    id SERIAL PRIMARY KEY,
    user_id INTEGER 
        REFERENCES doThingsDaily_users(id) ON DELETE CASCADE NOT NULL,
    dayOf DATE NOT NULL
);