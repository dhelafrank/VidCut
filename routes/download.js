const express = require('express');
express().use(express.json())
const router = express.Router();
const {
    processDownload,
    downloadFile
} = require("../controllers/downloadManager")
const {
    sendMail
} = require("../services/mail-sender")
const {
    errorMail
} = require("../services/mail-template")
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
        processDownload(downloadParams, async (response) => {
            await sendMail(downloadParams.email, "VidCut Video Error", errorMail(500, "Video Processing Failed", response.message))
        })

        res.render('info', {
            title: "VidCut | Video Processing",
            heading: "Video Processing",
            content: `<span>Video has been processed and sent to your mail</p>
            <div class="text-center mt-4">
            <a href="/" class="btn btn-primary">Download Another</a>
            </div>`
        })
    } else {
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
            res.render("download", {
                title: "VidCut | Download Video",
                button:`<a href="/download/start?path=${result.path}" class="btn btn-lg btn-success download-btn">Download Now <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" x2="12" y1="15" y2="3"></line></a>`,
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
                message: "VidCut | Viedo Not Foud",
                error: {
                    message: "Video not longer available"
                }
            });
        }
    });

})
module.exports = router;