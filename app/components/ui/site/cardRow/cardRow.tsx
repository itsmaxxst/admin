"use client"
import styles from "@/app/components/ui/site/cardRow/cardRow.module.css";
import {lazy, Suspense, useEffect, useState} from "react";
import {Button} from "@nextui-org/react";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";
const CardComponent = lazy(()=> import("@/app/components/ui/site/card/card"));


interface cardRowProps {
    gap: string;
    num: number;
    total: number;
    width: string;
    hidden: boolean;
    cards: {id:string; img: string; title: string; desc?: string }[];
    height?: string;
}
export default function CardRow({ gap, num, width, hidden, height, total, cards = []}: cardRowProps){
    const [startIndex, setStartIndex] = useState(0);


    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - num, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + num, total - num));
    };

    const visibleCards = Array.isArray(cards) ? cards.slice(startIndex, startIndex + num) : [];

    const truncateTitle = (title: string, maxLength: number): string => {
        if (!title) return '';
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + "...";
        }
        return title;
    };


    return (
        <Suspense fallback={null}>
            <div className={styles.carouselWrapper}>
                <Button
                    isIconOnly
                    onClick={handlePrev}
                    className={styles.arrow}
                    style={{visibility: startIndex === 0 ? "hidden" : "visible"}}>
                    <MdArrowBackIos/>
                </Button>
                <div style={{gap: gap}} className={styles.cardContainer}>
                    {visibleCards.map((card, index) => (
                        <CardComponent
                            id={card.id}
                            height={height}
                            hidden={hidden}
                            width={width}
                            key={index + startIndex}
                            img={card.img}
                            title={truncateTitle(card.title, 15)}
                            description={card.desc}
                        />
                    ))}
                </div>
                <Button
                    isIconOnly
                    onClick={handleNext}
                    className={styles.arrow}
                    style={{top: '35%', right: "-1.5%", visibility: startIndex + num >= total ? "hidden" : "visible"}}>
                    <MdArrowForwardIos/>
                </Button>
            </div>
        </Suspense>
    )
}