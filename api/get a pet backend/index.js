const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const PetRoutes = require('./routes/PetRoutes');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.static('public'));


//rotas
app.use('/users', UserRoutes);
app.use('/Pet', PetRoutes);

app.listen(5000);