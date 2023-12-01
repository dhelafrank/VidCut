const express = require('express');
express().use(express.json())
const router = express.Router();
const {
    processDownload,
    downloadFile
} = require("../controllers/downloadManager")
const youtubeurl = require("youtube-url")

router.get('/request', async (req, res) => {
    let downloadParams = {
        videoUrl,
        startTime,
        endTime,
        email
    } = req.query
    downloadParams.originalName = req.query.outputFileName
    downloadParams.outputFileName = req.query.outputFileName += Date.now()

    let isLinkValid = youtubeurl.valid(downloadParams.videoUrl)

    if (isLinkValid) {
        processDownload(downloadParams)

        res.render('info', {
            title: "VidCut | Video Processing",
            heading: "Video Processing",
            content: `<span>Video will be processed and sent to your mail</p>
            <div class="text-center mt-4">
            <a href="/" class="btn btn-primary">Back to Home</a>
            </div>`
        })   
    }else{
        res.render("error", {
            code: 404,
            message: "VidCut | Invalid Link",
            error: {
                message: "Video link is not a youtube link"
            }
        });
    }
});

router.get('/video', (req, res) => {
    const {
        data
    } = req.query;

    downloadFile(data, (result) => {
        if (result.status) {

            res.render("info", {
                title: "VidCut | Download Video",
                heading: "Click the link Below to download",
                content: `<a href="/download/start?path=${result.path}" class="btn btn-primary">Download</a>`
            })
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

router.get("/start", (req, res) => {
    const {
        path
    } = req.query
    res.download(path, (err) => {
        if (err) {
            res.render("error", {
                code: 503,
                message: err.message,
                error: {
                    message: err.message
                }
            });
        }
    });

})
module.exports = router;