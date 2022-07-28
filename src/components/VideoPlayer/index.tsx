import React, { useRef, useState } from "react";
import VideoControls from "../VideoControls";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { videoUrl, assetUrl } from "constants/urls";
import { updateCurrentTime } from "reducers/video/videoTimeUpdate";

const posterUrl = `${assetUrl}/main-page/poster.jpg`;

const VideoPlayer = React.forwardRef<HTMLVideoElement>((props, videoRef): JSX.Element => {
  const dispatch = useAppDispatch();

  console.log(videoRef);

  // const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const videoContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [videoReady, setVideoReady] = useState(0);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoIsFullScreen, setVideoIsFullScreen] = useState(false);
  const [videoIsMuted, setVideoIsMuted] = useState(videoRef.current.muted);


  const handleVideoLoad = (event: any): void => {
    const ready = event.target.readyState;
    if (ready >= 3) setVideoReady(ready);
  }

  const handleVideoPlayPause = (): void => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setVideoIsPlaying(true);
      } else {
        video.pause();
        setVideoIsPlaying(false);
      }
    }
  }

  const handleVideoFullscreen = (): void => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setVideoIsFullScreen(false);
    } else {
      videoContainerRef.current.requestFullscreen();
      setVideoIsFullScreen(true);
    }
  }

  const handleVideoPlaying = (): void => {
    const currentTime = videoRef.current.currentTime;
    dispatch(updateCurrentTime(currentTime));
  }

  const handleVideoMute = (): void => {
    setVideoIsMuted(!videoIsMuted);
    videoRef.current.muted = !videoIsMuted;
  }

  // props
  const video = {
    length: videoRef.current.duration,
    videoRef: videoRef.current,
  }

  // play
  const playProps = {
    isPlaying: videoIsPlaying,
    handleVideoPlayPause: handleVideoPlayPause,
  }

  // fullscreen
  const fullscreenProps = {
    isFullscreen: videoIsFullScreen,
    handleVideoFullscreen: handleVideoFullscreen,
  }

  const mutedProps = {
    isMuted: videoIsMuted,
    handleVideoMute: handleVideoMute,
  }

  return (
    <div className="vp">
      <div className="vp__video-container" ref={videoContainerRef}>
        <video
          className="vp__video"
          ref={videoRef}
          onLoadedData={handleVideoLoad}
          onTimeUpdate={handleVideoPlaying}
          onClick={handleVideoPlayPause}
          onDoubleClick={handleVideoFullscreen}
          poster={posterUrl}>
          <source src={videoUrl} type="video/mp4"></source>
        </video>
        {!videoReady || <VideoControls video={video} mute={mutedProps} play={playProps} fullscreen={fullscreenProps} />}
      </div>
    </div>
  )
});

export default VideoPlayer;