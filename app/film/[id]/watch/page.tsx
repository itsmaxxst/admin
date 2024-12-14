"use client"
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import styles from "@/app/film/[id]/watch/watch.module.css"
import Footer from "@/app/components/ui/site/footer/footer";
import SeasonTable from "@/app/components/ui/film/watch/seasonTable/seasonTable";
import {Button, ButtonGroup, Image, Breadcrumbs, BreadcrumbItem, Textarea, User, Alert} from "@nextui-org/react";
import {Film} from "@/data/public/Film";
import {Telegram} from "@/data/public/Telegram";
import {FaceBook} from "@/data/public/FaceBook";
import {Comment} from "@/data/public/Comment";
import {BrokenHeart} from "@/data/public/BrokenHeart";
import {Heart} from "@/data/public/Heart";
import {Twitter} from "@/data/public/Twitter";
import {Share} from "@/data/public/Share";
import {Star} from "@/data/public/Star";
import React, { useEffect, useState } from "react";
import {MdCheck} from "react-icons/md";
import API_BASE_URL from "@/app/api/apiConfig";

type Comment = {
    id: number;
    text: string;
    children: Comment[];
    isLiked: boolean;
};

export default function WatchPage({params}:{params:{id:string}}){
    const [isVisible, setIsVisible] = React.useState(false);
    const [currentPage] = React.useState<React.Key>("watch");
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [replyId, setReplyId] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [seasonVisibility, setSeasonVisibility] = useState<boolean>(false);
    const [seasons, setSeasons] = useState<any[]>([]);
    const [selected, setSelected] = useState(0);
    const [imdbRating, setImdbRating] = useState<number | null>(null);

    const handleClick = (index:number) => {
        setSelected(index + 1);
    };

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/mediaitem/${params.id}`);
                const data = await response.json();

                if (data && data.seasons) {
                    if (data.seasons.length === 0) {
                        setSeasonVisibility(false);
                    } else {
                        setSeasonVisibility(true);
                        setSeasons(data.seasons);
                    }
                }

                if (data?.data?.imdbScore) {
                    setImdbRating(data.data.imdbScore.toString());
                }
            } catch (error) {
                console.error("Помилка при загрузці даних фільма:", error);
            }
        };

        fetchFilmData();
    }, [params.id]);

    const submitRating = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/ratings`, {
                method: "POST",
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mediaItemId: params.id,
                    rating: selected
                }),
                mode: 'no-cors',
            });

            const data = await response.json();
            if (response.ok) {
                setIsVisible(true);
            } else {
                console.error("Не вдалося відправити рейтинг", data);
            }
        } catch (error) {
            console.error("Помилка при відправці оцінки", error);
        }
    };

    const addComment = (text: string, parentId: number | null = null) => {
        if (!text.trim()) return;

        const newComment : Comment = {
            id: Date.now(),
            text,
            children: [],
            isLiked: false
        };
        if (parentId === null) {
            setComments((prevComments) => [...prevComments, newComment]);
        } else {
            const addReply = (commentsList: Comment[]): Comment[] =>
                commentsList.map((comment) => {
                    if (comment.id === parentId) {
                        return {
                            ...comment,
                            children: [...comment.children, newComment],
                        };
                    }
                    return {
                        ...comment,
                        children: addReply(comment.children),
                    };
                });
            setComments((prevComments) => addReply(prevComments));
        }
    };

    const toggleLike = (commentId: number) => {
        const updateComments = (commentsList: Comment[]): Comment[] =>
            commentsList.map((comment) => {
                if (comment.id === commentId) {
                    return { ...comment, isLiked: !comment.isLiked };
                }
                return {
                    ...comment,
                    children: updateComments(comment.children),
                };
            });

        setComments((prevComments) => updateComments(prevComments));
    };

    useEffect(() => {
        const userLogin = localStorage.getItem("userLogin");
        if(userLogin==null){
            setIsLoggedIn(false)
        }else {
            setIsLoggedIn(true)
        }
    }, []);

    const renderComments = (commentsList: Comment[], depth = 0) => {
        return commentsList.map((comment) => (
            <div key={comment.id} style={{marginLeft: `${depth * 20}px`,
                borderLeft: "2px solid gray",
                paddingLeft: "10px",
                marginBottom: "10px",
                marginTop: "10px",
                color: "white"}}>
                <div style={{display: "flex", alignItems: "center", gap:'2.5rem'}}>
                    <User style={{color:'white'}} name={"Нікнейм"}/>
                    <p style={{color:'gray', fontSize:'14px'}}>7г тому</p>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <p>{comment.text}</p>
                </div>
                <div>
                    <div style={{display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'center'}}>
                        <Button onClick={() => toggleLike(comment.id)} startContent={<Heart color={comment.isLiked ? '#F1EA76' : 'white'}/>} style={{background: 'transparent', color:'white', fontSize:'16px'}}>
                            12
                        </Button>
                        <Button isIconOnly={true} startContent={<BrokenHeart/>} style={{background: 'transparent'}}/>
                        <Button style={{background: 'transparent', color: 'white'}}
                                onClick={() => setReplyId(comment.id)} startContent={<Comment/>} isDisabled={!isLoggedIn}>
                            Відповісти
                        </Button>
                        <Button onClick={() => setIsVisible(true)} startContent={<Share/>} style={{background: 'transparent', color: 'white'}}>
                            Поширити
                        </Button>
                    </div>
                    {renderComments(comment.children, depth + 1)}
                </div>
            </div>
        ));
    };
    return (
        <body style={{
            height: '169.9375rem',
            width: '1920px',
            backgroundColor: 'var(--bgMainContainer)',
            display: 'flex',
            flexDirection: 'column'
        }}>
        <header className={styles.header}>
            <NavbarComponent/>
        </header>
        <main style={{
            flex: '1',
            paddingLeft: '195px',
            paddingRight: '195px',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '400',
                color: 'white',
                height: '6rem'
            }}>
                <Breadcrumbs color={"warning"}>
                    <BreadcrumbItem
                        key="home"
                        isCurrent={currentPage === "home"}
                        href="/"
                        role="link"
                    >
                        Cinemania
                    </BreadcrumbItem>
                    <BreadcrumbItem
                        key="film"
                        isCurrent={currentPage === "film"}
                        href="/film"
                        role="link"
                    >
                        Фільм
                    </BreadcrumbItem>
                    <BreadcrumbItem
                        key="watch"
                        isCurrent={currentPage === "watch"}
                        href="/film/watch"
                        role="link"
                    >
                        Перегляд
                    </BreadcrumbItem>
                </Breadcrumbs>
            </div>
            <div style={{height: '48rem', display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '20rem', visibility: seasonVisibility ? 'visible' : 'hidden'}}>
                    <SeasonTable season={seasons.map((season: any) => season.name)} episode={seasons.map((season: any) => season.episodes.map((episode: any) => episode.name))}/>
                </div>
                <div style={{flex: '1'}}>
                    <iframe
                        allow="fullscreen; autoplay; encrypted-media"
                        src="https://hdvbua.pro/embed/9699?autoplay=1&fullscreen=1"
                        width="100%"
                        height="100%"
                        style={{borderRadius: "8px"}}
                    />
                </div>
            </div>
            <div style={{display: 'flex', height: '6.875rem', marginTop: '40px'}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '24px',
                    width: '460px'
                }}>
                    <div style={{width: '100%', flexDirection: 'row', display: 'flex', gap: '24px'}}>
                        <Button style={{
                            width: '218px',
                            height: '42px',
                            borderRadius: '15px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: '#2AABEE'
                        }} startContent={<Telegram/>}>Поширити</Button>
                        <Button style={{
                            width: '218px',
                            height: '42px',
                            borderRadius: '15px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: 'black'
                        }} startContent={<Twitter/>}>Поширити</Button>
                    </div>
                    <div style={{width: '100%', flexDirection: 'row', display: 'flex', gap: '24px'}}>
                        <Button style={{
                            width: '218px',
                            height: '42px',
                            borderRadius: '15px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: '#3D5A98'
                        }} startContent={<FaceBook/>}>Поширити</Button>
                        <Button style={{
                            width: '218px',
                            height: '42px',
                            borderRadius: '15px',
                            color: 'white',
                            fontSize: '20px',
                            backgroundColor: '#47CC4D'
                        }} startContent={<Share/>}>Поширити</Button>
                    </div>
                </div>
                <div style={{display: 'flex', marginLeft: '43px', width: '412px', flexDirection: 'column'}}>
                    <div style={{
                        width: '100%',
                        height: '50%',
                        border: '1px solid var(--border)',
                        borderRadius: '8px 8px 0 0',
                        color: 'white',
                        fontSize: '20px',
                        fontWeight: '400',
                        alignContent: 'center',
                        justifyItems: 'center'
                    }}>
                        <p>Середня оцінка користувачів</p>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '50%',
                        backgroundColor: 'var(--border)',
                        borderRadius: '0 0 8px 8px',
                        display: 'flex',
                        flexDirection: 'row',
                        color: 'black',
                        fontWeight: '400',
                        fontSize: '16px',
                        alignItems: 'center',
                        gap: '38px',
                        justifyContent: 'center',
                    }}>
                        <div style={{display: 'flex', gap: '16px', flexDirection: 'row'}}>
                            <Image alt={""} width={59} height={30}
                                   src={"https://s3-alpha-sig.figma.com/img/bc80/a9d5/0712bcf20abb72bfc23ff7f9e0a68163?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h08lyhdQ0sug1r7ApQ5L3mK~aOngzG-zkCUdvxOmRmDHLusaRVQN2AdT6orPiiRlmnUHTu5nKNr3VP~ViwS8C6d6yHpNpoeDEVafcP3s8wWaIL-928XD6XIUkkktlyeHUfHBM8qUtpL42e9unktibpq29bYtjk6LXinEMMgd52eBG3x98FAlk9gZpsnb9qi9qQeI~vP5bNckRCZb1fevVpBdkNqm2x2YaHt3Wi6HKHddskRKje4iGHIfy4stps25ozfvdubMUHse4kLNf77exHME9~NouIL~ip5eE37h4ZCqwGI5y0FeZzUHRp5ZDO7zQBIixtdAqKPaTu7RrrvOYQ__"}/>
                            <p>{imdbRating}</p>
                        </div>
                        <div style={{display: 'flex', gap: '16px', flexDirection: 'row'}}>
                            <Film/>
                            <p>- (-)</p>
                        </div>
                    </div>
                </div>
                <div style={{display: 'flex', marginLeft: '55px', flexDirection: 'column', width: '534px'}}>
                    <div style={{
                        width: '100%',
                        height: '50%',
                        border: '1px solid var(--border)',
                        borderRadius: '8px 8px 0 0',
                        color: 'white',
                        padding: '12px',
                        fontSize: '20px',
                        fontWeight: '400',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <p>А що думаєш ти про цей серіал?</p>
                        <Button isDisabled={!isLoggedIn} style={{
                            borderRadius: '48px',
                            backgroundColor: '#EDEDED',
                            color: '#726F6F',
                            fontWeight: '500',
                            fontSize: '13px'
                        }} onClick={submitRating}>Надіслати</Button>
                    </div>
                    <div style={{
                        width: '100%',
                        height: '50%',
                        backgroundColor: 'var(--border)',
                        borderRadius: '0 0 8px 8px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ButtonGroup style={{gap: '8px'}}>
                            {[...Array(10)].map((_, index) => (
                                <Button
                                    key={index}
                                    isIconOnly
                                    style={{backgroundColor: index < selected ? 'yellow' : 'transparent',}}
                                    onClick={() => handleClick(index)}
                                >
                                    <Star/>
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div style={{display: 'flex', marginTop: '40px', width: '100%'}}>
                <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                    <div style={{
                        marginBottom: "20px",
                        display: 'flex',
                        width: '100%',
                        flexDirection: 'row',
                        gap: '1rem'
                    }}>
                        <div style={{width: '80%'}}>
                            <Textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}
                                      placeholder={replyId ? "Відповіть на коментарій..." : "Новий коментар..."}
                                      style={{width: "100%", marginBottom: "10px", height: '2rem', color: 'white'}}
                                      variant={"bordered"}/>
                        </div>
                        <div style={{width: '20%', display: 'flex'}}>
                            <Button
                                isDisabled={!isLoggedIn}
                                onClick={() => {
                                    addComment(newComment, replyId);
                                    setNewComment("");
                                    setReplyId(null);
                                }}
                                variant={"bordered"}
                                style={{color: 'white'}}
                            >
                                {replyId ? "Відповісти" : "Додати коментар"}
                            </Button>
                        </div>
                    </div>
                    {renderComments(comments)}
                </div>
            </div>
            <div>
                {isVisible ? (
                    <div style={{
                        width: '100%',
                        position: 'absolute',
                        left: '0',
                        zIndex: '10',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <div style={{width: '80%'}}>
                            <Alert radius={"md"} icon={<MdCheck/>} color={"success"}
                                   description={"Посилання скопійовано"}
                                   title={"Успіх!"} variant="faded" isVisible={isVisible}
                                   onClose={() => setIsVisible(false)}/>
                        </div>
                    </div>) : (
                    <div></div>
                )}
            </div>
            {isVisible && (
                <div style={{
                    position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                    zIndex: 10, width: '80%'
                }}>
                    <Alert
                        radius={"md"}
                        icon={<MdCheck />}
                        color={"success"}
                        description={"Ваша оцінка відправлена!"}
                        title={"Успіх!"}
                        variant="faded"
                        isVisible={isVisible}
                        onClose={() => setIsVisible(false)}
                    />
                </div>
            )}
        </main>
        <footer style={{height: '39.375rem', backgroundColor: 'var(--bgFooter)'}}>
            <Footer/>
        </footer>
        </body>
    );
}