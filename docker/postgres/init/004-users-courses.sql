CREATE TABLE course_user (
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL REFERENCES users(id),
    id_course INTEGER NOT NULL REFERENCES courses(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO course_user (id_user, id_course) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(3, 2),
(4, 3);