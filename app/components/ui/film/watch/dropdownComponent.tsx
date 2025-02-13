import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link
} from "@nextui-org/react";
import { ChevronDownIcon } from "@/data/public/ChevronDownIcon";
import type { Selection } from "@nextui-org/react";
import React from "react";
import {CollectionItem} from "yaml/dist/parse/cst";

interface Item {
    id: string;
    name: string;
}

interface DropdownComponentProps {
    title: string;
    items?: Item[];
    selectedKeys: Selection;
    setSelectedKeys: React.Dispatch<React.SetStateAction<Selection>>;
}

export default function DropdownComponent({ title, items=[], selectedKeys, setSelectedKeys }: DropdownComponentProps) {
    const handleReset = () => {
        setSelectedKeys(new Set());
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant={"flat"}
                    style={{
                        color: 'black',
                        backgroundColor: 'white',
                        borderRadius: '10px',
                        height: '48px',
                        fontSize: '20px',
                        padding: '8px 20px'
                    }}
                    endContent={<ChevronDownIcon />}
                >
                    {title}
                </Button>
            </DropdownTrigger>
            <DropdownMenu selectionMode="multiple" closeOnSelect={false} variant={"flat"} selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys} style={{ gap: '6px' }}>
                {items.map((item) => (
                    <DropdownItem key={item.id} value={item.name}>
                        {item.name}
                    </DropdownItem>
                )) as never}
                <DropdownItem hideSelectedIcon={true} key={"clear"}>
                    <Link onClick={handleReset} style={{ color: "black" }}>Скинути</Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
