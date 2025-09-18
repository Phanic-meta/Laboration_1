const express = require('express');
const path = require('path');

const app = express();

app.use("/static", express.static(path.resolve(__dirname, 'frontend', 'static')));

const PORT = process.env.PORT || 3000;

app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => console.log(`Server started`));