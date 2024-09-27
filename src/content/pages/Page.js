import { useEffect, useRef, useState } from "react";
import "./Page.css";

function Page(props) {
    const [scrollWidth, setScrollWidth] = useState(0);
    const [scrollContainerWidth, setScrollContainerWidth] = useState(0);
    const [isHorizontalOverflown, setIsHorizontalOverflown] = useState(false);
    const [numbers, setNumbers] = useState([]);
    const [marginBottom, setMarginBottom] = useState(0);
    const [showPage, setShowPage] = useState(false);
    const refPage = useRef();
    const refScroll = useRef();
    const refContainer = useRef();
    let preventEvent = false;
    
    const _Page = props.page;

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            
            if(refContainer.current == null) {
                debugger;
            }
            const newMarginBottom = refContainer.current?.clientHeight - props.fontSize[1] || 0;
            if(newMarginBottom !== marginBottom && newMarginBottom > 0) {
                setMarginBottom(refContainer.current.clientHeight - props.fontSize[1])
            }
            const newNumbers = ([...Array(Math.floor(refPage.current.clientHeight / props.fontSize[1])).keys()].map(n => n + 1));
            if(numbers.length !== newNumbers.length && newNumbers.length !== 0){
                setNumbers(newNumbers);
            }
            setIsHorizontalOverflown(refPage.current.scrollWidth > refPage.current.clientWidth);
            setScrollWidth(refPage.current.scrollWidth);
            setScrollContainerWidth(refPage.current.clientWidth);
        })
        observer.observe(refPage.current);
        setTimeout(() => {
            if(!showPage) {
                setShowPage(true);
            }
        }, 100);
        return () => refPage.current && observer.unobserve(refPage.current);
    }, [])

    function onWheel(evt) {
        if(evt.shiftKey) {
            refScroll.current.scrollTo({left: refScroll.current.scrollLeft + evt.deltaY})
        }
        else {
            refPage.current.scrollTo({top: refPage.current.scrollTop + evt.deltaY})
        }
    }
    return(
        <div
            className={`page-container${props.visible ? " visible" : ""}${showPage ? " show" : ""}`}
            onWheel={onWheel}
            ref={refContainer}
        >
            <div
                className="page-numbers"
            >
                {
                    numbers.map(n => <div className="page-number" key={n}>{n}</div>)
                }
            </div>
            <div
                className="page"
                ref={refPage}
                onScroll={() => {
                    if(preventEvent){
                        preventEvent = false;
                        return;
                    }
                    preventEvent = true;
                    refScroll.current.scrollLeft = refPage.current.scrollLeft;
                }}
                style={{
                    marginBottom: `${marginBottom}px`
                }}
            >
                <_Page fontSize={props.fontSize}/>
                <div
                    className="page-scroll"
                    style={{
                        display: isHorizontalOverflown ? 'initial' : 'none',
                        width: `${scrollContainerWidth}px`
                    }}
                    ref={refScroll}
                    onScroll={()=> {
                        if(preventEvent){
                            preventEvent = false;
                            return;
                        }
                        preventEvent = true;
                        refPage.current.scrollLeft = refScroll.current.scrollLeft;
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
        </div>
    )
}

export default Page;