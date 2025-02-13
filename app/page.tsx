"use client"
import {lazy, useEffect, useState, Suspense} from "react";
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import Footer from "@/app/components/ui/site/footer/footer";
import ButtonRow from "@/app/components/ui/site/buttonRow/buttonRow"
import {first, second} from "@/data/json/button-titles.json"
import ActiveBackground from "@/app/components/ui/site/activeBackground/activeBackground";
import styles from "@/app/components/ui/site/site.module.css"
import API_BASE_URL from "@/app/api/apiConfig";
const DynamicRowTitle = lazy(()=> import("@/app/components/ui/site/dynamicRowTitle/dynamicRowTitle"));

export default function HomePage() {
    const [bannerUrl, setBannerUrl] = useState("");
    const [activePage, setActivePage] = useState(1);
    const firstTitles = first.map(item => item.title);
    const secondTitles = second.map(item => item.title);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/banner/active`);
                const data = await response.json();
                if (data.isSuccess && data.data.length > 0) {
                    const topBanner = data.data.sort((a, b) => a.displayOrder - b.displayOrder)[activePage - 1];
                    setBannerUrl(topBanner.imageUrl);
                    console.log("Баннер успішно завантажився")
                }
            } catch (error) {
                console.error("Помилка при завантаженні баннера:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanner();
    }, [activePage]);

    if (isLoading) {
        return <body style={{height: '247rem', width: '1920px'}}>
            <header className={styles.container}>

            </header>
            <div style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                height: '21px',
                bottom: '28px',
                left: '53.475rem'
            }}>
            </div>
        <main className={styles.main}>

        </main>
        <footer className={styles.footer}>
            <Footer/>
        </footer>
        </body>;
    }
    return (
        <body style={{height: '247rem', width: '1920px'}}>
        <div className={styles.nav} style={{
            background: bannerUrl
                ? `url(${bannerUrl}) lightgray 50% / cover no-repeat`
                : "none",
        }}>
            <header className={styles.container}>
                <NavbarComponent/>
            </header>
            <div style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                height: '21px',
                bottom: '28px',
                left: '53.475rem'
            }}>
                <ActiveBackground activePage={activePage} setActivePage={setActivePage}/>
            </div>
        </div>
        <main className={styles.main}>
            <ButtonRow titles={firstTitles}/>
            <Suspense fallback={<div></div>}>
                <DynamicRowTitle title={"Найкращі твори 2023-24 року"}
                                 height={"17.1875rem"}
                                 hidden={false}
                                 description={"Показати більше"}
                                 gap={"1rem"}
                                 num={6}
                                 total={20}
                                 width={"202px"}
                                 tagId={"/api/v1/mediaitem/movies/tag/11"}
                />
                <DynamicRowTitle title={"Фантастика"}
                                 height={"17.1875rem"}
                                 hidden={false}
                                 description={"Показати більше"}
                                 marginTop={"-0.3%"}
                                 gap={"1rem"}
                                 num={6}
                                 total={20}
                                 width={"202px"}
                                 tagId={"/api/v1/mediaitem/movies/tag/10"}/>

                <DynamicRowTitle title={"Життя та музика легендарного Фредді Мерк'юрі"}
                                 height={"auto"}
                                 hidden={true}
                                 marginTop={"-0.5%"}
                                 gap={"16px"}
                                 num={3}
                                 total={3}
                                 width={"421px"}
                                 tagId={"/api/v1/personimage/person/739365c6-77e7-4957-9554-17a89c6e6e15"}/>

                <DynamicRowTitle title={"Пригоди"}
                                 height={"17.1875rem"}
                                 hidden={false}
                                 description={"Показати більше"}
                                 marginTop={"-0.5%"}
                                 gap={"1rem"}
                                 num={6}
                                 total={20}
                                 width={"202px"}
                                 tagId={"/api/v1/mediaitem/movies/tag/8"}/>

                <DynamicRowTitle title={"Фентезі"}
                                 height={"17.1875rem"}
                                 hidden={false}
                                 description={"Показати більше"}
                                 marginTop={"-0.5%"}
                                 gap={"1rem"}
                                 num={6}
                                 total={20}
                                 width={"202px"}
                                 tagId={"/api/v1/mediaitem/movies/tag/20"}/>
            </Suspense>
            <div className={styles.title} style={{marginTop: '2.5%'}}>
                <p>Обери фільм на будь-який смак</p>
            </div>
            <ButtonRow titles={secondTitles}/>
        </main>
        <footer className={styles.footer}>
          <Footer/>
      </footer>
      </body>
  );
}
