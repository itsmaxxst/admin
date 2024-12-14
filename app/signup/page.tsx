import styles from "@/app/login/login.module.css";
import NavbarComponent from "@/app/components/ui/site/navbar/navbar";
import Footer from "@/app/components/ui/site/footer/footer";
import SignUpCard from "@/app/components/ui/signup/card/signUpCard";
import React from "react";

const SignUpPage : React.FC = () => {
    return (
        <body style={{height: '121.25rem', width: '1920px' }}>
        <header className={styles.navbar}>
            <NavbarComponent/>
        </header>
        <main>
            <SignUpCard/>
            <div className={styles.background} style={{height: '81.875rem', width: '100%'}}>
                <div className={styles.grid}>
                    <div className={styles.empty} style={{gridColumn: 'span 1'}}>1</div>
                    <div className={styles.item} style={{gridColumn: 'span 1', gridRow: 'span 2', marginTop: '-100px'}}>
                        <img alt={"image 1"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/f9c6/f425/376f3b0d1930a9e49d0730667300e797?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Cw4L9JW3w3aGOME-XnuMAgP7pVvkZLRk5xajJCBxCxD9~j4X5SK3~Drvldo3CkoENOuxeoY9sXpD850BfBwh7mej5U6yVxvp1smw-y63Kgv8h~V6l2f93KgEk2ITLzumtnE3Yss-4dhqOmchHlE1s2OnhfFxdrU~2RDNcaBhRmGxjM6TJy5ZFvHoGT4CsZ8ZeYeuE7OwOxwAEU6kU7iNO0RGqsHC-aVlwiryCVSjOadWpw0y6PXjYCAFCGU9AYuoaf8N6p8to27jB8r~Hc9WQ2var0sWhBKPrhXGrqhocsYp6hyYFtjbu2oMjb07xDUeXsnl~66w7XWnVwDajPZw9w__"}
                             loading={"lazy"}/>
                    </div>
                    <div className={styles.empty} style={{gridColumn: 'span 1'}}>3</div>
                    <div className={styles.item} style={{gridColumn: 'span 1', gridRow: 'span 2', marginTop: '-100px'}}>
                        <img alt={"image 2"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/1c56/185e/aa6d10920c41294a3a7b8d71866d8e52?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VxAln6-JPfyyTwBt-vdnUDwbzG3EfBjhd~ZEy56NggKYWCIpZIlhXu3dSwDtvrxTCSYd6KfTmp-47Fo68OMnVAxpB~WoyT~1bvsCNvVRPlF6BxEfF-156hwrf0VgQLSBCOwn0BZW9bWDE1qWap~giAaraCp~jazSrXx7YuOWKKCIj9IbCXSe4GSr8IFkPMOXll9yIFXainuXaeAgIs-1m01y1c3EEOm0kExIWsIhZDxcPt9bXXgthPm0WoHuGLFIKqbYWhf-QlRymVo1qapIuAZisXOyjE~ai3NkgQ7SgbWX4Jc~YD7vJCrSyIUGiNz64Nxb9GcN12KEVOyorH98Xw__"}
                             loading={"lazy"}/>
                    </div>
                    <div className={styles.item} style={{gridColumn: 'span 1', gridRow: 'span 2'}}>
                        <img alt={"image 3"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/fd1a/02c0/c4ec4943cbcc793c790d61655cdf8c08?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jOFuxX1WlAf~pWszj9Srlns6OA~vWRxiWB8G3SbeGo7iuajaf3QCJ~fstysqxVXBe9E5GxQ3TnDO5RrM2uYB-yFyKWtM7Do16sBLrqgeP1Y1~CMEEIqen53Qi~gnQMlZLgWbcPzqQEoMhOMO~J-vZV63Fd~UVcitqQAWyfKXnmLQfI9OR~y4Ct4I~syE5NOpbMjJ~6WmQkvUrlbF5FiCGlt6FBS1C2hR9WY84T3qBJrP3E8qxdtY6XNaonADPFfGo4UNpw-fQQSjbHi1YV1r99lhmxpFCVLQYPwAjqHeI9jhwgdRmHKkoVUIZQgOtPkdR6xaWTBs33DfPZjNyX7Nmw__"}
                             loading={"lazy"}/>
                    </div>
                    <div className={styles.item} style={{gridColumn: 'span 1', gridRow: 'span 2'}}>
                        <img alt={"image 4"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/3c2a/6a9b/f87e3c933821e5e846e771f146d1803b?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aV59z5hqZKV7TpiLxaGXK0kpcgY4J26n14xEGultaJCS28~KxZgbsdLIbp5lgGAoicKS-AtzOj53SmAmM1uLNYaANGQav6nL3hvGflqzygUx2TAzuW1affQF-9a0gDlakugxjNml2jCiPIwJpf6o-Baz32L6HJOeIeWZyVo8s~kSkL39ae3jZLRE0piK~l1O~28u3HRk~etVKU8FzgmerqpS8vHNmsFrHuPqttT0Sm2SKHJETDCR2ZSOQo8oyxcaoZqA21Q~SL1O~q38rdtx49iuTBCHTbgahu52DtayYAIP9WIr7IW0uDWw6GVlBgydI1Oq~IWCIxhlpvrNFMLF4w__"}
                             loading={"lazy"}/>
                    </div>
                    <div className={styles.item} style={{gridColumn: 'span 1', gridRow: 'span 2'}}>
                        <img alt={"image 5"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/a752/750d/5932652cef1ad14137db6781ebfd0666?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dMFBNJtVqpXvi-w6PCOXo2-MQYI-D3XvZcqcubIBuLLBnjwca7wjzEMRQGZwdrLJj-23-AB4YGbqwoLgYVRV9fNyKqCAgClefFUmMxzzg-eoRZnkaP1AHW2JOOrbRPLemzRbpPdgjdio0ktY5TCyP6AFOKcqujEeZwp3oHT2Dq-tWiPUJR5oeQ~T6EgEzQdqaOIBVymFHOLZskm3TVHddv5WF9j3uH8ItKZzEhqcjZMItyp9k-nHTO-yEhDM6mPKbsPFJrXwmTxOcKOvHpxMmFuRp4DLO~HTBdxTf4bbqSMIWNesSZcHZpMAhNe~LuCzauB-hb8THhvqCaMrkjA5dg__"}
                             loading={"lazy"}/>
                    </div>
                    <div className={styles.item} style={{gridColumn: 'span 1', gridRow: 'span 2'}}>
                        <img alt={"image 6"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/aa70/75fb/74f93cc4f91d1b37f59e2a3f4c10d2aa?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Mo~62s2U-IHfVU0U7l-kWIAjNWxy0EOtEPJJyApCdROmyqxh2LieWtUq4FVRCjwBtIri3gfz2MfrwnDeInkzygvLYvo9npiU8N0td11M-dM2B7O9Ywibz2DO7s7HO9kMv10puWDNrH0XCU-kAasvwlSnCUv3XDT320pKIZZo6Jkq9LKF7XY1yenzkbyT0WR4DVcj2R~rNfUYaKTD4ouCqIgohkB0cYilUg63BZojH8cq0Ajf~H6NY9va5FzuN5985j~eLzXbZqg9HsLxMnShhIKjlH~E6wAibMyCpztg7elLKuEWBVAKctdm8IDmMFJnjUTfRjelAGO99oUT87~3iw__"}
                             loading={"lazy"}/>
                    </div>
                    <div className={styles.item} style={{gridColumn: 'span 1', marginTop: '-50px'}}>
                        <img alt={"image 7"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/ec88/a5c8/dbeb75b978d9beabe408134769304b6c?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H0mtq9GG9ZewyBom8fvPflOAKZaFhWy3KJvacoTCCayGJODBAugThZMvFTBOtj3i-SKnh6hUqZY3cytExpukH9OGbaHEv4yaStofIReykQCBBhj133zwQtbUpMVXMGUez-h1ZcF25~TBmT~tBHCpRokDA0qKx68Kht8MmtWOuhcd-ZB9Yqv~W5tJjRhZrgNR3fXT76I~qvy41tT1u9zdB67xkin6VqzOMIhNLE-2NcqjAgAC2NZMUnSYY5R28xZvtb3pEevUqQFexClaDRlptWESZmg6ILzRWXZZwiuhGco~lWPYaNIbupxj2Fpov9mWKnSVrP2UK1C0htBRtcfb~w__"}
                             loading={"lazy"}/>
                    </div>
                    <div className={styles.item} style={{gridColumn: 'span 1', marginTop: '-50px'}}>
                        <img alt={"image 8"} className={styles.img}
                             src={"https://s3-alpha-sig.figma.com/img/dcfc/1931/61abc4758d3b51c1add6720d1146837e?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i7xecoMur8HejXX1m5Pe8DtH6XVrKYRFEHg~QgUQxYWRy-vnRXwngPdWodCO8nU-r-3nAzKxCTf7NFTtiAzGLTN1UaDUFWw5cHmswVsnlYc5wTkapLtH87SZUT4JieqaaF7SMp1hLQ75uGNmMR29vxVGdv~Vs7fFIxnbnKeOnrDNE0z3yma-PX7JJcj02gnV3SD91i1rJZEv8URA~hhRb4Odf2zRN2iw01O7ZMO2z9hgMmWipC30tNPPfCOxdqaZrMbN5Y2uX3oJ26d~wTfNipEgxfF4Y1NG0pif7aVBgFLO6LYyPYbKCZLuV-oiTZuh9Bc2MztA-nKhMC7RQwBXvw__"}
                             loading={"lazy"}/>
                    </div>
                </div>
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
                    <div style={{
                        borderRadius: '4px',
                        height: '12px', width: '593px',
                        display: 'flex'
                    }}>
                        <div style={{backgroundColor: '#F1EA76', width: '50%'}}></div>
                        <div style={{backgroundColor: 'white', width: '50%'}}></div>
                    </div>
                    <p className={styles.step}>
                        Крок 2 з З
                    </p>
                </div>
            </div>
        </main>
        <footer className={styles.footer}>
            <Footer/>
        </footer>
        </body>
    );
}
export default SignUpPage;
