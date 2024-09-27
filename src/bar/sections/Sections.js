import Menu from "./menu/Menu";
import "./Sections.css"
import Settings from "./settings/Settings";

function Sections(props) {
    return (
        <div className="sections">
            {
                props.section === "home" &&
                <Menu
                    selectPage={props.selectPage}
                    currentPage={props.currentPage}
                />
            }
            {
                props.section === "settings" &&
                <Settings
                    theme={props.theme}
                    setTheme={props.setTheme}
                />
            }
        </div>
    )
}

export default Sections;
