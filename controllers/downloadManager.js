const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {
    downloadVideo
} = require("../services/yt-dlp");
const {
    log
} = require('console');
const {
    sendMail
} = require("../services/mail-sender")
const {
    videoReminderMail
} = require("../services/mail-template")


const SECRET_KEY = 'your-secret-key';

const processDownload = (downloadParams, routeCallback) => {
    downloadVideo(downloadParams, (response) => {
        if (response.state) {
            // console.log(`Video path: ${videoPath}`);
            const absolutePath = path.resolve(__dirname, '..', 'videos', response.path);

            createDownloadLink(absolutePath, async (token) => {
                await sendMail(downloadParams.email, "VidCut Video Ready", videoReminderMail(downloadParams.originalName,  `https://vidcut.onrender.com/download/video?data=${token}`))
            })

        } else {
            console.log("critical: Internal Server Error: Ln 35");
            routeCallback(response)
        }
    });
}



const createDownloadLink = (outputFilePath, callback) => {
    const token = jwt.sign({
        filePath: outputFilePath
    }, SECRET_KEY, {
        expiresIn: '10m'
    });
    callback(token);

    // Delete the file after 10 minutes
    setTimeout(() => {
        try {
            fs.unlinkSync(outputFilePath);
            // console.log(`File '${outputFilePath}' deleted after 20 minutes.`);
        } catch (err) {
            console.error(`Error deleting file: ${err.message}`);
        }
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
};

const downloadFile = (token, callback) => {
    // Verify the JWT
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            // console.error('Invalid token:', err.message);
            callback({
                title: "Expired",
                message: "link has expired",
                status: false,
                path: ""
            });
            return;
        }

        // const filePath = path.join(__dirname, decoded.fileName);
        const filePath = decoded.filePath;

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error(`Error accessing file: ${err.message}`);
                callback({
                    title: "Error",
                    message: 'Video does not exist',
                    status: false,
                    path: filePath
                });
                return;
            }

            // Provide the file path to the callback
            callback({
                title: "",
                message: 'File exists',
                status: true,
                path: filePath
            });
        });
    });
};


module.exports = {
    createDownloadLink,
    downloadFile,
    processDownload
};