import { useRef, useState } from "react";
import VideoControls from "../VideoControls";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { videoUrl, assetUrl } from "constants/urls";
import { updateCurrentTime } from "reducers/video/videoTimeUpdate";

const posterUrl = `${assetUrl}/main-page/poster.jpg`;

const VideoPlayer = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const videoContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  const [videoReady, setVideoReady] = useState(0);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoIsFullScreen, setVideoIsFullScreen] = useState(false);


  const handleVideoLoad = (event: any): void => {
    const ready = event.target.readyState;

    if (ready >= 3) {
      setVideoReady(ready);
    }
  }

  const handleVideoPlayPause = (): void => {
    const video = videoRef.current;
    if (video !== null) {
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
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
        setVideoIsFullScreen(false);
      } else {
        videoContainerRef.current.requestFullscreen();
        setVideoIsFullScreen(true);
      }
    }
  }

  const handleVideoPlaying = (): void => {
    const currentTime = videoRef.current.currentTime;
    dispatch(updateCurrentTime(currentTime));
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

  return (
    <div className="vp">
      <div className="vp__video-container" ref={videoContainerRef}>
        <video
          muted
          className="vp__video"
          ref={videoRef}
          onLoadedData={handleVideoLoad}
          onTimeUpdate={handleVideoPlaying}
          onClick={handleVideoPlayPause}
          onDoubleClick={handleVideoFullscreen}
          poster={posterUrl}>
          <source src={videoUrl} type="video/mp4"></source>
        </video>
        {!videoReady || <VideoControls video={video} play={playProps} fullscreen={fullscreenProps} />}
      </div>
    </div>
  )
}

export default VideoPlayer;