import { useRef, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import Timecodes from "../components/Timecodes";

import "./styles.scss"

const MainPage = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    console.log(videoRef.current)

  }, [videoRef])

  return (
    <section className="app-section">
      <VideoPlayer ref={videoRef} />
      <Timecodes videoRef={videoRef.current} />
    </section>
  );
}

export default MainPage;