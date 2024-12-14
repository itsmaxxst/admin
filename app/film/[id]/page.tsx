"use client"
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import Footer from "@/app/components/ui/site/footer/footer";
import styles from "@/app/film/film.module.css"
import {Button, Link} from "@nextui-org/react";
import {Start} from "@/data/public/Start"
import {BookMarkWhite} from "@/data/public/BookMarkWhite";
import RowTitleLinks from "@/app/components/ui/film/rowTitle/rowTitleLinks"
import DynamicRowTitle from "@/app/components/ui/site/dynamicRowTitle/dynamicRowTitle";
import { useEffect, useState } from "react";
import API_BASE_URL from "@/app/api/apiConfig";

export default function FilmPage ({params}:{params:{id:string}}) {
    const [filmData, setFilmData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchFilmData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/mediaitem/${params.id}`);
            if (!response.ok) {
                throw new Error(`Помилка ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            setFilmData(data.data); // Сохраняем данные фильма
        } catch (err: any) {
            console.error("Помилка при завантаженні фільма:", err);
            setError(err.message || "Помилка");
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchFilmData();
        }
    }, [params.id]);

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    const firstAirDate = filmData?.firstAirDate
        ? new Date(filmData.firstAirDate).getFullYear()
        : "";

    const actorsAndRoles = filmData?.roles?.map((role: any) => {
        return [role.personName, role.role];
    }) || [];

    const attachmentUrl =
        filmData?.attachments.find((att: any) => att.attachmentType === 0)
            ?.attachmentUrl || "";

    const tags = filmData?.tags.map((tag: any) => tag.name).join("/ ");

    return(
        <body style={{height:'169.9375rem', width:'1920px', position:'relative'}}>
        <header className={styles.header} style={{background: attachmentUrl
                ? `linear-gradient(270deg, rgba(217, 217, 217, 0) 8.77%, rgba(0, 0, 0, 0.88) 60.71%), url(${attachmentUrl}) lightgray 50% / cover no-repeat`
                : "none",}}>
            <NavbarComponent/>
            <div style={{top: '22.4375rem', left: '19.375rem', position: 'absolute', display:'flex', flexDirection: 'column', gap:'1.5rem'}}>
                <p className={styles.title}>{filmData?.name}</p>
                <p className={styles.text}>{firstAirDate}/{tags}</p>
                <p className={styles.desc} style={{width:'70%'}}>{filmData?.description}</p>
                <div style={{display: 'flex', flexDirection: 'row', gap:'2rem', marginTop:'2rem'}}>
                    <Link href={`/film/${params.id}/watch`}>
                        <Button className={styles.button} startContent={<Start/>}>
                            Почати перегляд
                        </Button>
                    </Link>
                    <Button className={styles.pref} startContent={<BookMarkWhite/>}>
                        Обрані
                    </Button>
                </div>
            </div>
        </header>
        <div className={styles.blend}></div>
        <main style={{height: '84.1875rem', backgroundColor: 'var(--bgMainContainer)', position:'relative'}}>
            <RowTitleLinks gap={"16px"}
                           height={"243px"}
                           actorsAndRoles={actorsAndRoles}
                           marginTop={"0rem"}
                           num={3}
                           total={5}
                           width={"421px"}
                           hidden={false}
                           img={"https://aboffs.com/cdn/shop/products/2120-40-smokegray_4344b2e2-af23-44e3-a58b-e2412e8441ef_2000x.png?v=1587097468"}
            />
            <DynamicRowTitle title={"Ось що вам може сподобатись!"} height={"275px"}
                      marginTop={"9rem"}
                      hidden={false}
                      gap={"20px"}
                      num={6}
                      total={6}
                      width={"200px"} tagId={"/api/v1/mediaitem/movies/tag/10"}/>
        </main>
        <footer style={{height: '39.375rem', backgroundColor: 'var(--bgFooter)', position:'relative'}}>
            <Footer/>
        </footer>
        </body>
    )
}