const {
    exec
} = require('child_process');
const express = require("express")
express()

const downloadVideo = async(params, callback) =>{
    const {
        videoUrl,
        startTime,
        endTime,
        outputFileName
    } = params
    const command = `yt-dlp --output ${outputFileName}.mp4 --merge-output-format mp4 --format bestvideo+bestaudio/best --postprocessor-args "-ss ${startTime} -to ${endTime}" ${videoUrl}`;


    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            res.status(500).send('Internal Server Error');
            return;
        } else {
            callback(outputFileName)
        }
    })

}

module.exports = {downloadVideo}