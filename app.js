const express = require('express');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/evaluate', (req, res) => {
    const userInput = req.body.summary;

    execFile('python', [path.join(__dirname, 'python', 'evaluate_summary.py'), userInput], (error, stdout, stderr) => {
    if (error) {
        console.error('Python Error:', stderr);  // Add this line
        return res.status(500).send({ error: 'Python script failed.', details: stderr });
    }
    try {
    const output = JSON.parse(stdout);
    res.send(output);  // sends both feedback and score
} catch (err) {
    console.error("JSON parse error:", err);
    res.status(500).send({ error: "Failed to parse Python output." });
}
});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));