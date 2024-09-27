import "./Content.css";
import Pages from "./pages/Pages";
import Tabs from "./tabs/Tabs";

function Content(props) {
    return(
        <div className="content">
            <Tabs
                openPages={props.openPages}
                currentPage={props.currentPage}
                selectPage={props.selectPage}
                closePage={props.closePage}
                changeTabOrder={props.changeTabOrder}
            />
            <Pages
                currentPage={props.currentPage}
                openPages={props.openPages}
            />
        </div>
    )
}

export default Content;