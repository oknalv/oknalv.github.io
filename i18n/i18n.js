const en = await (await fetch('/i18n/en.json')).json();
const es = await (await fetch('/i18n/es.json')).json();
const gl = await (await fetch('/i18n/gl.json')).json();
const pt = await (await fetch('/i18n/pt.json')).json();

const i18n = {en, es, gl, pt};

export default i18n;