-- Active: 1730637270441@@127.0.0.1@5432
CREATE TABLE genres (
    name VARCHAR(255) PRIMARY KEY,
    descr VARCHAR(255)
);

CREATE TABLE studio (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE director (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255)
);

CREATE TABLE movie (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    year INT,
    genres VARCHAR(255),
    studio_id INT,
    director_id INT,
    FOREIGN KEY (genres) REFERENCES genres(name),
    FOREIGN KEY (studio_id) REFERENCES studio(id),
    FOREIGN KEY (director_id) REFERENCES director(id)
);