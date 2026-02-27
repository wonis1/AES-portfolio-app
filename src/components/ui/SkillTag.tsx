import styles from "../styles/SkillTag.module.css";

type Props = {
    title: string;
    defaultcolor?: boolean;
    bgcolor?: string;
    txtcolor?: string;
    as?: "li" | "button"; // projects에서 쓸지 skills에서 쓸지 결정함
    active?: boolean;
    onClick?: () => void;
    show?: boolean; // projects에서는 show 안 쓸거라서 ?처리
};

const SkillTag = ({
    title,
    defaultcolor = false,
    bgcolor,
    txtcolor,
    as = "li",
    active = false,
    onClick,
    show
}: Props) => {
    const tagStyle = !defaultcolor && bgcolor && txtcolor
        ? { backgroundColor: bgcolor, color: txtcolor, borderColor: "rgba(0, 0, 0, 0.2)" }
        : undefined;
    const className = `${styles.tag} ${as === "button" ? styles.buttonTag : ""} ${active ? styles.active : ""}`.trim();

    if (as === "button") {
        return (
            <button
                type="button"
                className={className}
                style={tagStyle}
                onClick={onClick}
                aria-pressed={active}
            >
                {title}
            </button>
        );
    }


    if (show) {
        return (
            <li className={className} style={tagStyle}>
                {title}
            </li>
        );
    }
};

export default SkillTag;
