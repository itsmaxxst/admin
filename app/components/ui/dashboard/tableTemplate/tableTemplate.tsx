"use client"

import React from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
    Selection,
    ChipProps,
    SortDescriptor,
    Tooltip
} from "@nextui-org/react";

import { ChevronDownIcon } from "@/data/public/ChevronDownIcon";
import { PlusIcon } from "@/data/public/PlusIcon";
import { SearchIcon } from "@/data/public/SearchIcon";
import { capitalize } from "@/app/components/ui/dashboard/tableTemplate/utils/utils";
import styles from "@/app/components/ui/dashboard/tableTemplate/tableTemplate.module.css"

interface Column {
    name: string;
    uid: string;
    sortable?: boolean;
}

interface StatusOption {
    name: string;
    uid: string;
}

export interface Data {
    id: number;
    name?: string;
    title?: string;
    status: string;
    age?: string;
    avatar?: string;
    email?: string;
    registrationDate?: string;
    amount?: string;
    transactionDate?: string;
}

export interface IconTooltip {
    icon: JSX.Element;
    tooltipContent: string;
}

interface TableTemplateProps {
    columns: Column[];
    data: Data[];
    statusOptions: StatusOption[];
    iconTooltips: IconTooltip[];
    title?: string;
    hidden: boolean;
    subTitle: string;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
    success: "success",
    pending: "warning",
    failed: "danger",
    active: "success",
    inactive: "warning",
    banned: "danger",
    visible: "success",
    hidden: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "registrationDate", "transactionDate", "status", "amount", "actions"];

export default function TableTemplate({ columns, data, statusOptions, iconTooltips, title, hidden, subTitle }: TableTemplateProps) {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
        column: "age",
        direction: "ascending",
    });

    const [page, setPage] = React.useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns, columns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...data];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name?.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.title?.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [data, filterValue, statusFilter, statusOptions.length, hasSearchFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Data, b: Data) => {
            const aValue = a[sortDescriptor.column as keyof Data];
            const bValue = b[sortDescriptor.column as keyof Data];

            const aNumber = Number(aValue);
            const bNumber = Number(bValue);

            let cmp: number;

            if (!isNaN(aNumber) && !isNaN(bNumber)) {
                cmp = aNumber < bNumber ? -1 : aNumber > bNumber ? 1 : 0;
            } else {
                cmp = String(aValue).localeCompare(String(bValue));
            }

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((data: Data, columnKey: React.Key) => {
        const cellValue = data[columnKey as keyof Data];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: data.avatar }}
                        description={data.email}
                        name={data.name}
                    >
                        {data.email}
                    </User>
                );
            case "title":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: data.avatar }}
                        description={data.email}
                        name={data.title}
                    />
                );
            case "registrationDate":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{data.registrationDate}</p>
                    </div>
                );
            case "transactionDate":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                        <p className="text-bold text-tiny capitalize text-default-400">{data.transactionDate}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip
                        className={styles.chip}
                        color={statusColorMap[data.status.toLowerCase()]}
                        size="sm"
                        variant="flat"
                    >
                        {typeof cellValue === 'string' ? capitalize(cellValue) : cellValue}
                    </Chip>
                );
            case "amount":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "actions":
                return (
                    <div className={styles.container}>
                        {iconTooltips.map((tooltip, index) => (
                            <Tooltip
                                key={index}
                                content={tooltip.tooltipContent}
                                classNames={{
                                    content: styles.header
                                }}
                            >
                                <span
                                    className="text-lg text-default-400 cursor-pointer active:opacity-50 mr-2"
                                >
                                    {tooltip.icon}
                                </span>
                            </Tooltip>
                        ))}
                    </div>
                );
            default:
                return cellValue;
        }
    }, [iconTooltips]);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <h1 className={styles.title}>{title}</h1>
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                        classNames={{
                            input: styles.input,
                            inputWrapper: styles.inputWrapper,
                        }}
                    />
                    <div className="flex gap-3">
                        <Dropdown classNames={{
                            content: styles.bg,
                        }}>
                            <DropdownTrigger className="visible sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="solid"
                                        className={styles.bg}>
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown classNames={{
                            content: styles.bg,
                        }}>
                            <DropdownTrigger className="visible sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="solid"
                                        className={styles.bg}>
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" isDisabled={hidden} endContent={<PlusIcon height={24} width={24}/>}>
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total: {data.length} {subTitle}</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option className={styles.bg} value="5">5</option>
                            <option className={styles.bg} value="10">10</option>
                            <option className={styles.bg} value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        title,
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        data.length,
        hasSearchFilter,
        columns,
        statusOptions,
        onClear,
        hidden,
        subTitle
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    page={page}
                    total={pages}
                    onChange={setPage}
                    classNames={{
                        prev: styles.bg,
                        next: styles.bg,
                        item: styles.bg,
                        cursor: styles.cursor
                    }}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="solid" onPress={onPreviousPage} className={styles.bg}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="solid" onPress={onNextPage} className={styles.bg}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [page, pages, onPreviousPage, onNextPage]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: styles.wrapper,
                th: styles.header,
                tr: styles.row
            }}
            selectedKeys={selectedKeys}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            showSelectionCheckboxes={false}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
