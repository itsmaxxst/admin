"use client"
import classNames from "classnames";
import styles from "@/app/components/ui/site/activeBackground/activeBackground.module.css"

interface ActiveBackgroundProps {
    activePage: number;
    setActivePage: (page: number) => void;
}

export default function ActiveBackground({ activePage, setActivePage }: ActiveBackgroundProps) {
    const totalPages = 8;

    return (
        <div className="flex items-center" style={{gap:'9px'}}>
            {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                    <button
                        key={page}
                        className={classNames(
                            "w-5 h-5 bg-default-300 rounded-full transition-colors",
                            activePage === page ? styles.active : styles.inactive
                        )}
                        onClick={() => setActivePage(page)}
                    />
                );
            })}
        </div>
    );
}
