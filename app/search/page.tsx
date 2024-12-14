"use client";
import {
    Tabs,
    Tab,
    Input,
    Button,
    Checkbox,
    CheckboxGroup,
    Pagination,
} from "@nextui-org/react";
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import CardComponent from "@/app/components/ui/site/card/card";
import Footer from "@/app/components/ui/site/footer/footer";
import { SearchLine } from "@/data/public/Search-Line";
import styles from "@/app/search/searchPage.module.css";
import DropdownComponent from "@/app/components/ui/film/watch/dropdownComponent";
import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import API_BASE_URL from "@/app/api/apiConfig";

interface Attachment {
    attachmentType: number;
    attachmentUrl: string;
}

interface Item {
    id: string;
    name: string;
    attachments: Attachment[];
}

export default function SearchPage() {
    const [selectedGenreKeys, setSelectedGenreKeys] = useState<Set<string>>(new Set());
    const [selectedYearKeys, setSelectedYearKeys] = useState<Set<string>>(new Set());
    const [selectedCountryKeys, setSelectedCountryKeys] = useState<Set<string>>(new Set());
    const [selectedStudioKeys, setSelectedStudioKeys] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [results, setResults] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage] = useState<number>(7);
    const [genres, setGenres] = useState<string[]>([]);
    const [studio, setStudio] = useState<string[]>([]);
    const [country, setCountry] = useState<string[]>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const years = Array.from({ length: 25 }, (_, i) => ({
        id: (2000 + i).toString(),
        name: (2000 + i).toString(),
    }));

    const handleResetAll = () => {
        setSelectedGenreKeys(new Set());
        setSelectedYearKeys(new Set());
        setSelectedCountryKeys(new Set());
        setSelectedStudioKeys(new Set());
    };

    const handleSelectionChange = (values: string[]) => {
        setSelectedValues(values);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const debouncedSearch = debounce(async (query: string) => {
        if (!query.trim()) return;
        const formData = new FormData();
        formData.append("Query", query);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/mediaitem/search`,
                formData,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (response.data && response.data.data) {
                setResults(response.data.data);
            }
        } catch (error) {
            console.error("Ошибка при поиске", error);
            setResults([]);
        }
    }, 500);

    useEffect(() => {
        debouncedSearch(searchQuery);
    }, [searchQuery]);

    const extractImageUrl = (attachments: Attachment[]) => {
        const imageAttachment = attachments.find(att => att.attachmentType === 1);
        return imageAttachment ? imageAttachment.attachmentUrl : "";
    };

    const currentItems = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/tag/all`);
                if (response.data && response.data.data) {
                    setGenres(response.data.data);
                }
            } catch (error) {
                console.error("Ошибка при получении жанров", error);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchStudio = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/studio/all`);
                if (response.data && response.data.data) {
                    setStudio(response.data.data);
                }
            } catch (error) {
                console.error("Ошибка при получении студий", error);
            }
        };
        fetchStudio();
    }, []);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/country/all`);
                if (response.data && response.data.data) {
                    setCountry(response.data.data);
                }
            } catch (error) {
                console.error("Ошибка при получении стран", error);
            }
        };
        fetchCountry();
    }, []);

    return (
        <div style={{ height: "1751px", width: "1920px", backgroundColor: "var(--bgMainContainer)", display: "flex", flexDirection: "column" }}>
            <header style={{ width: "100%", justifyContent: "center", display: "flex", margin: "24px 0 0 0" }}>
                <NavbarComponent />
            </header>
            <main style={{ flex: "1", paddingLeft: "195px", paddingRight: "195px" }}>
                <Tabs style={{ marginTop: "35px", alignItems: "center" }} color={"warning"} variant={"underlined"} classNames={{
                    tabContent: `${styles.base} group-data-[selected=true]:text-[#06b6d4]`,
                    cursor: styles.cursor,
                }}>
                    <Tab title={"Пошук"}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "34px", height: "6rem", width: "100%" }}>
                            <Input placeholder={"Шукаєте щось особливе? Ми це знайдемо!"} classNames={{
                                base: styles.inputBase,
                                inputWrapper: styles.wrapper,
                                input: styles.input,
                            }} endContent={<SearchLine onClick={null} />} value={searchQuery} onChange={handleSearchChange} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap" }}>
                            {currentItems.length > 0 ? (
                                currentItems.map(item => (
                                    <div key={item.id} style={{ marginTop: "1rem" }}>
                                        <CardComponent id={item.id} title={item.name} img={extractImageUrl(item.attachments)} width={"202px"} />
                                    </div>
                                ))
                            ) : (
                                <div style={{ width: "100%", justifyItems: "center", marginTop: "2rem" }}>
                                    <p style={{ color: "white", fontSize: "16px" }}>Нічого не знайдено</p>
                                </div>
                            )}
                        </div>
                    </Tab>
                    <Tab title={"Фільтри"}>
                        <CheckboxGroup orientation="horizontal" style={{ display: "flex", alignItems: "flex-end", width: "50%", marginTop: "-50px" }} value={selectedValues} onChange={handleSelectionChange}>
                            <Checkbox value="free" classNames={{
                                wrapper: styles.border,
                                label: selectedValues.includes("free") ? styles.selectedColor : styles.color,
                            }}>Безкоштовно</Checkbox>
                            <Checkbox value="prepaid" classNames={{
                                wrapper: styles.border,
                                label: selectedValues.includes("prepaid") ? styles.selectedColor : styles.color,
                            }}>З передплатою</Checkbox>
                        </CheckboxGroup>
                        <div style={{ display: "flex", marginTop: "34px", width: "100%", gap: "16px", flexDirection: "row" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "left", width: "80%", flexDirection: "row", flexWrap: "wrap", gap: "16px", overflow: "auto" }}>
                                <DropdownComponent title={"Жанр"} items={genres} selectedKeys={selectedGenreKeys} setSelectedKeys={setSelectedGenreKeys} />
                                <DropdownComponent title={"Рік"} items={years} selectedKeys={selectedYearKeys} setSelectedKeys={setSelectedYearKeys} />
                                <DropdownComponent title={"Країна"} items={country} selectedKeys={selectedCountryKeys} setSelectedKeys={setSelectedCountryKeys} />
                                <DropdownComponent title={"Студіо"} items={studio} selectedKeys={selectedStudioKeys} setSelectedKeys={setSelectedStudioKeys} />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "left", height: "3.5rem", width: "20%", flexDirection: "row", flexWrap: "wrap", gap: "16px", overflow: "auto" }}>
                                <Button style={{ padding: "12px 28px", color: "white", fontSize: "20px", gap: "8px" }} variant={"ghost"} onClick={handleResetAll}>Очистити</Button>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                <div style={{ width: "80%", justifyContent: "center", display: "flex", position: "absolute", bottom: "5%" }}>
                    <Pagination onChange={handlePageChange} page={currentPage} showControls isCompact total={Math.ceil(results.length / itemsPerPage)} initialPage={1} color="warning" classNames={{ cursor: styles.pagination }} size={"lg"} />
                </div>
            </main>
            <footer style={{ height: "39.375rem", backgroundColor: "var(--bgFooter)" }}>
                <Footer />
            </footer>
        </div>
    );
}
