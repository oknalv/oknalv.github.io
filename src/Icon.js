import "./Icon.css";

function Icon(props) {
    const style = props.color ? { color: props.color } : null;
    return(
        <span
            className="icon"
            style={style}
        >
            {props.icon}
        </span>
    )
}

export default Icon;