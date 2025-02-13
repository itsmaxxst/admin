"use client"
import React, { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, Input, Checkbox, Link, Divider} from "@nextui-org/react";
import {EyeSlashFilledIcon} from "@/data/public/EyeSlashFilledIcon";
import {EyeFilledIcon} from "@/data/public/EyeFilledIcon";
import styles from "@/app/components/ui/login/card/loginCard.module.css"
import axios from "axios";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/app/api/apiConfig";
import {GoogleLogin, GoogleOAuthProvider,  CredentialResponse} from "@react-oauth/google";

const LoginCard: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const toggleVisibility = () => setIsVisible(!isVisible);
    const GOOGLE_CLIENT_ID = "610533013682-06eviqt280bce3g69h3cf5aoodac1que.apps.googleusercontent.com";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
                emailOrPhone: formData.email,
                password: formData.password,
            });

            console.log("Відповідь сервера:", response.data);

            const { accessToken, refreshToken } = response.data.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userLogin", formData.email);


            router.push("/");
        } catch {
            setError("Помилка входу");
        }
    };

    const handleGoogleLogin = async (response: CredentialResponse) => {
        try {
            const { credential } = response;
            console.log("Дані Google Login:", credential);

            const serverResponse = await axios.post(`${API_BASE_URL}/api/v1/auth/google-login`, {
                token: credential
            });

            const { accessToken, refreshToken } = serverResponse.data.data;
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("userLogin", serverResponse.data.email);

            router.push("/");

        } catch (err) {
            console.error("Помилка авторизації через Google:", err);
        }
    };
        return (
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <Card style={{height:'751px'}} className={styles.container}>
                    <CardHeader className={styles.title}>Вхід в аккаунт</CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardBody className={styles.body}>
                            {error && <div className={styles.error}>{error}</div>}
                            <Input
                                name={"email"}
                                size={"lg"}
                                placeholder="Логін"
                                isRequired
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.inputContainer}
                                classNames={{
                                    input: styles.input,
                                    inputWrapper: styles.inputWrapper,
                                }}
                            />
                            <Input
                                name={"password"}
                                size={"lg"}
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}
                                            aria-label="toggle password visibility">
                                        {isVisible ? (
                                            <EyeSlashFilledIcon
                                                className="text-2xl text-default-400 pointer-events-none"/>
                                        ) : (
                                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                className={styles.inputContainer}
                                classNames={{
                                    input: styles.input,
                                    inputWrapper: styles.inputWrapper,
                                }}
                            />
                            <div>
                                <Checkbox
                                    classNames={{
                                        wrapper: styles.radio,
                                        icon: styles.selected,
                                    }}
                                    width={30} height={30} value="yes" radius="full">
                                    <span className={styles.text} style={{marginLeft: "15px"}}>Запам&apos;ятати мене</span>
                                </Checkbox>
                            </div>
                            <Button className={styles.button} type="submit">
                                Увійти в акаунт
                            </Button>
                        </CardBody>
                        <CardFooter className={styles.footer}>
                            <Divider/>
                            <div style={{width:'100%'}}>
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => console.error("Помилка Google Login:")}
                                    theme="filled_blue"
                                    useOneTap
                                />
                            </div>
                            <Link className={styles.text} href={"/signup"}>Немає аккаунту?&nbsp;<b style={{fontWeight:"500"}}>Реєстрація</b></Link>
                        </CardFooter>
                    </form>
                </Card>
            </GoogleOAuthProvider>
    );
};
export default LoginCard
