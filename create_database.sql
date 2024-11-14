-- Active: 1730637270441@@127.0.0.1@5432
CREATE TABLE genres (
    name VARCHAR(255) PRIMARY KEY,
    descr VARCHAR(255)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    year_of_birth INT
);

CREATE TABLE favorite (
    id SERIAL PRIMARY KEY,
    user_id INT,
    movie_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);

CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    user_id INT,
    movie_id INT,
    stars INT CHECK (stars >= 1 AND stars <= 5), -- Rating between 1 and 5 stars
    review_txt TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_id) REFERENCES movie(id)
);


CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT,
    genre_name VARCHAR(255),
    FOREIGN KEY (genre_name) REFERENCES genres(name)
);
