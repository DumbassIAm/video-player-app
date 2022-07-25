import "./styles.scss";
import formatTimestamp from "../../../../utility/formatTimestamp";

type props = {
  index: number,
  id: number,
  timestamp: number,
}

const Timecode = (props: props): JSX.Element => {
  const formattedTimestamp = formatTimestamp(props.timestamp);

  return (
    <div className="timecodes__episode episode">
      <div className="episode__thumbnail">
        <img src="img/utility/monke.png" alt="" />
      </div>
      <div className="episode__details">
        <div className="episode__title">Timecode №{props.index} #{props.id}</div>
        <div className="episode__timecode">{formattedTimestamp}</div>
      </div>
    </div>
  )
}

export default Timecode;