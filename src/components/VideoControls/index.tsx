import VideoDuration from "./components/VideoDuration";
import VideoControlButton from "./components/VideoControlButton";
import "./styles.scss";

import { assetUrl } from "../../constants/urls";
import VideoProgressbar from "./components/VideoProgressbar";

type props = {
  video: {
    length: number,
    videoRef: HTMLVideoElement,
  },
  play: {
    isPlaying: boolean,
    handleVideoPlayPause: React.MouseEventHandler,
  },
  fullscreen: {
    isFullscreen: boolean,
    handleVideoFullscreen: React.MouseEventHandler,
  },
  mute: {
    isMuted: boolean,
    handleVideoMute: React.MouseEventHandler,
  }
}

const VideoControls = (props: props): JSX.Element => {
  return (
    <div className="vp__controls">
      <VideoProgressbar videoRef={props.video.videoRef} videoLength={props.video.length} />
      <div className="vp__controls__row">
        <div className="vp__controls__col">
          {
            props.play.isPlaying
              ? <VideoControlButton onClick={props.play.handleVideoPlayPause} buttonType="pause" buttonIconUrl={`${assetUrl}/icons/control-pause.svg`} />
              : <VideoControlButton onClick={props.play.handleVideoPlayPause} buttonType="play" buttonIconUrl={`${assetUrl}/icons/control-play.svg`} />
          }
          {
            props.mute.isMuted
              ? <VideoControlButton onClick={props.mute.handleVideoMute} buttonType="mute" buttonIconUrl={`${assetUrl}/icons/control-sound-off.svg`} />
              : <VideoControlButton onClick={props.mute.handleVideoMute} buttonType="unmute" buttonIconUrl={`${assetUrl}/icons/control-sound-on.svg`} />
          }
          <VideoDuration videoLength={props.video.length} />
        </div>
        <div className="vp__controls__col">
          {
            props.fullscreen.isFullscreen
              ? <VideoControlButton onClick={props.fullscreen.handleVideoFullscreen} buttonType="exit-fullscreen" buttonIconUrl={`${assetUrl}/icons/control-exit-fullscreen.svg`} />
              : <VideoControlButton onClick={props.fullscreen.handleVideoFullscreen} buttonType="enter-fullscreen" buttonIconUrl={`${assetUrl}/icons/control-enter-fullscreen.svg`} />
          }
        </div>
      </div>
    </div>
  )
}

export default VideoControls;