const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Statisches Verzeichnis für Frontend-Dateien
app.use(express.static(path.resolve(__dirname, 'frontend')));

// Absoluter Pfad zu index.html
const indexPath = path.join(__dirname, 'frontend', 'index.html');

// Catch\-all als RegExp (vermeidet path-to-regexp string parsing Fehler)
app.get(/.*/, (req, res) => {
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('sendFile error:', err);
            if (err.code === 'ENOENT') {
                return res.status(404).send('Not found');
            }
            return res.status(err.status || 500).send('Server error');
        }
    });
});

// 404 für nicht abgefangene Requests (z.\ B.\ non-GET)
app.use((req, res) => res.status(404).send('Not found'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));