"use client";
import {lazy, useEffect, useState} from "react";
import API_BASE_URL from "@/app/api/apiConfig";
const RowTitle = lazy(()=> import("@/app/components/ui/site/rowTitle/rowTitle"));

interface Card {
    id: string;
    img: string;
    title: string;
    desc: string;
}

interface ApiItem {
    id: string;
    thumbnail?: string;
    imagePath?: string;
    name: string;
    tags?: { name: string }[];
    releaseYear: number;
}


interface DynamicRowTitleProps {
    title: string;
    tagId: string;
    description?: string;
    hidden: boolean;
    marginTop?: string;
    gap: string;
    num: number;
    width: string;
    height?: string;
}

const DynamicRowTitle: React.FC<DynamicRowTitleProps> = ({title, height, tagId, description, hidden, marginTop, gap, num, width,}) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setIsLoading(true);
                setHasError(false);
                const response = await fetch(`${API_BASE_URL}${tagId}?pageNumber=1&pageSize=20`);
                const data = await response.json();
                if (data.isSuccess) {
                    const formattedCards: Card[] = data.data.map((item:ApiItem) => ({
                        id: item.id,
                        img: item.thumbnail || item.imagePath,
                        title: item.name,
                        desc: item.tags && item.tags.length > 0
                            ? `${item.tags.map((tag) => tag.name).join(", ")}, ${item.releaseYear}`
                            : `${item.releaseYear}`,
                    }));
                    setCards(formattedCards);
                } else {
                    throw new Error("Ошибка в данных API");
                }
            } catch (error) {
                console.error(`Помилка при завантаженні фільмів для тега ${tagId}:`, error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCards();
    }, [tagId]);

        return (
            <div style={{marginTop: marginTop}}>
                <div style={{display: "flex", gap: gap}}>
                        <RowTitle
                            height={height}
                            title={title}
                            cards={cards}
                            hidden={hidden}
                            description={description}
                            marginTop={marginTop}
                            gap={gap}
                            num={num}
                            width={width}
                            isLoading={isLoading}
                        />
                </div>
            </div>
        );
};


export default DynamicRowTitle;
