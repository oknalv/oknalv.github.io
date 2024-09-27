import { useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import "./Tabs.css";

function Tabs(props) {
    const ref = useRef();
    const [isOverflown, setIsOverflown] = useState(false);
    const [scrollPercent, setScrollPercent] = useState(0);
    const [scrollWidth, setScrollWidth] = useState(0);

    function handleScroll() {
        const percent = ref.current.scrollLeft / (ref.current.scrollWidth - ref.current.clientWidth);
        setScrollPercent(percent || 0);
    }

    useEffect(() => {
        ref.current.scrollLeft = (ref.current.scrollWidth - ref.current.clientWidth) * scrollPercent;
    }, [scrollPercent])

    useEffect(() => {
        setIsOverflown(ref.current.scrollWidth > ref.current.clientWidth);
        handleScroll();
        setScrollWidth(ref.current.clientWidth * (1 - (ref.current.scrollWidth - ref.current.clientWidth) / ref.current.scrollWidth))
    }, [props.openPages]);

    useEffect(() => {
        ref.current.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            ref.current.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return(
        <div
            className="tabs-container"
            onWheel={(evt) => {
                ref.current.scrollTo({left: ref.current.scrollLeft + evt.deltaY})
            }}
            ref={ref}
        >
            <div
                className={`tabs`}
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
            {
                isOverflown &&
                <div
                    className="tabs-scroll-bar"
                    style={{
                        '--scroll-percent': scrollPercent,
                        '--scroll-width': `${scrollWidth}px`
                    }}
                    /*onMouseDown={(evt) => {
                        setScrollPercent((evt.nativeEvent.offsetX - scrollWidth / 2) / (ref.current.clientWidth - scrollWidth))
                    }}*/
                    onDrag={(evt) => {
                        console.log(evt);
                    }}
                    draggable
                >
                    <div
                        /*onMouseDown={(evt) => {
                            evt.stopPropagation();
                        }}
                        onMouseMove={(evt) => {
                            evt.stopPropagation();
                            if(evt.nativeEvent.buttons === 1 &&  evt.nativeEvent.movementX !== 0){
                                console.log(scrollPercent, evt.nativeEvent.movementX, scrollWidth, ref.current.clientWidth)
                                
                                setScrollPercent(Math.max(0, Math.min(1, scrollPercent + (evt.nativeEvent.movementX) / (ref.current.clientWidth - scrollWidth))))
                            }
                        }}*/
                    ></div>
                </div>
            }
        </div>
    )
}

export default Tabs;