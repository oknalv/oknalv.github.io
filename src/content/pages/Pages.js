import { useEffect, useRef, useState } from "react";
import "./Pages.css";
import Home from "./home/Home";
import Education from "./education/Education";
import Experience from "./experience/Experience";
import Skills from "./skills/Skills";
import Contact from "./contact/Contact";
import Projects from "./projects/Projects";
import Page from "./Page";
import getPageIcon from "../../getPageIcon";

const availablePages = {
    home: Home,
    education: Education,
    experience: Experience,
    skills: Skills,
    contact: Contact,
    projects: Projects
}

function Pages(props) {
    const [pages, setPages] = useState({});
    const [fontSize, setFontSize] = useState([0, 0]);
    const refFontHeight = useRef();
    useEffect(() => {
        props.openPages.map((p) => {
            if(!(p in pages)) {
                pages[p] = availablePages[p];
            }
        });
        Object.keys(pages).map((p) => {
            if(!props.openPages.includes(p)){
                delete pages[p];
            }
        });
        setPages({...pages});
    }, [props.openPages]);

    useEffect(() => {
        const fontWidth = refFontHeight.current.getBoundingClientRect().width;
        const fontHeight = refFontHeight.current.getBoundingClientRect().height;
        setFontSize([fontWidth, fontHeight]);
    }, [])
    return(
        <div
            className="pages-container"
        >
            <div className="pages-font-height-ref" ref={refFontHeight}>A</div>
            {
                Object.keys(pages).map((p) => {
                    return (
                        <Page
                            key={p}
                            visible={props.currentPage === p}
                            page={pages[p]}
                            fontSize={fontSize}
                        />
                    )
                })
            }
        </div>
    )
}

export default Pages;