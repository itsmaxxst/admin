"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Button, Input, Link, Divider } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "@/data/public/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/data/public/EyeFilledIcon";
import styles from "@/app/components/ui/login/card/loginCard.module.css";
import { FaGoogle } from "react-icons/fa";
import axios from "@/app/lib/axiosClient";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/app/api/apiConfig";

const SignUpCard: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Паролі не співпадають");
            return;
        }

        try {
            await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                passwordConfirm: formData.confirmPassword,
                phoneNumber: "string",
            });
            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Помилка реєстрації");
        }
    };

    return (
        <Card style={{ height: "825px" }} className={styles.container}>
            <CardHeader className={styles.title}>Реєстрація</CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardBody className={styles.body}>
                        {error && <div className={styles.error}>{error}</div>}
                    <Input
                        size="lg"
                        placeholder="Ім'я користувача"
                        isRequired
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.inputContainer}
                        classNames={{
                            input: styles.input,
                            inputWrapper: styles.inputWrapper,
                        }}
                    />
                    <Input
                        size="lg"
                        placeholder="E-mail"
                        isRequired
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.inputContainer}
                        classNames={{
                            input: styles.input,
                            inputWrapper: styles.inputWrapper,
                        }}
                    />
                    <Input
                        size="lg"
                        placeholder="Пароль"
                        isRequired
                        type={isVisible ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        className={styles.inputContainer}
                        classNames={{
                            input: styles.input,
                            inputWrapper: styles.inputWrapper,
                        }}
                    />
                    <Input
                        size="lg"
                        placeholder="Повторити Пароль"
                        isRequired
                        type={isVisible ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        className={styles.inputContainer}
                        classNames={{
                            input: styles.input,
                            inputWrapper: styles.inputWrapper,
                        }}
                    />
                    <Button type="submit" className={styles.button}>
                        Створити аккаунт
                    </Button>
                    </CardBody>
                    <CardFooter className={styles.footer}>
                        <Link href={"/login"} style={{width:'100%'}}>
                            <Button className={styles.button} style={{ backgroundColor: "#4285F4", color: "white" }} startContent={<FaGoogle />}>
                                Авторизація через гугл
                            </Button>
                        </Link>
                        <Divider />
                        <Link className={styles.text} href="/login">
                            Вже маєте аккаунт?&nbsp;<b style={{ fontWeight: "500" }}>Вхід</b>
                        </Link>
                    </CardFooter>
                </form>
        </Card>
    );
};

export default SignUpCard;
