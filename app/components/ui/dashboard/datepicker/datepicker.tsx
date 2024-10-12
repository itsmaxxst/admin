import { DateRangePicker } from "@nextui-org/react";
import { SelectorIcon } from "@/data/public/SelectorIcon";
import styles from "@/app/components/ui/dashboard/datepicker/datepicker.module.css";

export default function Datepicker() {
    return (
        <div className={styles.date}>
            <div className={`flex w-full flex-wrap md:flex-nowrap gap-4 ${styles.content}`}>
                <DateRangePicker
                    label="Date range"
                    visibleMonths={2}
                    selectorIcon={<SelectorIcon className="text-xl" />}
                    pageBehavior="single"
                    classNames={{
                        inputWrapper: styles.datepicker,
                        label: styles.input,
                        selectorIcon: styles.input,
                        segment: styles.input,
                    }}
                />
            </div>
        </div>
    );
}
