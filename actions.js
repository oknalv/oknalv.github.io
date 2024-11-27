import i18n from './i18n/i18n.js';

const data = await (await fetch("./data/data.json")).json();

const createElement = (type, classList, translationKey, children) => {
    const el = document.createElement(type);
    if(classList) {
        el.classList = classList;
    }
    if(translationKey) {
        el.setAttribute("data-i18n", translationKey);
    }
    if(children) {
        children.forEach(c => {
            el.append(c);
        })
    }
    return el;
}

const createLink = (link, name) => {
    const l = document.createElement("a");
    l.setAttribute("target", "_blank");
    l.setAttribute("href", link);
    l.setAttribute("rel", "noopener noreferrer");
    l.append(name || link)
    return l;
}

const createImg = (src) => {
    const img = document.createElement("img");
    img.src = src;
    return img;
}

const fillExperience = () => {
    const experienceContainer = document.getElementById("jobs");
    data.experience.forEach(e => {
        const from = `${e.from} - `;
        let to = e.to;
        if(to === "present") {
            to = createElement("span", null, "present");
        }
        experienceContainer.append(createElement("div", "date", null, [from, to]));
        
        experienceContainer.append(createElement("div", "lateral-bar"));
        
        const jobDiv = createElement("div", "job", null, [
            createElement("h2", null, e.title),
            createElement("h3", null, e.place),
            createElement("ul", null, null, 
                [...Array(e.description).keys()].map((d) => createElement("li", null, `${e.place}${d}`))
            )
        ]);

        if(e.note) {
            jobDiv.append(createElement("p", null, null, [
                createElement("span", null, "note"),
                " ",
                createElement("span", null, `${e.place}_note`)
            ]))
        }
        experienceContainer.append(jobDiv);

    });
}

const fillEducation = () => {
    const educationContainer = document.getElementById("formal");
    data.education.formal.forEach(e => {
        educationContainer.append(createElement("li", null, null, [
            createElement("div", null, null, [
                createElement("h2", null, e.title),
                createElement("span", null, e.years)
            ]),
            createElement("h3", null, e.center)
        ]));
    });
    const coursesContainer = document.getElementById("courses");
    data.education.courses.forEach(e => {
        coursesContainer.append(createElement("li", null, null, [
            createElement("div", null, null, [
                createElement("h2", null, e.title),
                createElement("span", null, e.year)
            ]),
            createElement("h3", null, e.center)
        ]));
    });
}

const fillSkills = () => {
    const programmingContainer = document.getElementById("programming");
    Object.keys(data.skills.technical.programming).forEach(p => {
        programmingContainer.append(createElement("li", null, null, [
            createElement("h3", "collapser", p),
            createElement(
                "ul",
                "collapsable collapsed",
                null,
                data.skills.technical.programming[p].map(s => createElement("li", null, s)))
        ]));
    });
    const methodologiesContainer = document.getElementById("methodologies");
    data.skills.technical.methodologies.forEach(m => {
        methodologiesContainer.append(createElement("li", null, null, [
            createElement("h3", null, m)
        ]))
    });
    const languagesContainer = document.getElementById("languages");
    data.skills.languages.forEach(l => {
        languagesContainer.append(createElement("li", null, null, [
            createElement("h3", null, l)
        ]));
    })
}

const fillProjects = () => {
    const projectsContainer = document.getElementById("projects");
    data.projects.forEach(p => {
        const projectLinks = [];
        if(p.page) {
            projectLinks.push(createElement("li", null, null, [
                createElement("span", null, "page"),
                " ",
                createLink(p.page)
            ]))
        }
        const codeLi = createElement("li", null, null, [
            createElement("span", null, "code"),
        ]);
        if(p.code.length > 1) {
            codeLi.append(createElement(
                "ul",
                null,
                null,
                p.code.map(c => createElement("li", null, null, [createLink(c)]))
            ));
        }
        else {
            codeLi.append(" ");
            codeLi.append(createLink(p.code[0]));
        }
        projectLinks.push(codeLi);
        if(p.screenshots) {
            projectLinks.push(createElement("li", null, null, [
                createElement("span", "collapser", "screenshots"),
                createElement("div", "collapsable collapsed", null, [
                    createElement(
                        "div",
                        "gallery",
                        null,
                        [...Array(p.screenshots).keys()].map((s) => createImg(`img/${p.name}_${s}.png`))
                    )
                ])
            ]))
        }
        if(p.youtube) {
            const videoIframe = document.createElement("iframe");
            videoIframe.width = 560;
            videoIframe.height = 315;
            videoIframe.src = `https://www.youtube.com/embed/${p.youtube}`;
            videoIframe.style = "border: 0px";
            videoIframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
            videoIframe.allowFullscreen = true;
            projectLinks.push(createElement("li", null, null, [
                createElement("span", null, "video"),
                createElement("div", "video", null, [videoIframe])
            ]));
        }
        projectsContainer.append(createElement("header", "collapser", null, [
            createElement("h2", null, null, [
                createImg(`img/${p.name}${p.themed ? "_light" : ""}.svg`)
            ]),
            createElement("h3", null, `${p.name}_header`)
        ]))
        projectsContainer.append(createElement("div", "collapsable collapsed", null, [
            createElement("ul", null, null, projectLinks),
            ...([...Array(p.description).keys()]).map(d =>  createElement("p", null, `${p.name}${d}`))
        ]));
    })
}

const fillContact = () => {
    const contactContainer = document.getElementById("contact-container");
    data.contact.forEach((c) => {
        const contactLink = createLink(c.link, c.name);
        contactLink.prepend(createImg(`img/${c.page}${c.themed ? "_light": ""}.svg`));
        contactContainer.append(contactLink);
    })
}

fillExperience();
fillEducation();
fillSkills();
fillProjects();
fillContact();

const i18nElements = document.querySelectorAll('[data-i18n]');
const langSelector = document.getElementById("lang-selector");
const headerHome = document.getElementById("header-home");
const imgViewer = document.getElementById("img-viewer");
const imgViewerImg = imgViewer.children[1].children[0];
const sections = {
    "home" : document.getElementById("home"),
    "experience" : document.getElementById("experience"),
    "education" : document.getElementById("education"),
    "skills" : document.getElementById("skills"),
    "projects" : document.getElementById("projects"),
    "contact" : document.getElementById("contact")
};
const defaultLanguage = "en";

const languageList = Object.keys(i18n).reduce((a, l) => {
    a[l] = i18n[l][l];
    return a;
}, {});

const switchSectionTime = 500;
const switchLanguageTime = 500;
const switchTabTime = 250;
const collapserTime = 250;

let changingPath = false;

document.body.setAttribute("style", `--switch-section-time: ${switchSectionTime}ms; --switch-language-time: ${switchLanguageTime}ms; --switch-tab-time: ${switchTabTime}ms; --collapser-time: ${collapserTime}ms`);

window.navigate = (path) => {
    let currentPath = document.body.classList[0];
    if(!changingPath){
        if(currentPath != path){
            changingPath = true;
            document.body.classList.remove("home", "experience", "education", "skills", "projects", "contact");
            if(path == "home"){
                headerHome.classList.add("home");
                sections[path].classList.remove("hide");
            }
            else{
                headerHome.classList.remove("home");
            }
            setTimeout(() => {
                if(currentPath != "home"){
                    sections[currentPath].classList.add("hide");
                }
                sections[path].classList.remove("hide");
                setTimeout(() => {
                    document.body.classList.add(path);
                    closeCollapsers(document);
                    changingPath = false;
                }, switchSectionTime);
            }, switchSectionTime);
        }
    }
}

const getTextForElement = (key, lang) => {
    let text = i18n[lang][key];
    if(text == undefined){
        console.warn(`'${key}' text key doesn't have a translation for '${lang}' language`);
    }
    return text == undefined ? i18n[defaultLanguage][key] || key : text;
}

const changeLang = (lang, option) => {
    if(!option.parentElement.classList.contains("selecting")){
        option.parentElement.classList.add("selecting");
    }
    else {
        for(let opt of langSelector.children){
            opt.classList.remove("selected");
        }
        option.parentElement.classList.remove("selecting");
        option.classList.add("selected");
        for(let el of i18nElements){
            el.innerHTML = getTextForElement(el.getAttribute("data-i18n"), lang);
        }
    }
};

window.closeLangSelector = () => {
    langSelector.classList.remove("selecting");
}

window.closeImgViewer = () => {
    imgViewer.classList.remove("open");
}

window.switchLight = () => {
    if(document.documentElement.classList.contains("light")){
        document.documentElement.classList.remove("light");
    }
    else {
        document.documentElement.classList.add("light");
    }
}


const startLangSelector = () => {
    for(let key in languageList){
        let option = document.createElement("div");
        langSelector.append(option);
        option.id = `opt-${key}`;
        option.onclick = () => changeLang(key, option);
        option.textContent = languageList[key];
    }
    let browserLanguage = navigator.language.split("-")[0];
    if(!(browserLanguage in languageList)){
        browserLanguage = defaultLanguage;
    }
    document.getElementById(`opt-${browserLanguage}`).classList.add("selected");
    for(let el of i18nElements){
        el.innerHTML = getTextForElement(el.getAttribute("data-i18n"), browserLanguage);
    }
}

const closeCollapsers = (parent) => {
    for(let col of parent.querySelectorAll(".collapser.rotate")){
        col.onclick();
    }
}

const startCollapsers = () => {
    for(let collapser of document.getElementsByClassName("collapser")){
        let collapsable = collapser.nextElementSibling;
        collapser.onclick = () => {
            if(collapsable.classList.contains("collapsed")){
                collapsable.classList.remove("collapsed");
                collapser.classList.add("rotate");
            }
            else {
                collapsable.classList.add("collapsed");
                collapser.classList.remove("rotate");
                closeCollapsers(collapsable);
            }
        }
        if(collapsable.classList.contains("collapsed")){
            collapser.classList.remove("rotate");
        }
        else {
            collapser.classList.add("rotate");
        }
        
    }
}

const startGalleries = () => {
    for(let gallery of document.getElementsByClassName("gallery")){
        for(let img of gallery.children){
            img.onclick = () => {
                console.log(imgViewerImg, img);
                imgViewerImg.src = img.src;
                imgViewer.classList.add("open");
            }
        }
    }
}

startLangSelector();
startCollapsers();
startGalleries();