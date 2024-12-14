"use client"
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import Footer from "@/app/components/ui/site/footer/footer";
import {Autocomplete, AutocompleteItem, Button, Input} from "@nextui-org/react";
import {CreditCard} from "@/data/public/CreditCard";
import React from "react";
import {RiVisaLine} from "react-icons/ri";
import MasterCard from "@/data/public/Mastercard";
import styles from "@/app/user/user.module.css";

export default function CheckoutPage(){
    return (
        <body style={{height: '121.25rem', width: '1920px'}}>
        <header style={{display: 'flex', justifyContent: 'center', width: '100%', margin: '24px 0 0 0', position: 'absolute'}}>
            <NavbarComponent/>
        </header>
        <main style={{height: '81.875rem', backgroundColor: 'var(--bgMainContainer)', display:'flex', flexDirection:'column'}}>
            <div style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column', gap:'2rem'}}>
                <div style={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    flexDirection: 'column'
                }}>
                    <h1 style={{color: 'white', fontSize: '24px', fontWeight: '700'}}>Обери зручний спосіб оплати</h1>
                    <p style={{color: 'white', fontSize: '16px', fontWeight: '500'}}>
                        Ми прагнемо зробити оплату простою та безпечною. Обери зручний<br/>
                        метод і насолоджуйся безперервним доступом до улюблених<br/>
                        сервісів та контенту.
                    </p>
                </div>
                <div style={{width:'33.4375rem'}}>
                    <Autocomplete isRequired label="Спосіб оплати"  defaultSelectedKey="credit card" startContent={<CreditCard/>} size={"lg"} classNames={{listboxWrapper:styles.fc}}>
                        <AutocompleteItem key={"credit card"}>Кредитна карта</AutocompleteItem>
                        <AutocompleteItem key={"paypal"}>PayPal</AutocompleteItem>
                        <AutocompleteItem key={"gift card"}>Подарункова карта</AutocompleteItem>
                    </Autocomplete>
                </div>
                <div style={{width: '33.4375rem', display: 'flex', flexDirection: 'column'}}>
                    <div
                        style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <p style={{color: 'white', fontSize: '15px', fontWeight: '700'}}>Номер картки</p>
                        <div style={{display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center'}}>
                            <RiVisaLine size={'45px'} color={'blue'}/>
                            <MasterCard height={'31px'} width={'71px'}/>
                        </div>
                    </div>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                        <Input placeholder={"1234 1234 1234 1234"} size={"lg"}
                               style={{borderRadius: '10px', height: '54px'}} classNames={{input: styles.fc}}/>
                        <div style={{width: '100%', display: 'flex', flexDirection: 'row', gap: '2rem'}}>
                            <Input placeholder={"MM/PP"} size={"lg"} style={{borderRadius: '10px', height: '54px'}}
                                   classNames={{input: styles.fc}}/>
                            <Input placeholder={"CVV"} size={"lg"} style={{borderRadius: '10px', height: '54px'}}
                                   classNames={{input: styles.fc}}/>
                        </div>
                        <Button style={{
                            borderRadius: '10px',
                            height: '54px',
                            backgroundColor: 'var(--bgFooter)',
                            color: 'black',
                            fontSize: '20px',
                            fontWeight: '400',
                            fontFamily: 'Manrope, sans-serif'
                        }}>Оплатити</Button>
                    </div>
                </div>
            </div>
            <div>
                <div style={{
                    marginTop: '-8rem',
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: '24px',
                    zIndex: '3',
                    width: '100%',
                }}>
                    <div style={{borderRadius: '4px', height: '12px', width: '593px', display: 'flex'}}>
                        <div style={{backgroundColor: '#F1EA76', width: '100%'}}></div>
                    </div>
                    <p style={{color:'#F1EA76', fontSize:'20px', fontWeight:'700'}}>
                        Крок 3 з З
                    </p>
                </div>
            </div>
        </main>
        <footer style={{height: '39.375rem', backgroundColor: 'var(--bgFooter)', position: 'relative'}}>
            <Footer/>
        </footer>
        </body>
    )
}