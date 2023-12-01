const ytdl = require('ytdl-core');

// Function to set video quality for download
function setVideoQuality(videoInfo, qualityLabel) {
  const videoFormats = ytdl.filterFormats(videoInfo.formats, 'videoonly');
  const selectedFormat = videoFormats.find(format => format.qualityLabel === qualityLabel);

  if (!selectedFormat) {
    throw new Error(`Video format for ${qualityLabel} not found.`);
  }

  return selectedFormat;
}

module.exports = {
  setVideoQuality
};
