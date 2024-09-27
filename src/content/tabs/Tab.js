import { useTranslation } from "react-i18next";
import "./Tab.css";
import { useRef, useState } from "react";
import Icon from "../../Icon";
import getPageIcon from "../../getPageIcon";

function Tab(props) {
    const { t } = useTranslation();
    const[[draggingOverLeft, draggingOverRight], setDraggingOver] = useState([false, false]);
    const ref = useRef(null);
    return(
        <div
            className={`tab${props.selected ? " selected" : ""} ${draggingOverRight ? " dragging-over-right" : draggingOverLeft ? " dragging-over-left" : ""}`}
            onClick={props.selectPage}
            onDrag={props.onDrag}
            draggable="true"
            onDragOver={(evt) => {
                evt.preventDefault();
                const halfWidth = ref.current.offsetWidth / 2;
                const mousePositionX = evt.nativeEvent.offsetX;
                setDraggingOver(halfWidth < mousePositionX ? [false, true] : [true, false])
            }}
            onDragLeave={() => {
                setDraggingOver([false, false]);
            }}
            onDrop={() => {
                props.changeTabOrder(draggingOverLeft);
                setDraggingOver([false, false]);
            }}
            onDragStart={props.onDragStart}
            ref={ref}
        >
            {getPageIcon(props.name)} {t(props.name)}
            <span
                className="tab-close"
                onClick={(evt) => {
                    evt.stopPropagation();
                    props.closePage();
                }}
            >
                <Icon icon="X" />
            </span>
        </div>
    )
}

export default Tab;