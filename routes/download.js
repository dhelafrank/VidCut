const express = require('express');
const router = express.Router();
const {
    processDownload,
    downloadFile
} = require("../controllers/downloadManager")

router.get('/request', (req, res) => {
    console.log("video download requested");

    const downloadParams = {
        videoUrl: 'https://www.youtube.com/watch?v=VmqjnP98wfM',
        startTime: '00:01:30',
        endTime: '00:05:00',
        outputFileName: Date.now()
    };
    processDownload(downloadParams)
    res.send("Video will be downloaded and sent to your mail")
});

router.get('/video', (req, res) => {
    const {
        token
    } = req.query;

    downloadFile(token, (result) => {
        if (result.status) {
            // Send the file for download
            res.download(result.path, (err) => {
                if (err) {
                    console.error(`Error sending file for download: ${err.message}`);
                }
            });
        } else {
            res.render("error", {
                code: 503,
                message: result.message,
                error: {
                    message: result.message
                }
            });
        }
    });
});

router.get('/test', (req, res) => {
    res.send(req.query)
});

module.exports = router;