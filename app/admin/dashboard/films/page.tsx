"use client"
import React from "react";
import styles from "@/app/components/ui/dashboard/dashboard.module.css"
import TableTemplate, {Data} from "@/app/components/ui/dashboard/tableTemplate/tableTemplate";
import DatePicker from "@/app/components/ui/dashboard/datepicker/datepicker";
import { Divider } from "@nextui-org/divider";
import { columns, statusOptions } from "@/data/json/films.json";
import axios from "axios";
import Icons from "@/data/mapping/usersTableIcons"

export default function FilmsPage() {
    const [films, setFilms] = React.useState<Data[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        axios.get<Data[]>(`${""}/films`) //URL
            .then(response => {
                setFilms(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error table data loading");
                setLoading(false);
                console.log(error);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <DatePicker/>
                <Divider className={styles.divider}/>
                <TableTemplate
                    columns={columns}
                    data={films}
                    statusOptions={statusOptions}
                    iconTooltips={Icons}
                    title="Films"
                    hidden={false}
                    subTitle="films"
                />
            </div>
        </div>
    );
}
