"use client";
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import ParentModal from "@/app/components/ui/site/parentModal/parentModal";
import Footer from "@/app/components/ui/site/footer/footer";
import {Tabs, Tab, Link, Avatar, Input, Switch, Checkbox, CheckboxGroup, Button, InputOtp, Alert} from "@nextui-org/react";
import styles from "@/app/user/user.module.css"
import {Vector} from "@/data/public/Vector"
import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { RiVisaLine } from "react-icons/ri";
import MasterCard from "@/data/public/Mastercard"
import { MdCheck } from "react-icons/md"
import API_BASE_URL from "@/app/api/apiConfig";
export default function UserPage(){
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [valueEmail, setValueEmail] = React.useState("");
    const [valueName, setValueName] = React.useState("");
    const [valuePhone, setValuePhone] = React.useState("");
    const [isVisible, setIsVisible] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const fetchUserData = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/account/me`);
            if (response.ok) {
                const data = await response.json();
                setValueName(data.login);
                setValuePhone(data.phone);
                setValueEmail(data.email);
            } else {
                console.error('Ошибка получения данных пользователя');
            }
        } catch (error) {
            console.error('Ошибка при запросе данных пользователя:', error);
        }
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const handleLogout = () => {
        const userLogin = localStorage.getItem("userLogin");

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userLogin");

        if (userLogin) {
            console.log(`Користувач ${userLogin} успішно виконав вихід`);
        } else {
            console.log("Невідомий користувач");
        }

        router.push("/");

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log("Загружен файл:", file.name);
        }
    };

    const handleSelectionChange = (values: string[]) => {
        setSelectedValues(values);

        if (values.includes("selected")) {
            setIsModalOpen(true);
            console.log("isModalOpen:", isModalOpen);
        } else {
            setIsModalOpen(false);
            console.log("isModalOpen:", isModalOpen);
        }
    };

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalidEmail = React.useMemo(() => {
        if (valueEmail === "") return false;

        return validateEmail(valueEmail) ? false : true;
    }, [valueEmail]);

    const validatePhone = (value: string) =>
        value.match(/^\+?[0-9\s\-()]*$/);

    const isInvalidPhone = React.useMemo(() => {
        if (valuePhone === "") return false;

        return validatePhone(valuePhone) ? false : true;
    }, [valuePhone]);

    const handleValueChange = (newValue: string) => {
        const cleanedValue = newValue.replace(/[^0-9\s\-()+]/g, "");
        setValuePhone(cleanedValue);
    };

    const handleOtpChange = (value: string) => {
        setOtp(value);
    };

    const handleClearOtp = () => {
        setOtp("");
    };

    useEffect(() => {
        const storedName = localStorage.getItem("userLogin");
        if (storedName) {
            setValueEmail(storedName);
        }
    }, []);

    return (
        <body style={{height:'90.3125rem', width:'1920px', position:'relative'}}>
            <header style={{display:'flex', justifyContent:'center', width:'100%', margin:'24px 0 0 0', position:'absolute'}}>
                <NavbarComponent/>
            </header>
            <main style={{height: '50.9375rem', backgroundColor: 'var(--bgMainContainer)', position:'relative', display:'flex', flexDirection:'row'}}>
                    <div style={{height:'100%', width:'19.375rem'}}></div>
                    <div style={{height:'100%', display:'flex', width:'100.625rem', flexDirection:'column', marginTop:'10rem'}}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', width: '100%'}}>
                            <div style={{
                                display: 'flex',
                                gap: '15px',
                                color: 'white',
                                alignItems:'center'
                            }}>
                                <Avatar/>
                                <p>Nickname</p>
                            </div>
                        </div>
                        <Tabs isVertical variant={"light"} placement="start" style={{marginTop: '1.5rem', height:'10.125rem'}} classNames={{
                            tabContent: styles.base,
                            cursor: styles.bg,
                            wrapper: styles.wrapper,
                            tabList: styles.list
                        }}>
                            <Tab key="settings" title={"Налаштування акаунту"} style={{justifyContent: 'left'}}>
                                <div style={{borderLeft:'1px solid white', width:'80.5rem', height:'40rem', marginTop:'-1.5rem', display:'flex', flexDirection:'row'}}>
                                    <div style={{
                                        width: '50%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <Avatar size={"lg"} style={{marginLeft: '2rem'}}/>
                                        <div>
                                            {isVisible ? (
                                                <div style={{
                                                    width: '90%',
                                                    position: 'absolute',
                                                    top: '0',
                                                    left: '0',
                                                    zIndex: '10',
                                                    alignItems: 'center',
                                                    display: 'flex',
                                                    justifyContent: 'center'
                                                }}>
                                                    <div style={{width: '50%', marginTop: '44rem'}}>
                                                        <Alert radius={"md"} icon={<MdCheck/>} color={"success"}
                                                               description={"Успішна зміна даних"}
                                                               title={"Успіх!"} variant="faded" isVisible={isVisible}
                                                               onClose={() => setIsVisible(false)}/>
                                                    </div>
                                                </div>) : (
                                                <div></div>
                                            )}
                                        </div>
                                        <Input value={valueName} size={"lg"} placeholder={"Ім'я користувача"}
                                               className={styles.input} classNames={{input: styles.fc}} endContent={
                                            <Button className={styles.link} onClick={() => setIsVisible(true)}>
                                                Змінити
                                            </Button>
                                        } onValueChange={setValueName}/>
                                        <Input value={valuePhone} isInvalid={isInvalidPhone}
                                               color={isInvalidPhone ? "danger" : "default"}
                                               errorMessage="Введіть вірний номер телефону"
                                               onValueChange={handleValueChange} type={"tel"} size={"lg"}
                                               placeholder={"Номер телефону"} className={styles.input}
                                               classNames={{input: styles.fc}} endContent={
                                            <Button className={styles.link} onClick={() => setIsVisible(true)}>
                                                Змінити
                                            </Button>
                                        }/>
                                        <Input value={valueEmail} isInvalid={isInvalidEmail}
                                               color={isInvalidEmail ? "danger" : "default"}
                                               errorMessage="Введіть вірний E-mail" onValueChange={setValueEmail}
                                               type={"email"} size={"lg"} placeholder={"E-mail"}
                                               className={styles.input} classNames={{input: styles.fc}} endContent={
                                            <Button className={styles.link} onClick={() => setIsVisible(true)}>
                                                Змінити
                                            </Button>
                                        }/>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginTop: '4rem',
                                            marginLeft: '2rem',
                                            gap: '20px'
                                        }}>
                                            <p style={{color: 'white', fontSize: '16px', fontWeight: '500'}}>
                                                Отримувати сповіщення
                                            </p>
                                            <Switch defaultSelected size="sm" color="default"></Switch>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            marginTop: '4rem',
                                            marginLeft: '2rem',
                                            gap: '20px',
                                            alignItems: 'center'
                                        }}>
                                            <p style={{
                                                color: 'white',
                                                fontSize: '16px',
                                                fontWeight: '500'
                                            }}>Батьківський контроль</p>
                                            <CheckboxGroup onChange={handleSelectionChange}>
                                                <Checkbox value="selected" size={"sm"} classNames={{
                                                    wrapper: styles.border,
                                                    label: selectedValues.includes("selected") ? styles.selectedColor : styles.color
                                                }}>
                                                    {selectedValues.includes("selected") ? "Увімкнено" : "Вимкнено"}
                                                </Checkbox>
                                            </CheckboxGroup>
                                        </div>
                                    </div>
                                    <div style={{
                                        width: '50%',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div
                                            style={{width: '100%', display: 'flex', flexDirection: 'row', gap: '6rem'}}>
                                            <Link style={{color: 'white', fontSize: '16px', fontWeight: '600'}}
                                                  onPress={() => fileInputRef.current.click()}>Завантажити</Link>
                                            <Link style={{color: 'white', fontSize: '16px', fontWeight: '600'}}>Видалити
                                                фото</Link>
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                style={{display: 'none'}}
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab key="promocode" title={"Вести промокод"} style={{justifyContent: 'left'}}>
                                <div style={{borderLeft: '1px solid white', width: '80.5rem', height: '40rem', marginTop: '-1.5rem'}}>
                                    <div style={{border:'1px solid white', borderRadius:'30px', width:'81rem', height:'30rem', marginLeft:'2.5rem',position:'absolute', marginTop:'3rem', display:'flex', flexDirection:'row'}}>
                                        <div style={{width: '50%'}}>
                                            <div className={styles.img}></div>
                                        </div>
                                        <div style={{width:'50%'}}>
                                            <div style={{width:'100%', display:'flex', flexDirection:'column', height:'100%'}}>
                                                <div style={{width:'100%', height:'25%', alignContent:'center', marginLeft:'10px'}} className={styles.text}>
                                                    <p>Скористайтеся нагодою на повну</p>
                                                </div>
                                                <div style={{width:'100%', height:'50%', marginLeft:'10px'}}>
                                                    <p className={styles.plain}>
                                                        Використайте <span className={styles.highlight}> промокод та отримайте</span> доступ до тарифу
                                                    </p>
                                                </div>
                                                <div style={{width:'100%', height:'25%', display:'flex', flexDirection:'row', marginLeft:'10px'}}>
                                                    <div style={{width:'50%', alignContent:'center'}}>
                                                        <p className={styles.desc}>
                                                            Після використання<br/> промокоду передплата буде доступна у
                                                            вашому<br/> акаунті. Ви зможете продовжити її
                                                            в <br/> будь-який
                                                            зручний момент.
                                                        </p>
                                                    </div>
                                                    <div style={{width:'50%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                                                        <div style={{borderRadius:'479px', background:'white', width:'14.125rem', height:'3.75rem', display:'flex', justifyContent:'center', alignItems:'center'}}>
                                                            <InputOtp length={5} variant={"faded"} radius={"md"} value={otp} onValueChange={handleOtpChange}/>
                                                        </div>
                                                        <div>
                                                            {isVisible ?(
                                                                    <div style={{width:'100%', position:'absolute', top:'0', left:'0',zIndex:'10', alignItems:'center', display:'flex', justifyContent:'center'}}>
                                                                        <div style={{width:'85%', marginTop:'1rem'}}>
                                                                            <Alert radius={"md"} icon={<MdCheck/>} color={"success"} description={"Успішне використання промокоду"} title={"Успіх!"} variant="faded" isVisible={isVisible} onClose={() => setIsVisible(false)}/>
                                                                        </div>
                                                                    </div>) : (
                                                                <div></div>
                                                            )}
                                                        </div>
                                                        <div style={{background:'white', width:'3.8125rem', height:'1.4rem', marginLeft:'-3rem'}}></div>
                                                        <div style={{borderRadius:'485px', background:'white', width:'3.8125rem', height:'3.8125rem', marginLeft:'-0.5rem', alignContent:'center', alignItems:'center', justifyContent:'center', display:'flex'}}>
                                                            <Button className={styles.button} size={"lg"} isIconOnly radius={"full"} onPress={() => setIsVisible(true)} onClick={handleClearOtp}>
                                                                <Vector/>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab key="payments" title={"Передплати і платежі"} style={{justifyContent: 'left'}}>
                                <div style={{borderLeft: '1px solid white', width: '80.5rem', height: '40rem', marginTop: '-1.5rem'}}>
                                    <Tabs style={{alignItems:'center', marginTop:'-3rem', marginLeft:'2.5rem'}} color={"warning"} variant={"underlined"} classNames={{
                                        tabContent:`${styles.base} group-data-[selected=true]:text-[#06b6d4]`,
                                        cursor: styles.cursor}}>
                                        <Tab key={"management"} title={"Керування передплатами"}>
                                            <div style={{width:'100%', height:'35rem',display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', marginLeft:'2.5rem'}}>
                                                <p style={{textAlign:'center', color:'white', fontSize:'20px', fontWeight:'700', lineHeight:'30px', letterSpacing:'0.2', fontFamily:'Manrope, sans-serif'}}>Керуйте вашими передплатами і контролюйте<br/> продовження</p>
                                                <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100%'}}>
                                                    <div style={{display:'flex', flexDirection:'row', width:'25%', border:'3px solid white', borderRadius:'85px', alignItems:'center',justifyContent: 'space-between', padding:'0.3rem', marginTop:'2rem'}}>
                                                        <div style={{display:'flex',alignItems:'center', justifyContent:'center', width:'100%' }}>
                                                            <p style={{color: 'white', fontSize: '17px'}}>Обрати передплату</p>
                                                        </div>
                                                        <Button className={styles.button} size={"lg"} isIconOnly radius={"full"}>
                                                            <Vector/>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab key={"cards"} title={"Мої картки"}>
                                            <div style={{width: '100%', height: '35rem', display:'flex', flexDirection:'column', marginLeft:'2.5rem', gap:'6rem'}}>
                                                <p style={{color:'white', fontFamily:'Manrope, sans-serif', fontSize:'16px', fontWeight:'600'}}>Швидше додайте свою картку, щоби більше не витрачати час на введення даних вручну.</p>
                                                <div style={{width:'100%',display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem'}}>
                                                    <div style={{width:'41.875rem', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                                        <p style={{color:'white', fontSize:'16px', fontWeight:'700'}}>Номер картки</p>
                                                        <div style={{display:'flex', flexDirection:'row', gap:'1rem', alignItems:'center'}}>
                                                            <RiVisaLine size={'45px'} color={'blue'}/>
                                                            <MasterCard height={'31px'} width={'71px'}/>
                                                        </div>
                                                    </div>
                                                    <div style={{width:'41.875rem', display:'flex', flexDirection:'column', gap:'2rem'}}>
                                                        <Input placeholder={"1234 1234 1234 1234"} size={"lg"} style={{borderRadius:'10px', height:'54px'}} classNames={{input:styles.fc}}/>
                                                        <div style={{width:'41.875rem', display:'flex', flexDirection:'row', gap:'2rem'}}>
                                                            <Input placeholder={"MM/PP"} size={"lg"} style={{borderRadius:'10px', height:'54px'}} classNames={{input:styles.fc}}/>
                                                            <Input placeholder={"CVV"} size={"lg"}  style={{borderRadius:'10px', height:'54px'}} classNames={{input:styles.fc}}/>
                                                        </div>
                                                        <Button style={{borderRadius:'10px', height:'54px',backgroundColor:'var(--bgFooter)', color:'black', fontSize:'20px', fontWeight:'400', fontFamily:'Manrope, sans-serif'}}>Додати картку</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </Tab>
                        </Tabs>
                        <div style={{display: 'flex', width: '12.5rem', height: '6.25rem', justifyContent: 'left', position:'absolute', marginTop:'13.75rem'}}>
                            <Link style={{color: 'white', marginLeft: '15px'}} onClick={handleLogout}>
                                <p>Вийти з акаунту</p>
                            </Link>
                        </div>
                    </div>
            </main>
            <footer style={{height: '39.375rem', backgroundColor: 'var(--bgFooter)', position: 'relative'}}>
                <Footer/>
            </footer>
            {isModalOpen && <ParentModal onClose={() => setIsModalOpen(false)} />}
        </body>
    )
}