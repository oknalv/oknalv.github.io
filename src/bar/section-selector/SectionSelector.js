import Icon from "../../Icon";
import "./SectionSelector.css"
import SectionSelectorElement from "./SectionSelectorElement";

function SectionSelector(props) {
    return (
        <div className="section-selector">
            <SectionSelectorElement
                icon={<Icon icon="F" />}
                selected={props.selector === "home"}
                onClick={() => {
                    props.selectSelector("home")
                }}
            />
            <SectionSelectorElement
                icon={<Icon icon="C" />}
                selected={props.selector === "settings"}
                onClick={() => {
                    props.selectSelector("settings")
                }}
            />
        </div>
    )
}

export default SectionSelector;
