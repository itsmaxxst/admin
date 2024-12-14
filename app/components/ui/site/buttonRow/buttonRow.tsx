import styles from "@/app/components/ui/site/buttonRow/buttonRow.module.css";
import {Button} from "@nextui-org/react";
interface buttonRowProps {
    titles: string[];
}

export default function ButtonRow({titles}: buttonRowProps) {
    return (
        <div className={styles.buttonContainer}>
            {titles.map((title, index) => (
                <Button key={index} className={styles.button} variant="ghost">
                    {title}
                </Button>
            ))}
        </div>
    )
}