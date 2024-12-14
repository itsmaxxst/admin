import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, Link} from "@nextui-org/react";
import styles from "@/app/components/ui/tariffs/tariffCard.module.css"

interface TariffCardProps {
    title: string;
    titleFont?: string;
    listFont?:string;
    description: string;
    price: string;
    including: string[];
    width: string;
    height: string;
    margin?: string;
    gap: string;
}
export default function TariffCard ({title, description, price, including, width, height, margin, titleFont, listFont, gap}:TariffCardProps) {
    return (
        <Card style={{
            width:width,
            height:height,
            zIndex:'2',
            borderRadius:'15px',
            padding:'28px 18px 50px 0px',
            marginTop:margin,
            gap:gap}}>
            <CardHeader style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap:'20px'}}>
                <h1 className={styles.title} style={{fontSize:titleFont}}>{title}</h1>
                <p className={styles.desc}>{description}</p>
            </CardHeader>
            <CardBody style={{gap:gap}}>
                <p className={styles.price}>{price} ₴<span style={{fontSize:'16px'}}>/місяць</span></p>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <Link href={"/checkout"}>
                        <Button className={styles.button}>
                            Обрати
                        </Button>
                    </Link>
                </div>
            </CardBody>
            <CardFooter>
                <ul style={{listStyleType: 'disc', paddingLeft:'20px', fontSize:listFont}} className={styles.list}>
                    {including.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </CardFooter>
        </Card>
    );
};