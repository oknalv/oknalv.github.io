import { useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import "./Tabs.css";

function Tabs(props) {
    const refTabs = useRef();
    const refScroll = useRef();
    const [isOverflown, setIsOverflown] = useState(false);
    const [scrollWidth, setScrollWidth] = useState(0);
    let preventEvent = false;
    useEffect(() => {
        setIsOverflown(refTabs.current.scrollWidth > refTabs.current.clientWidth);
        setScrollWidth(refTabs.current.scrollWidth);
    }, [props.openPages]);
    return(
        <div className="tabs-container">
            <div
                className={`tabs`}
                onWheel={(evt) => {
                    refTabs.current.scrollTo({left: refTabs.current.scrollLeft + evt.deltaY})
                }}
                onScroll={() => {
                    if(preventEvent){
                        preventEvent = false;
                        return;
                    }
                    preventEvent = true;
                    refScroll.current.scrollLeft = refTabs.current.scrollLeft;
                }}
                ref={refTabs}
            >
                {
                    props.openPages.map((p) => {
                        return(
                            <Tab
                                key={p}
                                name={p}
                                selected={p === props.currentPage}
                                selectPage={() => {
                                    props.selectPage(p);
                                }}
                                closePage={() => {
                                    props.closePage(p);
                                }}
                                onDragStart={() => {
                                    props.selectPage(p);
                                }}
                                changeTabOrder={(left) => {
                                    props.changeTabOrder(p, left);
                                }}
                            />
                        )
                    })
                }
            </div>
            <div
                className="tabs-scroll"
                style={{
                    display: isOverflown ? 'initial' : 'none'
                }}
                ref={refScroll}
                onWheel={(evt) => {
                    refScroll.current.scrollTo({left: refScroll.current.scrollLeft + evt.deltaY})
                }}
                onScroll={()=> {
                    if(preventEvent){
                        preventEvent = false;
                        return;
                    }
                    preventEvent = true;
                    refTabs.current.scrollLeft = refScroll.current.scrollLeft;
                }}
            >
                <div
                    style={{
                        width: `${scrollWidth}px`
                    }}
                ></div>
            </div>
        </div>
    )
}

export default Tabs;