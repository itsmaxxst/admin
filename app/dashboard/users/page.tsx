"use client"
import React from "react";
import styles from "@/app/components/ui/dashboard/dashboard.module.css"
import TableTemplate, {Data} from "@/app/components/ui/dashboard/tableTemplate/tableTemplate";
import DatePicker from "@/app/components/ui/dashboard/datepicker/datepicker";
import { Divider } from "@nextui-org/divider";
import { columns, statusOptions } from "@/data/json/users.json";
import axios from "axios";
import Icons from "@/data/mapping/usersTableIcons"

export default function UsersPage() {
    const [users, setUsers] = React.useState<Data[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        axios.get<Data[]>(`${""}/users`) //URL
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error table data loading");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className={styles.wrapper}>
            <div className={styles.main}>
                <DatePicker/>
                <Divider className={styles.divider}/>
                <div>{error}</div>
                <Divider className={styles.divider}/>
            </div>
        </div>
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <DatePicker/>
                <Divider className={styles.divider}/>
                <TableTemplate
                    columns={columns}
                    data={users}
                    statusOptions={statusOptions}
                    iconTooltips={Icons}
                    title="Users"
                    hidden={false}
                    subTitle="users"
                />
            </div>
            </div>
    );
}
