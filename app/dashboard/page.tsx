"use client"
import styles from "@/app/components/ui/dashboard/dashboard.module.css"
import CardComponent from "@/app/components/ui/dashboard/card/card";
import cardItems from "@/data/mapping/cardItems";
import TableTemplate, {Data} from "@/app/components/ui/dashboard/tableTemplate/tableTemplate";
import { Divider } from "@nextui-org/divider";
import Chart from "@/app/components/ui/dashboard/chart/chart";
import { columns, statusOptions } from "@/data/json/transactions.json";
import Icons from "@/data/mapping/transactionTableIcons"
import React from "react";
import axios from "axios";

export default function DashboardPage() {
    const [transactions, setTransactions] = React.useState<Data[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);
    React.useEffect(() => {
        axios.get<Data[]>(`${""}/transactions`) //URL
            .then(response => {
                setTransactions(response.data);
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
                <div className={styles.cards}>
                    {cardItems[0].list.map((item, index) => (
                        <CardComponent
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            note={item.title}
                            data={`Data ${item.title}`}
                        />
                    ))}
                </div>
                <Divider className={styles.divider}/>
                <div>{error}</div>
                <Divider className={styles.divider}/>
                <Chart/>
            </div>
        </div>
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.cards}>
                    {cardItems[0].list.map((item, index) => (
                        <CardComponent
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            note={item.title}
                            data={`Data ${item.title}`}
                        />
                    ))}
                </div>
                <Divider className={styles.divider}/>
                <TableTemplate
                    columns={columns}
                    data={transactions}
                    statusOptions={statusOptions}
                    iconTooltips={Icons}
                    title="Latest Transactions"
                    hidden={true}
                    subTitle="transactions"
                />
                <Divider className={styles.divider}/>
                <Chart/>
            </div>
            </div>
    );
}
