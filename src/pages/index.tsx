import { useRef } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Timecodes from "../components/Timecodes";

import "./styles.scss"

const MainPage = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="app-section">
      <VideoPlayer ref={videoRef} />
      <Timecodes />
    </section>
  );
}

export default MainPage;