const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {
    downloadVideo
} = require("../services/yt-dlp");
const {
    log
} = require('console');
const SECRET_KEY = 'your-secret-key'; // Replace with a strong secret key

const processDownload = (downloadParams) => {
    downloadVideo(downloadParams, (videoPath) => {
        if (videoPath) {
            console.log(`Video path: ${videoPath}`);
            const absolutePath = path.resolve(__dirname, '..', 'videos', videoPath);

            createDownloadLink(absolutePath, (token) => {
                console.log(`Download token has been created: ${token}`);
            })

        } else {
            res.status(500).send('Internal Server Error');
        }
    });
}



const createDownloadLink = (outputFilePath, callback) => {
    const token = jwt.sign({
        filePath: outputFilePath
    }, SECRET_KEY, {
        expiresIn: '20m'
    });
    callback(token);

    // Delete the file after 20 minutes
    setTimeout(() => {
        try {
            fs.unlinkSync(outputFilePath);
            console.log(`File '${outputFilePath}' deleted after 20 minutes.`);
        } catch (err) {
            console.error(`Error deleting file: ${err.message}`);
        }
    }, 20 * 60 * 1000); // 20 minutes in milliseconds
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