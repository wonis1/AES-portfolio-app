
import styles from "../styles/SectionTitle.module.css";
import titleIcon from "../../assets/icons/title-icon.png"

type Props = {
    title: string;
    iconUse?: boolean; // iconUse의 유무로 이미지를 넣을건지 말건지 판단해야 함. intro에는 이미지가 없음
    lineUse?: boolean;
    lineColor?: string;
    txtUse?: boolean;
    txtColor?: string;
}

const SectionTitle = ({ title, iconUse = true, lineUse = true, lineColor, txtUse = false, txtColor }: Props) => {
    const spanStyle = {
        ...(lineUse ? { borderBottomColor: lineColor } : {}),
        ...(txtUse ? { color: txtColor } : {}),
    };

    return (
        <h2 className={styles.title}>
            {iconUse && <img className={styles.icon} src={titleIcon} />}
            <span 
            className={lineUse ? styles.line : undefined} 
            style={spanStyle}
            >
                {title}
            </span>
        </h2>
    )
}

export default SectionTitle;
