import { useAppDispatch, useAppSelector } from "hooks/hooks";
import { CSSProperties } from "react";
import { updateCurrentTime } from "reducers/video/videoTimeUpdate";
import "./styles.scss";

type props = {
  videoLength: number,
  videoRef: HTMLVideoElement,
}

const eventsInProgress = new Set();

function getProgressLineNewWidth(event: any, videoLength: number) {
  const target = event.target;
  const dims = target.getBoundingClientRect();

  const left = dims.left;
  const width = dims.width;

  const cursorGlobalX = event.clientX;
  const cursorLocalX = cursorGlobalX - left;

  return cursorLocalX * videoLength / width;
}

const getWidth = (time: number, videoLength: number): number => time * 100 / videoLength;

const VideoProgressbar = (props: props): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentTime = useAppSelector((state) => state.video.currentTime);

  const width = getWidth(currentTime, props.videoLength);
  const trimmedWidth = width.toFixed(2);


  const handleMouseMove = () => {

  }

  const handleMouseDown = () => {
    // const newVideoCurrentTime = getProgressLineNewWidth(event, props.videoLength);

    eventsInProgress.add("mousedown");
  }

  const handleMouseUp = (event: any) => {
    const newVideoCurrentTime = getProgressLineNewWidth(event, props.videoLength);

    dispatch(updateCurrentTime(newVideoCurrentTime));
    props.videoRef.currentTime = newVideoCurrentTime;
    eventsInProgress.delete("mousedown");
  }

  const progressLineStyles: CSSProperties = {
    width: `${trimmedWidth}%`
  }

  const circleStyles: CSSProperties = {
    left: `calc(${trimmedWidth}% - 7.5px)`
  }

  return (
    <div className="vp__progressbar">
      <div className="vp__progressbar-lines">
        <div className="vp__progressbar-progress"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}>
          <div className="vp__progressbar-line" style={progressLineStyles}></div>
        </div>
        <div className="vp__progressbar-circle" style={circleStyles}></div>
        <div className="vp__progressbar-background-line"></div>
      </div>
    </div>
  )
}

export default VideoProgressbar;