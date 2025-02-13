import styles from "@/app/components/ui/site/rowTitle/rowTitle.module.css";
import {Link} from "@nextui-org/react";
import React, {lazy, Suspense} from "react";
const CardRow = lazy(()=> import("@/app/components/ui/site/cardRow/cardRow"));

interface rowTitleProps {
    title: string;
    description?: string;
    marginTop?: string;
    gap: string;
    num: number;
    total: number;
    width: string;
    height?: string;
    hidden: boolean;
    titleDesc?: string;
    titleFont?: string;
    cards: { id: string; img: string; title: string; desc?: string }[];
    isLoading: boolean;
}

export default function rowTitle({isLoading, title, description, marginTop, gap, num, width, cards, hidden, total, titleDesc, titleFont, height}: rowTitleProps){
    return (
        <Suspense>
            <div className={styles.cardWrapper} style={{marginTop: marginTop, zIndex: '3'}}>
                <div className={styles.headerContainer}>
                    <h1 className={styles.title} style={{fontSize: titleFont}}>{title}<span
                        className={styles.desc}>{titleDesc}</span></h1>
                    <Link style={{cursor: 'pointer'}} className={styles.showMore}>{description}</Link>
                </div>
                <CardRow isLoading={isLoading} height={height} total={total} gap={gap} num={num} width={width} cards={cards} hidden={hidden}/>
            </div>
        </Suspense>
    )
}