import express from 'express';
import pkg from 'pg'; 

const { Pool } = pkg; 

const app = express();
app.use(express.json());

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
});

//

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: 'Tammikuu2000',
    port: 5432,
});

//

app.get('/', (req, res) => {
    res.send('You just called root endpoint');
});

//

app.post('/genres', (req, res) => {
    res.status(201).send({ message: 'New genre added', data: req.body });
});

app.post('/movies', (req, res) => {
    res.status(201).send({ message: 'New movie added', data: req.body });
});

app.post('/users', (req, res) => {
    res.status(201).send({ message: 'New user registered', data: req.body });
});

app.post('/reviews', (req, res) => {
    res.status(201).send({ message: 'Review added', data: req.body });
});

app.post('/favorites', (req, res) => {
    res.status(201).send({ message: 'Favorite movies added for user', data: req.body });
});

