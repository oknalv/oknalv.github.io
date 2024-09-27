import { useTranslation } from "react-i18next";
import "./Home.css";
import PageImg from "../PageImg";

function Home({fontSize}) {
    const { t } = useTranslation();
    return(
        <div className="home">
            <div
                className="home-img"
            >
                <PageImg
                    src="/img/me.png"
                    size={15}
                    fontSize={fontSize}
                />
            </div>
            <br />
            <div className="home-title">
                {t("hello")}
            </div>
            <br />
            <div>
                {t("myself")}
            </div>
            <br />
            <div>
                {t("vscode")}
            </div>
        </div>
    )
}

export default Home;