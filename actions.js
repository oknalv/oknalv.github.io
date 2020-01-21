const header = d3.select(".header-menu").select("header");
let navigate = (path) => {
    header.attr("class", null)
    header.classed(path, true);
}