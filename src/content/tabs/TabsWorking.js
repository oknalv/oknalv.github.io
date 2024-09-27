import { useEffect, useRef, useState } from "react";
import Tab from "./Tab";
import "./Tabs.css";

function Tabs(props) {
    return(
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
    )
}

export default Tabs;