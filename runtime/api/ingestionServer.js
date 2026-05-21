const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/metrics', (req, res) => {
    console.log(req.body);
    res.send('Metrics received!');
});

app.listen(port, () => {
    console.log(`Hello World from Port ${port}`);
})