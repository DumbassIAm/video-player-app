import { useAppDispatch, useAppSelector } from "hooks/hooks";
import React, { CSSProperties } from "react";
import { updateCurrentTime } from "reducers/video/videoTimeUpdate";
import "./styles.scss";

type props = {
  videoLength: number,
  videoRef: HTMLVideoElement,
}

const eventsInProgress = new Set<string>();

function getProgressLineNewWidth(event: any, videoLength: number) {
  const target = event.currentTarget;
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

  let width = getWidth(currentTime, props.videoLength).toFixed(2);

  const setVideoCurrentTime = (event: React.MouseEvent<HTMLDivElement>): void => {
    const newVideoCurrentTime = getProgressLineNewWidth(event, props.videoLength);

    dispatch(updateCurrentTime(newVideoCurrentTime));
    props.videoRef.currentTime = newVideoCurrentTime;
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    eventsInProgress.add("mousedown");
    setVideoCurrentTime(event);
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (eventsInProgress.has("mousedown")) {
      setVideoCurrentTime(event);
    }
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    setVideoCurrentTime(event);
    eventsInProgress.delete("mousedown");
  }

  const progressLineStyles: CSSProperties = {
    width: `${width}%`
  }

  const circleStyles: CSSProperties = {
    left: `calc(${width}% - 7.5px)`
  }

  return (
    <div className="vp__progressbar"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="vp__progressbar-lines">
        <div className="vp__progressbar-progress">
          <div className="vp__progressbar-line" style={progressLineStyles}></div>
        </div>
        <div className="vp__progressbar-circle" style={circleStyles}></div>
        <div className="vp__progressbar-background-line"></div>
      </div>
    </div>
  )
}

export default VideoProgressbar;