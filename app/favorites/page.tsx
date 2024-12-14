"use client"
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import Footer from "@/app/components/ui/site/footer/footer";
import {Tabs, Tab} from "@nextui-org/react";
import {Clock} from "@/data/public/Clock"
import {Dollar} from "@/data/public/Dollar"
import {Menu} from "@/data/public/Menu"
import {Playlist} from "@/data/public/Playlist"
import styles from "@/app/favorites/favorites.module.css";
export default function FavoritesPage(){
    return(
        <body style={{height:'1751px', width:'1920px', backgroundColor:'var(--bgMainContainer)', display:'flex', flexDirection:'column'}}>
            <header style={{width:'100%', justifyContent:'center', display:'flex', margin:'24px 0 0 0'}}>
                <NavbarComponent/>
            </header>
            <main style={{flex: '1', paddingLeft:'195px', paddingRight:'195px'}}>
                <div style={{display:'flex', marginTop:'5rem', marginLeft:'4rem', marginRight:'4rem'}}>
                    <h1 style={{color:'white', fontSize:'48px', fontWeight:'400', fontFamily:'Manrope, sans-serif'}}>
                        Мої обрані
                    </h1>
                </div>
                <div style={{display:'flex', marginLeft:'4rem', marginRight:'4rem', marginTop:'1rem', width:'100%'}}>
                    <Tabs  style={{alignItems:'center', width:'100%'}} color={"warning"} variant={"underlined"} classNames={{
                        tabContent:`${styles.base} group-data-[selected=true]:text-[#06b6d4]`,
                        cursor: styles.cursor}} placement={'top'}>
                        <Tab title={"Історія"}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '90rem',
                                justifyContent: 'center',
                                marginTop: '1rem',
                                height: '100%',
                                flexDirection: 'column',
                            }}>
                                <Clock/>
                                <p style={{textAlign:'center', color:'#D9D9D9', fontSize:'24px', fontWeight:'600'}}>Що ви дивились?<br/>Ось ваша остання подорож</p>
                            </div>
                        </Tab>
                        <Tab title={"Обрані фільми "}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '90rem',
                                justifyContent: 'center',
                                marginTop: '1rem',
                                height: '100%',
                                flexDirection: 'column',
                            }}>
                                <Menu/>
                                <p style={{
                                    textAlign: 'center',
                                    color: '#D9D9D9',
                                    fontSize: '24px',
                                    fontWeight: '600'
                                }}>Ваш персональний кінозал — все найкраще тут!</p>
                            </div>
                        </Tab>
                        <Tab title={"Плейлісти "}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '90rem',
                                justifyContent: 'center',
                                marginTop: '1rem',
                                height: '100%',
                                flexDirection: 'column',
                            }}>
                                <Playlist/>
                                <p style={{
                                    textAlign: 'center',
                                    color: '#D9D9D9',
                                    fontSize: '24px',
                                    fontWeight: '600'
                                }}>Створюйте кінозбірки та діліться з друзями!</p>
                            </div>
                        </Tab>
                        <Tab title={"Придбані"}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '90rem',
                                justifyContent: 'center',
                                marginTop: '1rem',
                                height: '100%',
                                flexDirection: 'column',
                            }}>
                                <Dollar/>
                                <p style={{
                                    textAlign: 'center',
                                    color: '#D9D9D9',
                                    fontSize: '24px',
                                    fontWeight: '600'
                                }}>Ваші власні кіноскарби — завжди під рукою!</p>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </main>
            <footer style={{height: '39.375rem', backgroundColor: 'var(--bgFooter)'}}>
                <Footer/>
            </footer>
        </body>
    )
}