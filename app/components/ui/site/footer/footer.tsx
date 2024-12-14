import styles from "@/app/components/ui/site/footer/footer.module.css";
import {YouTube} from "@/data/public/YouTube";
import {FaceBook} from "@/data/public/FaceBook";
import {Instagram} from "@/data/public/Instagram";
import {IconsBg} from "@/data/public/IconsBg";

export default function Footer() {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerWrapper}>
                <div className={styles.column} style={{width: '19.5625rem'}}>
                    <h1 className={styles.title}>Адреса</h1>
                    <p className={styles.text}>
                        03124, м. Київ, вул. М. <br/>
                        Василенка, 7,
                        <br/>бізнес-центр GELIOS
                    </p>
                </div>
                <div className={styles.column} style={{width: '25.5625rem'}}>
                    <h1 className={styles.title}>Служба підтримки</h1>
                    <p className={styles.text}>
                        <b>Потрібна допомога? Звертайтесь!</b><br/>
                        info@sweet.tv<br/>
                        <b>З питань авторських прав</b><br/>
                        sweet.tv-copyright@axghouse.com<br/>
                        <b>З питань співробітництва</b><br/>
                        b2b@sweet.tv<br/>
                    </p>
                </div>
                <div className={styles.column} style={{marginRight:'-6%'}}>
                    <h1 className={styles.title}>Ми у соцмережах</h1>
                    <div className={styles.iconsWrapper}>
                        <div className={styles.iconItem}>
                            <YouTube/>
                            <div className={styles.iconBg}>
                                <IconsBg/>
                            </div>
                        </div>
                        <div className={styles.iconItem}>
                        <FaceBook/>
                            <div className={styles.iconBg}>
                                <IconsBg/>
                            </div>
                        </div>
                        <div className={styles.iconItem}>
                        <Instagram/>
                            <div className={styles.iconBg}>
                                <IconsBg/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.applications}>
                <h1 className={styles.title} style={{marginLeft:'-1%'}}>Ми у соцмережах</h1>
                <div className={styles.applicationsWrapper}>
                    <div className={styles.apple}></div>
                    <div className={styles.google}></div>
                    <div className={styles.huawei}></div>
                </div>
            </div>
        </div>
    );
}
