"use client"
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import {ChevronDownIcon} from "@/data/public/ChevronDownIcon";
import styles from "@/app/components/ui/film/watch/seasonTable/seasonTable.module.css"
import React from "react";

interface seasonTableProps {
    episode: string[];
    season: string[];
}

export default function SeasonTable({episode, season}: seasonTableProps){
    return (
        <Table className={styles.table} inlist={true} selectionMode="single" hideHeader={true} topContent={
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', backgroundColor:'white', paddingLeft:'10px'}}>
                <p>Список епізодів</p>
                <Dropdown>
                    <DropdownTrigger>
                        <Button endContent={<ChevronDownIcon/>} style={{backgroundColor:'transparent'}}>Сезон</Button>
                    </DropdownTrigger>
                    <DropdownMenu>
                        {season && season.map((item, index) => (
                            <DropdownItem key={index}>
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        }
               classNames={{
                   tbody: styles.body,
                   wrapper: styles.wrapper,
                   tr: styles.row,
               }}>
            <TableHeader>
                <TableColumn>&nbsp;</TableColumn>
                <TableColumn>Список епізодів</TableColumn>
            </TableHeader>
            <TableBody>
                {episode && episode.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{item}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}