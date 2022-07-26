import "./styles.scss";
import formatTimestamp from "utility/formatTimestamp";
import { useAppDispatch } from "hooks/hooks";
import { updateCurrentTime } from "reducers/video/video";

type props = {
  index: number,
  id: number,
  timestamp: number,
  videoRef: HTMLVideoElement | null;
}

const Timecode = (props: props): JSX.Element => {
  const dispatch = useAppDispatch();

  const formattedTimestamp = formatTimestamp(props.timestamp);

  const handleClick = (event: React.MouseEvent): void => {
    const newVideoTime = props.timestamp / 1000;

    if (props.videoRef) {
      console.log(1);
      props.videoRef.currentTime = newVideoTime;
    }

    dispatch(updateCurrentTime(newVideoTime));
  }

  return (
    <div className="timecodes__timecode timecode" onClick={handleClick}>
      <div className="timecode__thumbnail">
        <img src="img/utility/monke.png" alt="" />
      </div>
      <div className="timecode__details">
        <div className="timecode__title">Timecode №{props.index} #{props.id}</div>
        <div className="timecode__timecode">{formattedTimestamp}</div>
      </div>
    </div>
  )
}

export default Timecode;