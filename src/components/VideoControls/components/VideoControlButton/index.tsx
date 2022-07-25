import { CSSProperties } from "react";
import "./styles.scss";

type props = {
    buttonType: string,
    buttonIconUrl: string,
    onClick?: React.MouseEventHandler,
}

const VideoControlButton = (props: props): JSX.Element => {
    const styles: CSSProperties = {
        backgroundImage: `url(${props.buttonIconUrl})`,
    }

    return (
        <button type="button" onClick={props.onClick} style={styles} className={`vp__control vp__control_${props.buttonType}`}></button>
    )
}

export default VideoControlButton;