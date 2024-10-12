import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import React from "react";
import styles from "@/app/components/ui/dashboard/card/card.module.css";

interface CardComponentProps {
    icon: React.ReactNode;
    title: string;
    data: string;
    note: string;
    }

export default function CardComponent({ icon, title, data, note }: CardComponentProps) {
    return (
        <Card className={styles.container}>
            <CardHeader>
                <div className={styles.texts}>{icon}</div>
                <div className={styles.texts}>
                    <p className={styles.title}>{title}</p>
                </div>
            </CardHeader>
            <CardBody className={styles.texts}>
                <p className={styles.number}>{data}</p>
            </CardBody>
            <Divider className={styles.divider}/>
            <CardFooter className={styles.texts}>
                <span className={styles.detail}>
                    <p className={styles.positive}>{note}</p>
                </span>
            </CardFooter>
        </Card>
    );
}