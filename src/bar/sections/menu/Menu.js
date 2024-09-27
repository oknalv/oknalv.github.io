import { useTranslation } from "react-i18next";
import Section from "../Section";
import MenuEntry from "./MenuEntry";
import getPageIcon from "../../../getPageIcon";

function Menu(props) {
    const { t } = useTranslation();
    return (
        <Section
            name={t("menu")}
        >
            {
                ["home", "experience", "education", "skills", "projects", "contact"].map((p) => {
                    return(
                        <MenuEntry
                            name={t(p)}
                            key={`menu-${p}`}
                            icon={getPageIcon(p)}
                            selected={props.currentPage === p}
                            onClick={() => {
                                props.selectPage(p);
                            }}
                        />
                    )
                })
            }
        </Section>
    )
}

export default Menu;
