const express = require('express')
const router = express.Router()
const {downloadVideo} = require("../services/yt-dlp")

router.get('/video', (req, res) => {
    const downloadParams = req.body
    const callback = (fileName) => {
        res.download(`${fileName}.mp4`, 'downloaded_video.mp4', (err) => {
            if (err) {
                console.error(`Error sending file: ${err.message}`);
                res.status(500).send('Internal Server Error');
            }
        });
    }

    let example = {
        videoUrl: 'https://www.youtube.com/watch?v=example',
        startTime: '00:01:30',
        endTime: '00:02:30',
        outputFileName: 'downloaded_video'
    }
    downloadVideo(downloadParams, callback)
})

module.exports = router