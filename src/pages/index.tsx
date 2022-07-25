import VideoPlayer from "../components/VideoPlayer";
import Timecodes from "../components/Timecodes";

import "./styles.scss"

const MainPage = (): JSX.Element => {
  return (
    <section className="app-section">
      <VideoPlayer />
      <Timecodes />
    </section>
  );
}

export default MainPage;