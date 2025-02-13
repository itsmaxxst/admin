"use client";
import styles from "@/app/components/ui/site/cardRow/cardRow.module.css";
import React, {lazy, Suspense, useState} from "react";
import {Button, Skeleton} from "@nextui-org/react";
import {MdArrowBackIos, MdArrowForwardIos} from "react-icons/md";

const CardComponent = lazy(() => import("@/app/components/ui/site/card/card"));

interface CardRowProps {
    gap: string;
    num: number;
    width: string;
    hidden: boolean;
    cards: { id: string; img: string; title: string; desc?: string }[];
    height?: string;
    isLoading: boolean;
    margin?: string;
}

export default function CardRow({
                                    isLoading,
                                    gap,
                                    num,
                                    width,
                                    hidden,
                                    height,
                                    cards = [],
                                }: CardRowProps) {
    const [startIndex, setStartIndex] = useState(0);

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - num, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + num, cards.length - num));
    };

    const visibleCards = Array.isArray(cards)
        ? cards.slice(startIndex, startIndex + num)
        : [];

    const truncateTitle = (title: string, maxLength: number): string => {
        if (!title) return "";
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + "...";
        }
        return title;
    };

    return (
        <Suspense fallback={null}>
            <div className={styles.carouselWrapper}>
                <div style={{ gap: gap }} className={styles.cardContainer}>
                    {Array.from({ length: num }).map((_, index) => {
                        const card = visibleCards[index];
                        return (
                            <div
                                key={index + startIndex}
                                style={{
                                    width: width,
                                    height: height || "17.1875rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.5rem",
                                }}
                            >
                                {isLoading || !card ? (
                                        <div style={{height:'316px', width: width, display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'0.4rem'}}>
                                            <Skeleton
                                                style={{
                                                    width: "100%",
                                                    height: "15rem",
                                                    borderRadius: "1rem",
                                                }}
                                            />
                                            <Skeleton style={{ width: "80%", height: "0.5rem", borderRadius: "8px" }}/>
                                            <Skeleton style={{ width: "60%", height: "0.5rem", borderRadius: "8px" }}/>
                                        </div>
                                ) : (
                                    <div className={styles.carouselWrapper}>
                                        <Button
                                            isIconOnly
                                            onClick={handlePrev}
                                            className={styles.arrow}
                                            style={{
                                                visibility: startIndex === 0 ? "hidden" : "visible",
                                            }}
                                        >
                                            <MdArrowBackIos/>
                                        </Button>
                                        <div style={{gap: gap}} className={styles.cardContainer}>
                                            {Array.from({length: num}).map((_, index) => {
                                                const card = visibleCards[index];
                                                return (
                                                    <div
                                                        key={index + startIndex}
                                                        style={{
                                                            width: width,
                                                            height: height || "17.1875rem",
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: "0.5rem",
                                                        }}
                                                    >
                                                        <CardComponent
                                                                id={card.id}
                                                                height={height}
                                                                hidden={hidden}
                                                                width={width}
                                                                img={card.img}
                                                                title={truncateTitle(card.title, 15)}
                                                                description={card.desc}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <Button
                                            isIconOnly
                                            onClick={handleNext}
                                            className={styles.arrow}
                                            style={{
                                                top: "35%",
                                                right: "-1.5%",
                                                visibility:
                                                    startIndex + num >= cards.length ? "hidden" : "visible",
                                            }}
                                        >
                                            <MdArrowForwardIos/>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Suspense>
    );
}
