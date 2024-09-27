import { useTranslation } from "react-i18next";
import "./Select.css";
import { useRef } from "react";
import Icon from "./Icon";

function Select(props) {
    const { t } = useTranslation();
    const ref = useRef(null);
    return(
        <div
            className="select"
            tabIndex={2}
            ref={ref}
        >
            <div className="select-value">
                <span>{t(props.value)}</span>
                <span className="select-value-arrow"><Icon icon="D" /></span>
            </div>
            <div className="select-options">
                {
                    props.options.sort((a, b) => t(a).localeCompare(t(b))).map((o) => {
                        return (
                          <div
                            className="select-option"
                            key={o}
                            onClick={() => {
                                props.onSelect(o);
                                ref.current.blur();
                            }}
                          >
                            {t(o)}
                          </div>  
                        );
                    })
                }
            </div>
        </div>
    )
}

export default Select;