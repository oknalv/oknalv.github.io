import i18nKeyValues from "./i18n.js";
const i18nElements = document.querySelectorAll('[data-i18n]');
const langSelector = document.getElementById("lang-selector");
const headerHome = document.getElementById("header-home");
const sections = {
    "home" : document.getElementById("home"),
    "education" : document.getElementById("education"),
    "experience" : document.getElementById("experience"),
    "projects" : document.getElementById("projects")
};
const defaultLanguage = "en";
const languageList = {
    "en": "English",
    "es": "español",
    "fr": "français",
    "gl": "galego"
}
const switchSectionTime = 500;
const switchLanguageTime = 500;
const switchTabTime = 250;

let changingPath = false;

document.body.setAttribute("style", `--switch-section-time: ${switchSectionTime}ms; --switch-language-time: ${switchLanguageTime}ms; --switch-tab-time: ${switchTabTime}ms`);

window.navigate = (path) => {
    let currentPath = document.body.classList[0];
    if(!changingPath){
        if(currentPath != path){
            changingPath = true;
            document.body.classList.remove("home", "education", "experience", "projects");
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
                    changingPath = false;
                }, switchSectionTime);
            }, switchSectionTime);
        }
    }
}

const getTextForElement = (key, lang) => {
    let text = i18nKeyValues[key][lang];
    if(text == undefined){
        console.warn(`'${key}' text key doesn't have a translation for '${lang}' language`);
    }
    return text == undefined ? i18nKeyValues[key][defaultLanguage] : text;
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

startLangSelector();