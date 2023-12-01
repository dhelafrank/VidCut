const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

function convertTimeToSeconds(time) {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

function logDownloadProgress(totalSize, writeStream) {
    let downloadedSize = 0;

    writeStream.on('data', (chunk) => {
        downloadedSize += chunk.length;
        const percentage = ((downloadedSize / totalSize) * 100).toFixed(2);
        console.log(`Download Progress: ${percentage}%`);
    });
}

const downloadVideo = async (params, callback) => {
    console.log('Fetching Video to download');
    const {
        videoUrl,
        startTime,
        endTime,
        outputFileName
    } = params;

    try {
        const videoDirectory = path.join(__dirname, '../videos');
        await fs.promises.mkdir(videoDirectory, { recursive: true });

        const videoInfo = await ytdl.getInfo(videoUrl);
        
        function convertTimeToSeconds(time) {
            const [hours, minutes, seconds] = time.split(':').map(Number);
            return hours * 3600 + minutes * 60 + seconds;
        }
        
        function logDownloadProgress(totalSize, writeStream) {
            let downloadedSize = 0;
        
            writeStream.on('data', (chunk) => {
                downloadedSize += chunk.length;
                const percentage = ((downloadedSize / totalSize) * 100).toFixed(2);
                console.log(`Download Progress: ${percentage}%`);
            });
        }
        
        const downloadVideo = async (params, callback) => {
            console.log('Fetching Video to download');
            const {
                videoUrl,
                startTime,
                endTime,
                outputFileName
            } = params;
        
            try {
                const videoDirectory = path.join(__dirname, '../videos');
                await fs.mkdir(videoDirectory, () => {
                    // console.log("Alert: directory made: Ln 33");
                    return
                });
        
                const videoInfo = await ytdl.getInfo(videoUrl);
        
                const startTimeInSeconds = convertTimeToSeconds(startTime);
                const endTimeInSeconds = convertTimeToSeconds(endTime);
        
                const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'lowest' });
                const videoStream = ytdl(videoUrl, {
                    format: videoFormat,
                });
                
        
                const startTimeString = new Date(startTimeInSeconds * 1000).toISOString().substr(11, 8);
                const endTimeString = new Date(endTimeInSeconds * 1000).toISOString().substr(11, 8);
                const filePath = path.join(__dirname, '../videos', `${outputFileName}.mp4`);
                const totalSize = videoInfo.formats.find((format) => format.itag === lowestQualityFormat.itag).contentLength;
                const writeStream = fs.createWriteStream(filePath);
        
                logDownloadProgress(totalSize, writeStream);
        
                videoStream.pipe(writeStream);
        
                writeStream.on('finish', () => {
                    console.log('Video download complete');
        
                    // Cut the video using ffmpeg
                    const ffmpegCommand = ffmpeg(filePath)
                        .setStartTime(startTimeString)
                        .setDuration(endTimeString)
                        .videoCodec('libx264')
                        .audioCodec('aac')
                        .format('mp4')
                        .output(path.join(__dirname, "../videos", `${outputFileName}_cut.mp4`))
                        .on('end', () => {
                            console.log('Video cut complete');
                            fs.unlinkSync(filePath);
                            if (callback) {
                                callback(`${outputFileName}_cut.mp4`);
                            }
                        })
                        .on('error', (err) => {
                            console.error(`Error during video cut: ${err.message}`);
                            if (callback) {
                                callback(null);
                            }
                        });
        
                    ffmpegCommand.run();
                });
        
                videoStream.on('error', (err) => {
                    console.error(`Error during streaming: ${err.message}`);
                    if (callback) {
                        callback(null);
                    }
                });
        
                writeStream.on('error', (err) => {
                    console.error(`Error writing video file: ${err.message}`);
                    if (callback) {
                        callback(null);
                    }
                });
            } catch (err) {
                console.error(`Error fetching video info: ${err.message}`);
                if (callback) {
                    callback(null);
                }
            }
        };
        
        module.exports = {
            downloadVideo
        };
        const startTimeInSeconds = convertTimeToSeconds(startTime);
        const endTimeInSeconds = convertTimeToSeconds(endTime);

        const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
        const videoStream = ytdl(videoUrl, {
            format: videoFormat,
        });

        const startTimeString = new Date(startTimeInSeconds * 1000).toISOString().substr(11, 8);
        const endTimeString = new Date(endTimeInSeconds * 1000).toISOString().substr(11, 8);
        const filePath = path.join(__dirname, '../videos', `${outputFileName}.mp4`);
        const totalSize = videoInfo.formats.find((format) => format.itag === videoFormat.itag).contentLength;
        const writeStream = fs.createWriteStream(filePath);

        logDownloadProgress(totalSize, writeStream);

        videoStream.pipe(writeStream);

        writeStream.on('finish', () => {
            console.log('Video download complete');

            // Cut the video using ffmpeg
            const ffmpegCommand = ffmpeg(filePath)
                .setStartTime(startTimeString)
                .setDuration(endTimeString)
                .videoCodec('libx264')
                .audioCodec('aac')
                .format('mp4')
                .output(path.join(__dirname, "../videos", `${outputFileName}_cut.mp4`))
                .on('end', () => {
                    console.log('Video cut complete');
                    fs.unlinkSync(filePath);
                    if (callback) {
                        callback(`${outputFileName}_cut.mp4`);
                    }
                })
                .on('error', (err) => {
                    console.error(`Error during video cut: ${err.message}`);
                    if (callback) {
                        callback(null);
                    }
                });

            ffmpegCommand.run();
        });

        videoStream.on('error', (err) => {
            console.error(`Error during streaming: ${err.message}`);
            if (callback) {
                callback(null);
            }
        });

        writeStream.on('error', (err) => {
            console.error(`Error writing video file: ${err.message}`);
            if (callback) {
                callback(null);
            }
        });
    } catch (err) {
        console.error(`Error fetching video info: ${err.message}`);
        if (callback) {
            callback(null);
        }
    }
};

module.exports = {
    downloadVideo
};
