const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const user_routes = require('./App/routes/appRoutes');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use('/', user_routes);

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});


