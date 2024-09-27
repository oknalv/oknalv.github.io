import { useEffect, useRef, useState } from "react";
import "./Pages.css";
import Home from "./home/Home";
import Education from "./education/Education";
import Experience from "./experience/Experience";
import Skills from "./skills/Skills";
import Contact from "./contact/Contact";
import Projects from "./projects/Projects";

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
    const [scrollWidth, setScrollWidth] = useState(0);
    const [scrollContainerWidth, setScrollContainerWidth] = useState(0);
    const [isHorizontalOverflown, setIsHorizontalOverflown] = useState(false);
    const [isVerticalOverflown, setIsVerticalOverflown] = useState(false);
    const [numbers, setNumbers] = useState([]);
    const [fontSize, setFontSize] = useState([0, 0]);
    const refPages = useRef();
    const refScroll = useRef();
    const refContainer = useRef();
    const refFontHeight = useRef();
    let preventEvent = false;
    useEffect(() => {
        props.openPages.map((p) => {
            if(!(p in pages)) {
                const _Page = availablePages[p];
                pages[p] = <_Page fontSize={fontSize} />;
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
        const observer = new ResizeObserver(() => {
            setNumbers(([...Array(Math.floor(refPages.current.clientHeight / fontHeight)).keys()].map(n => n + 1)));
            setIsHorizontalOverflown(refPages.current.scrollWidth > refPages.current.clientWidth);
            setIsVerticalOverflown(refPages.current.clientHeight > refContainer.current.clientHeight);
            setScrollWidth(refPages.current.scrollWidth);
            setScrollContainerWidth(refPages.current.clientWidth);
        })
        observer.observe(refPages.current)
        return () => refPages.current && observer.unobserve(refPages.current)
    }, [])

    function onWheel(evt) {
        if(evt.shiftKey) {
            refScroll.current.scrollTo({left: refScroll.current.scrollLeft + evt.deltaY})
        }
        else {
            refPages.current.scrollTo({top: refPages.current.scrollTop + evt.deltaY})
        }
    }
    return(
        <div
            className="pages-container"
            onWheel={onWheel}
            ref={refContainer}
        >
            <div className="pages-font-height-ref" ref={refFontHeight}>A</div>
            <div className="pages-numbers"
            >
                {
                    numbers.map(n => <div className="pages-number" key={n}>{n}</div>)
                }
            </div>
            <div
                className="pages"
                ref={refPages}
                onScroll={() => {
                    if(preventEvent){
                        preventEvent = false;
                        return;
                    }
                    preventEvent = true;
                    refScroll.current.scrollLeft = refPages.current.scrollLeft;
                }}
            >
                {
                    Object.keys(pages).map((p) => {
                        return (
                            <div key={p} className={`page${props.currentPage === p ? " visible" : ""}`}>
                                { pages[p] }
                            </div>
                        )
                    })
                }
            </div>
            <div
                className="pages-scroll"
                style={{
                    display: isHorizontalOverflown ? 'initial' : 'none',
                    width: `${scrollContainerWidth}px`,
                    right: `${isVerticalOverflown ? 15 : 0 }px`
                }}
                ref={refScroll}
                onScroll={()=> {
                    if(preventEvent){
                        preventEvent = false;
                        return;
                    }
                    preventEvent = true;
                    refPages.current.scrollLeft = refScroll.current.scrollLeft;
                }}
                
            >
                <div
                    style={{
                        width: `${scrollWidth}px`,
                        height: '1px'
                    }}
                ></div>
            </div>
        </div>
    )
}

export default Pages;