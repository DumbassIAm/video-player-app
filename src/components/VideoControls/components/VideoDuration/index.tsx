import { useAppSelector } from "hooks/hooks";
import formatTimestamp from "utility/formatTimestamp";
import getFullSeconds from "utility/getFullSeconds";

type props = {
  videoLength: number,
}

const VideoDuration = (props: props): JSX.Element => {
  const currentTime = useAppSelector((state) => state.video.currentTime);
  const trimmedTime = getFullSeconds(currentTime);
  const formattedTime = formatTimestamp(trimmedTime);

  const trimmedLength = getFullSeconds(props.videoLength);
  const formattedLength = formatTimestamp(trimmedLength);

  const output = trimmedTime > 1000 * 3600
    ? formattedTime
    : trimmedTime > 1000
      ? `0:${formattedTime}`
      : `0:00:${formattedTime}`;

  return (
    <div className="vp__video-length">
      <span>{output}</span>
      <span>/</span>
      <span>{formattedLength}</span>
    </div>
  )
}

export default VideoDuration;