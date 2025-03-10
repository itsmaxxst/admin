import React, {useState, useEffect} from "react";
import styles from "@/app/components/ui/site/card/card.module.css"
import {Card, CardBody, CardFooter, Link, Skeleton} from "@nextui-org/react";
import {useRouter} from "next/navigation";

interface CardComponentProps {
    id: string;
    img: string;
    title?: string;
    description?: string;
    width: string;
    hidden?: boolean;
    height?: string;
}

export default function CardComponent({ id, img, title, description, width, hidden, height }: CardComponentProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const image = new window.Image();
        image.src = img;
        image.onload = () => {
            console.log("Успішне завантаження картинки");
            setIsLoading(false);
            setHasError(false);
        };
        image.onerror = () => {
            console.error("Помилка при завантаженні картинки");
            setIsLoading(false);
            setHasError(true);
        };
    }, [img]);

    const handleCardClick = () => {
        router.push(`/film/${id}`);
    };

    return (
        <Link>
            <Skeleton
                style={{ width: "100%", height: "316px", borderRadius: "16px" }}
                isLoaded={!isLoading}
            >
                <Card
                    isPressable
                    className={styles.card}
                    shadow="sm"
                    style={{ width: width, height: "316px" }}
                    onClick={handleCardClick}
                >
                    <CardBody className={styles.body}>
                        <div>
                            {!hasError ? (
                                <Skeleton
                                    className="rounded-lg"
                                    style={{ width: "100%", height: height }}
                                    isLoaded={!isLoading}
                                >
                                    <img
                                        src={img}
                                        className={styles.image}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            opacity: isLoading ? 0 : 1,
                                            transition: "opacity 0.5s ease-in-out",
                                        }}
                                        loading="lazy"
                                    />
                                </Skeleton>
                            ) : (
                                <div
                                    style={{
                                        width: "202px",
                                        height: "17.1875rem",
                                        backgroundColor: "lightgray",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: "16px",
                                    }}
                                >
                                    <p
                                        style={{
                                            color: "#888",
                                            fontSize: "14px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Не вдалося завантажити<br /> зображення
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardBody>
                    <CardFooter
                        className={styles.footer}
                        style={{ visibility: hidden ? "hidden" : "visible" }}
                    >
                        <Skeleton
                            isLoaded={!isLoading}
                            style={{ width: "80%", height: "0.5rem", borderRadius: "8px" }}
                        >
                            <div />
                        </Skeleton>
                        <Skeleton
                            isLoaded={!isLoading}
                            style={{ width: "60%", height: "0.5rem", borderRadius: "8px" }}
                        >
                            <div />
                        </Skeleton>
                        {!isLoading && !hasError && (
                            <>
                                <h1
                                    style={{
                                        color: "white",
                                        fontSize: "18px",
                                        fontStyle: "normal",
                                        fontWeight: "600",
                                        lineHeight: "normal",
                                    }}
                                >
                                    {title}
                                </h1>
                                <p
                                    style={{
                                        color: "#A1A1A1",
                                        fontSize: "12px",
                                        fontStyle: "normal",
                                        fontWeight: "500",
                                        lineHeight: "normal",
                                    }}
                                >
                                    {description}
                                </p>
                            </>
                        )}
                    </CardFooter>
                </Card>
            </Skeleton>
        </Link>
    );
}
