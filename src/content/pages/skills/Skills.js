import { useTranslation } from "react-i18next";
import "./Skills.css";

const skills = {
    "programming": ['Front end', 'Back end', 'SQL'],
    "Front end": ['HTML', 'CSS', 'JavaScript'],
    "CSS": ['SASS/SCSS'],
    "JavaScript": ["TypeScript", "Webpack", "RxJS", "Angular"],
    "TypeScript": ["Angular"],
    "RxJS": ["Angular"],
    "methodologies": ["Scrum", "Kanban"]
}
function Skills({fontSize}) {
    const { t } = useTranslation();
    const imgHeight = fontSize[1] * 20;
    const imgWidth = fontSize[0] * 50;
    /*const nodes = Object.keys(skills).reduce((prev, curr) => {
        let node;
        if(!prev.map(p => p.name).includes(curr)) {
            node = {name: curr}
            prev = [...prev, node];
        }
        else {
            node = prev.find(n => n.name === curr);
        }
        node.children = [];
        for(let child of skills[curr]){
            let childNode;
            if(!prev.map(p => p.name).includes(child)) {
                childNode = { name: child };
                prev = [...prev, childNode]
            }
            else {
                childNode = prev.find(n => n.name === child);
            }
            node.children.push(childNode);
        }
        return prev;
    }, []);
    const rootNodes = nodes.filter((n) => {
        for(let s in skills) {
            if(skills[s].includes(n.name)){
                return false;
            }
        }
        return true;
    })
    function giveDepth(nodes, depth) {
        for(let node of nodes) {
            node.depth = node.depth && node.depth > depth ? node.depth: depth;
            if(node.children?.length > 0) {
                giveDepth(node.children, depth + 1);
            }
        }
    }
    giveDepth(rootNodes, 1);
    console.log(rootNodes);*/
    return(
        <div className="skills">
            <div className="ski-title">{t("technologies")}</div>
            <svg
                height={imgHeight}
                width={imgWidth}
                viewBox={`0 0 ${imgWidth} ${imgHeight}`}
                style={{
                    "--font-width": `${fontSize[0]}px`,
                    "--font-height": `${fontSize[1]}px`
                }}
            >
                {/*
                    nodes.map((n, i) => {
                        return
                    })
                */}
                <image
                    href="/img/me.png"
                    style={{
                        height: "calc(var(--font-height) * 5)",
                        clipPath: "inset(0 0 round 50%)"
                    }}
                />
                <text y={fontSize[1]}>{t('programming')}</text>
            </svg>
        </div>
    )
}

export default Skills;