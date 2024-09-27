import { useTranslation } from "react-i18next";
import "./Header.css";

function Header() {
    const { t } = useTranslation();
    return(
        <div className="header">
            <img src="/img/me.png" alt="me"/> {t("header")}
        </div>
    )
}

export default Header;