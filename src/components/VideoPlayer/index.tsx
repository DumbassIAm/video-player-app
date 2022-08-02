import React, { useEffect, useRef, useState } from "react";
import VideoControls from "../VideoControls";
import useForwardedRef from "hooks/useForwardedRef";
import "./styles.scss";
import { useAppDispatch } from "hooks/hooks";
import { videoUrl, assetUrl } from "constants/urls";
import { updateCurrentTime } from "reducers/video/video";

const posterUrl = `${assetUrl}/main-page/poster.jpg`;

const VideoPlayer = React.forwardRef<HTMLVideoElement>((props: {}, ref): JSX.Element => {
  const dispatch = useAppDispatch();


  const videoRef = useForwardedRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);

  if (videoRef.current) {
  }

  useEffect(() => {
    console.log(videoRef.current)

  }, [videoRef])

  const [videoReady, setVideoReady] = useState(0);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoIsFullScreen, setVideoIsFullScreen] = useState(false);
  const [videoIsMuted, setVideoIsMuted] = useState(false);


  const handleVideoLoad = (event: any): void => {
    const ready = event.target.readyState;
    if (ready >= 3) setVideoReady(ready);
  }

  const handleVideoPlayPause = (): void => {
    const video = videoRef.current;
    console.log(video);

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
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      dispatch(updateCurrentTime(currentTime));
    }
  }

  const handleVideoMute = (): void => {
    if (videoRef.current) {
      setVideoIsMuted(!videoIsMuted);
      videoRef.current.muted = !videoIsMuted;
    }
  }

  // props
  // video
  // const video = {
  //   length: videoRef.current.duration,
  //   videoRef: videoRef.current,
  // }

  // // play
  // const playProps = {
  //   isPlaying: videoIsPlaying,
  //   handleVideoPlayPause: handleVideoPlayPause,
  // }

  // // fullscreen
  // const fullscreenProps = {
  //   isFullscreen: videoIsFullScreen,
  //   handleVideoFullscreen: handleVideoFullscreen,
  // }

  // const mutedProps = {
  //   isMuted: videoIsMuted,
  //   handleVideoMute: handleVideoMute,
  // }

  return (
    <div className="vp">
      <div className="vp__video-container" ref={videoContainerRef}>
        <video
          className="vp__video"
          ref={ref}
          onLoadedData={handleVideoLoad}
          // onTimeUpdate={handleVideoPlaying}
          // onClick={handleVideoPlayPause}
          // onDoubleClick={handleVideoFullscreen}
          poster={posterUrl}>
          <source src={videoUrl} type="video/mp4"></source>
        </video>
        {/* {!videoReady || <VideoControls video={video} mute={mutedProps} play={playProps} fullscreen={fullscreenProps} />} */}
      </div>
    </div>
  )
});

export default VideoPlayer;