import "./SectionSelectorElement.css"

function SectionSelectorElement(props) {
    return (
        <div
            className={`section-selector-element${props.selected ? " selected" : ""}`}
            onClick={props.onClick}
        >
            {props.icon}
        </div>
    )
}

export default SectionSelectorElement;
