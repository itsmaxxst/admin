"use client"
import styles from "@/app/components/ui/site/cardRow/cardRow.module.css";
import CardComponent from "@/app/components/ui/site/card/card";

interface cardRowProps {
    gap: string;
    num: number;
    total: number;
    width: string;
    height?: string;
    img: string;
    hidden: boolean;
    title?: string;
    desc?: string;
    onPrev: () => void;
    onNext: () => void;
    startIndex: number;
}
export default function CardRow({gap, num, width, img, hidden, total, title, desc, startIndex, height}: cardRowProps){
    const cardsArray = Array(total).fill(null);
    const visibleCards = cardsArray.slice(startIndex, startIndex + num);
    return (
        <div className={styles.carouselWrapper}>
            <div style={{gap: gap}} className={styles.cardContainer}>
                {visibleCards.map((_, index) => (
                    <CardComponent
                        height={height}
                        hidden={hidden}
                        width={width}
                        key={index + startIndex}
                        img={img}
                        title={title}
                        description={desc}
                    />
                ))}
            </div>
        </div>
    )
}