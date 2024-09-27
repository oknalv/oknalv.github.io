import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Bar from "./bar/Bar";
import { useTranslation } from "react-i18next";
import Content from "./content/Content";

function App() {
    const [currentPage, setCurrentPage] = useState(null);
    const [tabHistory, setTabHistory] = useState([]);
    const [openPages, setOpenPages] = useState([]);
    const [theme, setTheme] = useState(window.localStorage.getItem("theme"));
    const { i18n } = useTranslation();

    useEffect(() => {
        selectPage("home")
    }, [])

    useEffect(() => {
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(()=> {
        window.localStorage.setItem("lang", i18n.language);
    }, [i18n.language]);
    
    function selectPage(page) {
        if(!openPages.includes(page)){
            setOpenPages([...openPages, page]);
        }
        setCurrentPage(page);
        if(tabHistory.at(-1) !== page) {
            setTabHistory([...tabHistory, page])
        }
    }

    function closePage(page) {
        if(openPages.includes(page)) {
            setOpenPages(openPages.filter((p) => p !== page));
        }
        const newTabHistory = tabHistory.filter((p) => p !== page);
        setTabHistory(newTabHistory);
        if(currentPage === page) {
            setCurrentPage(newTabHistory.at(-1));
        }
    }

    function changeTabOrder(tabName, left) {
        if(tabName !== currentPage) {
            openPages.splice(openPages.indexOf(currentPage), 1);
            openPages.splice(openPages.indexOf(tabName) + (left ? 0 : 1), 0, currentPage);
            setOpenPages([... openPages]);
        }
    }
    return(
        <div
            className={`app-container${theme === "light" ? " light" : ""}`}
        >
            <Header />
            <div className="app">
                <Bar
                    selectPage={selectPage}
                    currentPage={currentPage}
                    theme={theme}
                    setTheme={setTheme}
                />
                <Content
                    openPages={openPages}
                    currentPage={currentPage}
                    selectPage={selectPage}
                    closePage={closePage}
                    changeTabOrder={changeTabOrder}
                />
            </div>
        </div>
    )

}

export default App;