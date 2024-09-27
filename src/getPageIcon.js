import Icon from "./Icon";

const iconByKey = {
    home: {
        code:"H",
        color: "var(--red)"
    },
    experience: {
        code: "L",
        color: "var(--blue)"
    },
    education: {
        code:"S",
        color: "var(--green)"
    },
    skills: {
        code:"T",
        color: "var(--yellow)"
    },
    contact: {
        code:"@",
        color: "var(--cyan)"
    },
    projects: {
        code:"P",
        color: "var(--magenta)"
    }
}

function getPageIcon(page) {
    const icon = iconByKey[page]
    return <Icon icon={icon.code} color={icon.color} />   
}

export default getPageIcon;