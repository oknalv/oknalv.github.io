import { useState } from "react";
import "./Bar.css"
import SectionSelector from "./section-selector/SectionSelector";
import Sections from "./sections/Sections";

function Bar(props) {
    const [selector, selectSelector] = useState("home");
    return (
        <div className="bar">
            <SectionSelector
                selector={selector}
                selectSelector={selectSelector}
            />
            <Sections
                section={selector}
                currentPage={props.currentPage}
                selectPage={props.selectPage}
                theme={props.theme}
                setTheme={props.setTheme}
            />
        </div>
    )
}

export default Bar;
