const express = require('express');
const cors = require('cors');
require('dotenv').config();
const ConnectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')
const NoteRoutes = require('./routes/notesRoutes')


const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', userRoutes)
app.use('/api/note', NoteRoutes)


ConnectDB();

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
