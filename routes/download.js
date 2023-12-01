const express = require('express');
const router = express.Router();
const { downloadVideo } = require("../services/yt-dlp");
const path = require('path');

router.get('/download', (req, res) => {
    console.log("video download requested");

    const downloadParams = {
        videoUrl: 'https://www.youtube.com/watch?v=VmqjnP98wfM',
        startTime: '00:01:30',
        endTime: '00:05:00',
        outputFileName: 'downloaded_video'
    };

    downloadVideo(downloadParams, (videoPath) => {
        if (videoPath) {
            console.log(`Video path: ${videoPath}`);
            const absolutePath = path.resolve(__dirname, '..', 'services', videoPath);
            res.sendFile(absolutePath);
        } else {
            res.status(500).send('Internal Server Error');
        }
    });
});

router.get('/test', (req, res) => {
res.send(req.query)
});

module.exports = router;
