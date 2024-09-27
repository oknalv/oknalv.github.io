import "./Section.css"

function Section(props) {
    return (
        <div className="section">
            <div className="section-name">{props.name}</div>
            <div className="section-content" tabIndex={0}>{props.children}</div>
        </div>
    )
}

export default Section;
