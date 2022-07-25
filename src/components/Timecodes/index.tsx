import { useEffect, useState } from "react";
import Timecode from "./components/Timecode";
import "./styles.scss";

import TimecodesInterface from "../../types";
import sortArray from "../../utility/sortArray";

const Timecodes = (): JSX.Element => {
  const [timeCodes, setTimeCodes] = useState<TimecodesInterface[]>([] as TimecodesInterface[]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://www.mocky.io/v2/5e60c5f53300005fcc97bbdd");
      const data = await response.json();

      setTimeCodes(data);
    }

    fetchData();
  }, []);

  const sortedTimecodes = sortArray(timeCodes, "ascend");
  const timecodesList = sortedTimecodes && sortedTimecodes.map((item, index) => <Timecode key={index} id={item.id} index={index + 1} timestamp={item.timestamp} />);

  return (
    <div className="timecodes">
      <div className="timecodes__header">
        <div className="timecodes__title-container">
          <div className="timecodes__title">
            <h2>Timecodes</h2>
          </div>
        </div>
      </div>
      <div className="timecodes__list">
        {timecodesList}
      </div>
    </div>
  )
}

export default Timecodes;