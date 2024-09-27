import { useTranslation } from "react-i18next";
import Section from "../Section";
import "./Settings.css";
import Select from "../../../Select";

function Settings(props) {
    const { t, i18n } = useTranslation();
    return (
        <Section
            name={t("settings")}
        >
            <div className="settings">
                <div className="setting">
                    <div className="setting-title">{t("language")}</div>
                    <Select
                        value={i18n.language}
                        options={i18n.languages}
                        onSelect={i18n.changeLanguage}
                    />
                </div>
                <div className="setting">
                    <div className="setting-title">{t("theme")}</div>
                    <Select
                        value={props.theme}
                        options={["light", "dark"]}
                        onSelect={props.setTheme}
                    />
                </div>
            </div>
        </Section>
    )
}

export default Settings;
