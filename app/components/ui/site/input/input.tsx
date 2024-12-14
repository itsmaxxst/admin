import {Autocomplete, Link, AutocompleteItem, Image} from "@nextui-org/react";
import {Filter} from "@/data/public/Filter";
import { MdClose } from "react-icons/md";
import React, { useState, useEffect } from "react";
import styles from "@/app/components/ui/site/input/input.module.css";
import API_BASE_URL from "@/app/api/apiConfig";
import {useRouter} from "next/navigation";

export default function InputComponent({ onClose }: { onClose: () => void }){
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");
    const [films, setFilms] = useState<{ id: string, name: string, description: string, imdbScore: number, attachments: any[] }[]>([]);
    const handleClear = () => {
        setSearchValue("");
        onClose();
    };

    const fetchFilms = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/mediaitem/all?pageNumber=1&pageSize=40`);
            const data = await response.json();
            setFilms(data.data);
        } catch (error) {
            console.error("Помилка при завантаженні фільмів:", error);
        }
    };

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
    };

    const handleFilmClick = (filmId: string) => {
        router.push(`/film/${filmId}`);
        console.log("id", filmId);
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    const getImageUrl = (attachments: any[]) => {
        const imageAttachment = attachments.find(att => att.attachmentType === 1);
        return imageAttachment ? imageAttachment.attachmentUrl : '';
    };

    return(
        <Autocomplete
            itemHeight={70}
            isVirtualized
            placeholder="Пошук"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            startContent={
                <MdClose onClick={handleClear} style={{cursor:"pointer"}} color={"black"}/>
            }
            endContent={
                <Link href={"/search"}><Filter onClick={null}/></Link>
            }
            className={styles.absoluteInput}
        >
            {films
                .filter((film) =>
                    film.name.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((film) =>{
                    const imageUrl = getImageUrl(film.attachments);
                    return(
                        <AutocompleteItem key={film.id} textValue={film.name} onClick={() => handleFilmClick(film.id)}>
                            <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
                                <Image width={'45px'} src={imageUrl || ""} />
                                <div style={{display:'flex', flexDirection:'column', width:'80%', marginLeft:'1rem'}}>
                                    <Link href={`/film/${film.id}`} style={{color:'white'}}>
                                        <h1 style={{fontSize:'16px', color:'black'}}>
                                            {truncateText(film.name, 20)}
                                        </h1>
                                    </Link>
                                    <div style={{display:'flex', flexDirection:'row', width:'100%', gap:'10px', alignItems:'center'}}>
                                        <p style={{fontSize:'14px', color:'gray'}}>
                                            {film.imdbScore}
                                        </p>
                                        <Image alt={film.id} width={29} height={15} src={"https://s3-alpha-sig.figma.com/img/bc80/a9d5/0712bcf20abb72bfc23ff7f9e0a68163?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h08lyhdQ0sug1r7ApQ5L3mK~aOngzG-zkCUdvxOmRmDHLusaRVQN2AdT6orPiiRlmnUHTu5nKNr3VP~ViwS8C6d6yHpNpoeDEVafcP3s8wWaIL-928XD6XIUkkktlyeHUfHBM8qUtpL42e9unktibpq29bYtjk6LXinEMMgd52eBG3x98FAlk9gZpsnb9qi9qQeI~vP5bNckRCZb1fevVpBdkNqm2x2YaHt3Wi6HKHddskRKje4iGHIfy4stps25ozfvdubMUHse4kLNf77exHME9~NouIL~ip5eE37h4ZCqwGI5y0FeZzUHRp5ZDO7zQBIixtdAqKPaTu7RrrvOYQ__"}/>
                                    </div>
                                </div>
                            </div>
                        </AutocompleteItem>
                    );
                })}
        </Autocomplete>
    )
}