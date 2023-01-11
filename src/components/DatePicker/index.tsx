import * as React from 'react';
import { Calendar } from 'react-date-range';
import { BsCalendar3 } from 'react-icons/bs';
import { substractDays } from '../../utils/datetime';

import styles from './DatePcker.module.scss';

interface DatePckerProps{
    onPick: (date: Date) => void 
    style: React.CSSProperties
}

export const DatePicker: React.FC<DatePckerProps> = ({onPick, style={}}) => {
    const [date, setDate] = React.useState<Date>(new Date())
    const [isOpen, setOpen] = React.useState(false)
    const openCalendar = () => {
        setOpen(open => !open);
    }

    const calendarClassNames = isOpen ? `${styles.calendar} ${styles.show}` : styles.calendar;
    const isToday = date.toLocaleDateString() === new Date().toLocaleDateString();
    return (
        <div style={style} className={styles.date} >
            <div className={styles.dateBtn} onClick={openCalendar}>
                <BsCalendar3 />
                <span className={!isToday ? '' : styles.gray}>
                    {!isToday
                    ? date.toDateString() 
                    : 'Today'}
                    </span>
            </div>
            <Calendar className={`${calendarClassNames}`} onChange={item => {
                setDate(item);
                setOpen(false);
                onPick(item)
            }} date={date}
                minDate={substractDays(30)}
                maxDate={substractDays(-30)} /></div>
    );
};