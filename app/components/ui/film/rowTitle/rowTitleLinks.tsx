"use client"
import styles from "@/app/components/ui/film/rowTitle/rowTitleLinks.module.css"
import {Button, Tabs, Tab} from "@nextui-org/react";
import CardRow from "@/app/components/ui/film/cardRow/cardRow";
import AvatarComponent from "@/app/components/ui/film/avatarComponent/avatarComponent"
import {LeftArrow} from "@/data/public/LeftArrow";
import {RightArrow} from "@/data/public/RightArrow";
import React, { useState } from "react";

interface rowTitleLinksProps {
    marginTop?: string;
    gap: string;
    num: number;
    total: number;
    width: string;
    height?: string;
    img: string;
    hidden: boolean;
    footerTitle?: string;
    footerDesc?: string;
    actorsAndRoles?: [string, string][];
}

export default function RowTitleLinks({actorsAndRoles=[], marginTop, gap, num, width, img, hidden, total, footerTitle, footerDesc, height}: rowTitleLinksProps){
    const [startIndex, setStartIndex] = useState(0);

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - num, 0));
    };
    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + num, total - num));
    };

    const actors = actorsAndRoles.filter(([name, role]) => role === "Actor");

    return (
        <div className={styles.cardWrapper} style={{marginTop: marginTop, zIndex: '3'}}>
            <div className={styles.headerContainer}>
                <div>
                    <Tabs variant='underlined' size="lg" className={styles.tabs} classNames={{
                        tabContent:`${styles.base} group-data-[selected=true]:text-[#06b6d4]`,
                        cursor: styles.cursor}}>
                        <Tab title={"Бонусний контент"}>
                            <div style={{display: "flex", justifyContent: "end", alignItems: "center", gap: "8px", position: "relative", left:"50%", width:"50%", marginTop: "-50px"}}>
                                <Button isIconOnly style={{background:"transparent"}} onClick={handlePrev}><LeftArrow/></Button>
                                <Button isIconOnly style={{background:"transparent"}} onClick={handleNext}><RightArrow/></Button>
                            </div>
                            <CardRow height={height} total={total} gap={gap} num={num} width={width} img={img} hidden={hidden} title={footerTitle} desc={footerDesc} onNext={handleNext} onPrev={handlePrev} startIndex={startIndex}/>
                        </Tab>
                        <Tab title={"Команда та актори"}>
                            <div style={{display:"flex", justifyContent:"space-between", gap:"60px", width:"100%"}}>
                                <div className={styles.container}>
                                    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1}}>
                                        <h1 className={styles.roles}
                                            style={{textAlign: 'center', marginBottom: '0.5rem'}}>Режисери</h1>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            textAlign: 'center'
                                        }}>
                                            {actorsAndRoles.filter(([name, role]) => role === "Director").map(([name], index) => (
                                                <span key={index}>{name}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1}}>
                                        <h1 className={styles.roles}
                                            style={{textAlign: 'center', marginBottom: '0.5rem'}}>Сценарісти</h1>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            textAlign: 'center'
                                        }}></div>
                                    </div>
                                    <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1}}>
                                        <h1 className={styles.roles}
                                            style={{textAlign: 'center', marginBottom: '0.5rem'}}>Продюсери</h1>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            textAlign: 'center'
                                        }}></div>
                                    </div>
                                </div>
                                <div className={styles.actorsWrapper}>
                                    <h1 className={styles.title}>Актори</h1>
                                    <div style={{display: 'flex', flexWrap: 'wrap', gap: '1.5rem', width: '100%'}}>
                                        {actors.map(([actorName], index) => (
                                            <div key={index} style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                width: 'calc(50% - 1.5rem)'
                                            }}>
                                                <div style={{display: 'flex', width: '100%'}}>
                                                    <AvatarComponent name={actorName}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}