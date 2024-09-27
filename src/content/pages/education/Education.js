import { useTranslation } from "react-i18next";
import "./Education.css";

const education = [
    {
        title: "bachelor",
        years: "2012 - 2016",
        center: "uvigo"
    },
    {
        title: "associate",
        years: "2010 - 2012",
        center: "rodeira"
    }
];

const courses = [
    {
        title: "angular",
        year: "2018",
        center: "vitae"
    },
    {
        title: "scrum",
        year: "2018",
        center: "vitae"
    },
    {
        title: "toeic",
        year: "2017",
        center: "multimedia"
    }
];

function Education(props) {
    const { t } = useTranslation();
    return(
        <div className="education">
            {
                education.map((e, i) => {
                    return (
                        <div
                            key={`education${i}`}
                        >
                            <div className="edu-title">{t(e.title)}</div>
                            <div className="edu-2">
                                <div className="edu-years">{e.years}</div>
                                <div className="edu-center">{t(e.center)}</div>
                            </div>
                            <br />
                        </div>
                    )
                })
            }
            <br />
            <div className="edu-title">{t("courses")}</div>
            <br />
            <div className="edu-2">
            {
                courses.map((c, i) => {
                    return (
                        <div
                            key={`education-course${i}`}
                        >
                            <div className="edu-title2">- {t(c.title)}</div>
                            <div className="edu-2">
                                <div className="edu-years">{c.year}</div>
                                <div className="edu-center">{t(c.center)}</div>
                            </div>
                            {
                                i < courses.length - 1 && <br />
                            }
                        </div>
                    )
                })
            }
                
            </div>
        </div>
    )
}

export default Education;