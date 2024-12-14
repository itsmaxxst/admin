"use client";
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import Footer from "@/app/components/ui/site/footer/footer";
import {second} from "@/data/json/button-titles.json"
import ButtonRow from "@/app/components/ui/site/buttonRow/buttonRow"
import styles from "@/app/components/ui/site/site.module.css";
const DynamicRowTitle = lazy(()=> import("@/app/components/ui/site/dynamicRowTitle/dynamicRowTitle"));
import { useParams } from "next/navigation";
import {lazy, Suspense} from "react";

export default function TemplatePage(){
    const { category } = useParams();

    const categoryTitles: Record<string, string> = {
        series: "Серіали",
        recommendations: "Рекомендації",
        films: "Фільми",
        cartoons: "Мультфільми",
    };

    const currentTitle = categoryTitles[category] || "Категорія";

    const secondTitles = second.map(item => item.title);
    return (
        <body style={{width:'120rem', height:'247rem'}}>
            <header style={{display:'flex', justifyContent:'center', width:'100%', margin:'24px 0 0 0', position:'absolute'}}>
                <NavbarComponent/>
            </header>
            <main style={{
                height: '207.625rem',
                backgroundColor: 'var(--bgMainContainer)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Suspense>
                    <DynamicRowTitle title={currentTitle}
                                     marginTop={"8rem"}
                                     hidden={false}
                                     gap={"1rem"}
                                     num={6}
                                     total={6}
                                     width={"202px"} tagId={"/api/v1/mediaitem/movies/tag/8"}
                    />
                    <DynamicRowTitle title={""}
                                     hidden={false}
                                     gap={"1rem"}
                                     num={6}
                                     total={6}
                                     width={"202px"} tagId={"/api/v1/mediaitem/movies/tag/10"}
                    />
                    <DynamicRowTitle title={""}
                                     hidden={false}
                                     gap={"1rem"}
                                     num={6}
                                     total={6}
                                     width={"202px"} tagId={"/api/v1/mediaitem/movies/tag/20"}
                    />
                    <DynamicRowTitle title={""}
                                     hidden={false}
                                     gap={"1rem"}
                                     num={6}
                                     total={6}
                                     width={"202px"} tagId={"/api/v1/mediaitem/movies/tag/11"}
                    />
                </Suspense>
                <div className={styles.title} style={{marginTop: '5%'}}>
                    <p>Обери фільм на будь-який смак</p>
                </div>
                <ButtonRow titles={secondTitles}/>
            </main>
            <footer style={{height: '39.375rem', backgroundColor: 'var(--bgFooter)', position: 'relative'}}>
            <Footer/>
            </footer>
        </body>
    )
}