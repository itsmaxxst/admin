"use client";
import {lazy, Suspense, useEffect, useState} from "react";
import API_BASE_URL from "@/app/api/apiConfig";
const RowTitle = lazy(()=> import("@/app/components/ui/site/rowTitle/rowTitle"));

interface Card {
    id: string;
    img: string;
    title: string;
    desc: string;
}

interface DynamicRowTitleProps {
    title: string;
    tagId: string;
    description?: string;
    hidden: boolean;
    marginTop?: string;
    gap: string;
    num: number;
    total: number;
    width: string;
    height?: string;
}

const DynamicRowTitle: React.FC<DynamicRowTitleProps> = ({title, height, tagId, description, hidden, marginTop, gap, num, total, width,}) => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}${tagId}?pageNumber=1&pageSize=20`);
                const data = await response.json();
                console.log('API Response:', data);
                if (data.isSuccess) {
                    const formattedCards: Card[] = data.data.map((item) => ({
                        id: item.id,
                        img: item.thumbnail || item.imagePath,
                        title: item.name,
                        desc: item.tags && item.tags.length > 0
                            ? `${item.tags.map((tag) => tag.name).join(", ")}, ${item.releaseYear}`
                            : `${item.releaseYear}`,
                    }));
                    console.log('Formatted Cards:', formattedCards);
                    setCards(formattedCards);
                    console.log(`Фільми для тега ${tagId} успішно завантажилися`);
                }
            } catch (error) {
                console.error(`Помилка при завантаженні фільмів для тега ${tagId}:`, error);
            }
        };

        fetchCards();
    }, [tagId]);

    return (
        <Suspense>
            <RowTitle
                height={height}
                title={title}
                cards={cards}
                hidden={hidden}
                description={description}
                marginTop={marginTop}
                gap={gap}
                num={num}
                total={total}
                width={width}
            />
        </Suspense>
    );
};

export default DynamicRowTitle;
