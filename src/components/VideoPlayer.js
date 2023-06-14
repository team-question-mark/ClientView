import React, { useState,useEffect,useRef   } from 'react';

const VideoPlayer = ({videoQueue}) => {

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    const handleVideoEnd = () => {
      setCurrentVideoIndex(prevIndex => {
        if (prevIndex < videoQueue.length - 1) {
          return prevIndex + 1;
        }
        return prevIndex;
      });
    };
  
    const videoElement = document.getElementById('videoPlayer');
  
    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnd);
    }
  
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnd);
      }
    };
  }, [currentVideoIndex, videoQueue]);

  useEffect(() => {
    if (!isPlayingRef.current && videoQueue.length > 0) {
      setCurrentVideoIndex(0);
      isPlayingRef.current = true;
    }
  }, [videoQueue]);

  useEffect(() => {
    isPlayingRef.current = false;
  }, [currentVideoIndex]);

  return (
    <div>
      {videoQueue.length > 0 && (
        <video
          id="videoPlayer"
          src={videoQueue[currentVideoIndex]}
          autoPlay
          controls
          style={{ width: '300px', height: 'auto' }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
