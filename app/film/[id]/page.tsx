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

interface BonusCard {
    id: string;
    thumbnailUrl: string | null;
    name: string | null;
    description: string | null;
}

interface FilmData {
    name: string;
    firstAirDate: string;
    roles: { personName: string; role: string }[];
    attachments: Attachment[];
    tags: Tag[];
    description: string;
}

interface Role {
    personName: string;
    role: string;
}

interface Attachment {
    attachmentType: number;
    attachmentUrl: string;
}

interface Tag {
    name: string;
}

export default function FilmPage ({params}: {params: {id: string}}) {
    const [filmData, setFilmData] = useState<FilmData|null>(null);
    const [bonusCards, setBonusCards] = useState<{ id: string; img: string; title?: string; desc?: string }[]>([]);

    const fetchFilmData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/mediaitem/${params.id}`);
            if (!response.ok) {
                throw new Error(`Помилка ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            setFilmData(data.data);
        } catch {
            console.error("Помилка при завантаженні фільма:");
        }
    };

    const fetchBonusContent = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/mediaitem/${params.id}/bonus`);
            if (!response.ok) {
                throw new Error(`Помилка ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            const formattedBonusCards = data.data.map((item: BonusCard) => ({
                id: item.id,
                img: item.thumbnailUrl || "https://img.freepik.com/premium-photo/abstract-white-background-stone-old-texture-background-conceptual-wall-background_721263-1479.jpg?semt=ais_hybrid",
                title: item.name || "Без назви",
                desc: item.description || "",
            }));
            setBonusCards(formattedBonusCards);
        } catch {
            console.error("Помилка при завантаженні бонусного контенту:");
            setBonusCards([]);
        }
    };

    useEffect(() => {
        if (params.id) {
            fetchFilmData();
            fetchBonusContent();
        }
    }, [params.id]);

    const firstAirDate = filmData?.firstAirDate
        ? new Date(filmData.firstAirDate).getFullYear()
        : "";

    const actorsAndRoles:[string, string][] = filmData?.roles?.map((role: Role) => {
        return [role.personName, role.role];
    }) || [];

    const attachmentUrl =
        filmData?.attachments.find((att: Attachment) => att.attachmentType === 0)
            ?.attachmentUrl || "";

    const tags = filmData?.tags.map((tag: Tag) => tag.name).join("/ ");

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
                           width={"421px"}
                           hidden={false}
                           bonusCards={bonusCards}
            />
            <DynamicRowTitle title={"Ось що вам може сподобатись!"}
                             height={"275px"}
                             marginTop={"9rem"}
                             hidden={false}
                             gap={"20px"}
                             num={6}
                             width={"200px"}
                             tagId={"/api/v1/mediaitem/movies/tag/10"}/>
        </main>
        <footer style={{height: '39.375rem', backgroundColor: 'var(--bgFooter)', position:'relative'}}>
            <Footer/>
        </footer>
        </body>
    )
}