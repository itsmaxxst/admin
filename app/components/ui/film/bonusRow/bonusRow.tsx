"use client"
import styles from "@/app/components/ui/site/cardRow/cardRow.module.css";
import CardComponent from "@/app/components/ui/site/card/card";

interface bonusRowProps {
    gap: string;
    num: number;
    width: string;
    height?: string;
    hidden: boolean;
    startIndex: number;
    bonusCards: { id: string; img: string; title?: string; desc?: string }[];
    onPrev: () => void;
    onNext: () => void;
}
export default function BonusRow({gap, num, width, hidden, startIndex, height, bonusCards}: bonusRowProps){
    const visibleCards = bonusCards.slice(startIndex, startIndex + num);
    return (
        <div className={styles.carouselWrapper}>
            <div style={{gap: gap}} className={styles.cardContainer}>
                {visibleCards.map((card) => (
                    <CardComponent
                        id={card.id}
                        height={height}
                        hidden={hidden}
                        width={width}
                        key={card.id}
                        img={card.img}
                        title={card.title}
                        description={card.desc}
                    />
                ))}
            </div>
        </div>
    )
}