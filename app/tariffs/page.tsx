"use client"
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import Footer from "@/app/components/ui/site/footer/footer";
import {Button, Link} from "@nextui-org/react";
import {Vector} from  "@/data/public/Vector";
import TariffCard from "@/app/components/ui/tariffs/tariffCard"
import React, {useState} from "react";
import {LeftArrow} from "@/data/public/LeftArrow";
import {RightArrow} from "@/data/public/RightArrow";
import styles from "@/app/tariffs/tariffs.module.css"

const tariffsData = [
    {
        title: "Базовий план",
        price: "149",
        description: "Ідеально для легкого перегляду на одному пристрої.",
        including: [
            "Перегляд у стандартній якості",
            "Одночасний перегляд на 1 пристрої",
            "Доступ до тисяч фільмів та серіалів"
        ]
    },
    {
        title: "Стандартний план",
        price: "259",
        description: "Для сімей або користувачів з кількома пристроями.",
        including: [
            "Перегляд у HD якості",
            "Одночасний перегляд на 2 пристроях",
            "Доступ до всіх фільмів, серіалів та ексклюзивного контенту"
        ]
    },
    {
        title: "Преміум план",
        price: "349",
        description: "Максимум можливостей для справжніх поціновувачів контенту.",
        including: [
            "Перегляд у Ultra HD та 4K якості",
            "Одночасний перегляд на 4 пристроях",
            "Доступ до всіх матеріалів та ранній доступ до нових релізів"
        ]
    },
    {
        title: "Безкоштовна підписка",
        price: "0",
        description: "Повний доступ для вимогливих користувачів.",
        including: [
            "Перегляд у Ultra HD якості",
            "Необмежений перегляд на всіх пристроях",
            "Доступ до всіх фільмів, серіалів та ексклюзивного контенту"
        ]
    }
];

const TariffsPage : React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tariffsData.length);
    };
    const prevCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? tariffsData.length - 1 : prevIndex - 1
        );
    };
    const getIndices = () => {
        const leftIndex = (currentIndex - 1 + tariffsData.length) % tariffsData.length;
        const rightIndex = (currentIndex + 1) % tariffsData.length;
        return { leftIndex, centerIndex: currentIndex, rightIndex };
    };
    const getCardStyle = (position: "left" | "center" | "right") => {
        const width = position === "center" ? "297px" : "256px";
        const height = position === "center" ? "440px" : "394px";
        const titleFont = position === "center" ? "15px" : "14px";
        const listFont = position === "center" ? "14px" : "12px";
        const opacity = position === "center" ? 1 : 0.7;

        return {
            width,
            height,
            opacity,
            titleFont,
            listFont,
            transition: "all 0.5s ease"
        };
    };
    const { leftIndex, centerIndex, rightIndex } = getIndices();
    return (
        <body style={{height: '121.25rem', width: '1920px' }}>
        <header className={styles.navbar}>
            <NavbarComponent/>
        </header>
        <main style={{height: '81.875rem', width: '100%', backgroundColor: 'var(--bgMainContainer)'}}>
            <div style={{height: '100%'}}>
                <div style={{marginLeft:'290px', marginRight:'290px', height:'30%', display:'flex'}}>
                    <div style={{
                        height:'100%',
                        width:'50%',
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding:'90px 0 0 10px',
                        gap:'30px'}}>
                        <h1 className={styles.title}>Обери свій план підписки</h1>
                        <p className={styles.text}>Ласкаво просимо у світ безмежних розваг! Ми маємо рішення для <br/>
                            кожного, від легкого перегляду до справжніх кіноманів.</p>
                    </div>
                    <div style={{
                        height:'100%',
                        width:'50%',
                        display:'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding:'90px 0 0 10px',
                        gap:'30px',
                        alignItems:'center'}}>
                    </div>
                </div>
                <div style={{
                    height: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: "hidden",
                    flexDirection:'row',
                    gap:'136px',
                }}>
                        <Button className={styles.arrow} onClick={prevCard} isIconOnly><LeftArrow/></Button>
                        <div className={styles.background}></div>
                        <div className={styles.gray}></div>
                        <div style={getCardStyle("left")}>
                        <TariffCard
                            title={tariffsData[leftIndex].title}
                            price={tariffsData[leftIndex].price}
                            description={tariffsData[leftIndex].description}
                            width={getCardStyle("left").width}
                            height={getCardStyle("left").height}
                            listFont={getCardStyle("left").listFont}
                            titleFont={getCardStyle("left").titleFont}
                            including={tariffsData[leftIndex].including}
                            gap={"10px"}
                        />
                        </div>
                        <div style={getCardStyle("center")}>
                            <TariffCard
                                margin={"-2rem"}
                                title={tariffsData[centerIndex].title}
                                price={tariffsData[centerIndex].price}
                                description={tariffsData[centerIndex].description}
                                width={getCardStyle("center").width}
                                height={getCardStyle("center").height}
                                listFont={getCardStyle("center").listFont}
                                titleFont={getCardStyle("center").titleFont}
                                including={tariffsData[centerIndex].including}
                                gap={"20px"}
                            />
                        </div>
                        <div style={getCardStyle("right")}>
                            <TariffCard
                                title={tariffsData[rightIndex].title}
                                price={tariffsData[rightIndex].price}
                                description={tariffsData[rightIndex].description}
                                width={getCardStyle("right").width}
                                height={getCardStyle("right").height}
                                listFont={getCardStyle("right").listFont}
                                titleFont={getCardStyle("right").titleFont}
                                including={tariffsData[rightIndex].including}
                                gap={"10px"}
                            />
                        </div>
                    <Button className={styles.arrow} onClick={nextCard} isIconOnly><RightArrow/></Button>
                </div>
                <div style={{
                    height: '25%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection:'column',
                    gap:'24px'
                }}>
                    <div style={{
                        borderRadius:'4px',
                        backgroundColor:'white',
                        height:'12px', width:'593px',}}>
                    </div>
                    <p className={styles.step}>
                        Крок 1 з З
                    </p>
                </div>
            </div>
        </main>
        <footer className={styles.footer}>
            <Footer/>
        </footer>
        </body>
    );
}
export default TariffsPage;
