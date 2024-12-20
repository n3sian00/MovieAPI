import express from 'express';
import pgPool from './pg_connection.js';

const app = express();
app.use(express.json());

app.listen(3001, () => {
    console.log('Server is running');
});


app.get('/', (req, res) => {
    res.send('You just called root endpoint');
});

//

app.get('/genres', async (req, res) => {
    try {
        const result = await pgPool.query('SELECT * FROM genres');
        res.status(200).json({ message: 'Genres retrieved successfully', data: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve genres', details: err.message });
    }
});

app.post('/genres', async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO genres (name, descr) VALUES ($1, $2) RETURNING *',
            [name, description]
        );
        res.status(201).json({ message: 'Genre added successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add genre', details: err.message });
    }
});


app.post('/movie', async (req, res) => {
    const { name, year, genre_id } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO movie (name, year, genre_name) VALUES ($1, $2, $3) RETURNING *',
            [name, year, genre_id]
        );
        res.status(201).json({ message: 'Movie added successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add movie', details: err.message });
    }
});

app.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pgPool.query('SELECT * FROM movie WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Movie retrieved successfully', data: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve movie', details: err.message });
    }
});

app.delete('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pgPool.query('DELETE FROM movie WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Movie deleted successfully', data: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete movie', details: err.message });
    }
});


app.post('/users', async (req, res) => {
    const { name, username, password, year_of_birth } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO users (name, username, password, year_of_birth) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, username, password, year_of_birth]
        );
        res.status(201).json({ message: 'User registered successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user', details: err.message });
    }
});


app.post('/review', async (req, res) => {
    const { user_id, movie_id, stars, review_txt } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO review (user_id, movie_id, stars, review_txt) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, movie_id, stars, review_txt]
        );
        res.status(201).json({ message: 'Review added successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add review', details: err.message });
    }
});


app.post('/favorite', async (req, res) => {
    const { user_id, movie_id } = req.body;
    try {
        const result = await pgPool.query(
            'INSERT INTO favorite (user_id, movie_id) VALUES ($1, $2) RETURNING *',
            [user_id, movie_id]
        );
        res.status(201).json({ message: 'Favorite movie added successfully', data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add favorite movie', details: err.message });
    }
});

app.get('/favorite/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const result = await pgPool.query(
            'SELECT * FROM favorite WHERE user_id = $1',
            [user_id]
        );
        res.status(200).json({ message: 'Favorites retrieved successfully', data: result.rows });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve favorites', details: err.message });
    }
});