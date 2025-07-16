const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { spawn } = require('child_process');
const path = require('path');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let botProcess = null;

app.post('/start-bot', (req, res) => {
    const token = req.body.token?.trim();

    if (!token) {
        return res.send('❌ Token is missing.');
    }

    if (botProcess) {
        return res.send('⚠️ Bot is already running.');
    }

    botProcess = spawn('node', ['Bot.js'], {
        env: { ...process.env, BOT_TOKEN: token },
        stdio: 'inherit'
    });

    res.send('✅ Bot has been started successfully.');
});

app.get('/stop-bot', (req, res) => {
    if (botProcess) {
        botProcess.kill();
        botProcess = null;
        return res.send('🛑 Bot has been stopped.');
    } else {
        return res.send('⚠️ No bot is currently running.');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});