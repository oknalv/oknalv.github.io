import getPageIcon from "../../../getPageIcon";
import "./MenuEntry.css";

function MenuEntry(props) {
    return (
        <div
            className={`menu-entry${props.selected ? " selected" : ""}`}
            onClick={props.onClick}
            tabIndex={1}
        >
            {props.icon} {props.name}
        </div>
    )
}

export default MenuEntry;
