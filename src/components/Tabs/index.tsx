import * as React from 'react';
import styles from './Tabs.module.scss';

interface TabsProps{
    onChange: (option: string) => void
    options: string[]
    activeDefault?: string
    className?: string
}

export const Tabs: React.FC<TabsProps> = ({onChange, options, className, activeDefault=options[0]}) => {
    const [active, setActive] = React.useState(activeDefault);

    return (
        <div className={`${styles.tabs} ${className}`}>
            {options.map((item) => {
                const classNames = `${styles.tabs__btn} ${active === item ? styles.active : ''}`
                return <button key={item} className={classNames} onClick={() => {
                    setActive(item);
                    onChange(item);
                }}>{item}</button>
            })}
        </div>
    );
};