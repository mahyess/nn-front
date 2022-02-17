import React from 'react'
import PropTypes from 'prop-types';
import ReactPlayer from "react-player";


const VideoPlayer = ({messageID, src, handleVideoPlayPause, playingVideo}) =>
    <ReactPlayer
        playing={playingVideo === messageID}
        controls
        url={src}
        onPlay={() => handleVideoPlayPause(messageID)}
        width={'480px'}
    />

VideoPlayer.propTypes = {
    messageID: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    playingVideo: PropTypes.string.isRequired,
    handleVideoPlayPause: PropTypes.func.isRequired
};

export default VideoPlayer;