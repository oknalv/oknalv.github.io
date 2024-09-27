import "./PageImg.css";

function PageImg({fontSize, size, src}) {
    const imgHeight = fontSize[1] * size;
    const imgPadding = fontSize[0] - (imgHeight % fontSize[0]);
    return(
        <img
            className="page-img"
            src={src}
            style={{
                padding: `0 ${imgPadding / 2}px`,
                height: `${imgHeight}px`
            }}
        />
    )
}

export default PageImg;