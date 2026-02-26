import styles from "../styles/SkillTag.module.css";

type Props = {
    title: string;
    defaultcolor?: boolean;
    bgcolor?: string; // supabase에서 가져다 쓸 거
    txtcolor?: string;
};

const SkillTag = ({ title, defaultcolor = false, bgcolor, txtcolor }: Props) => {
    return (
            <li
                className={styles.tag}
                style={!defaultcolor ? { backgroundColor: bgcolor, color: txtcolor } : undefined}
            >
                {title}
            </li>
    );
};

export default SkillTag;