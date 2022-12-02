import { useContext, useState } from 'react';
import { SettingsContext } from '../../../hoc/SettingsProvider';

import { BiSun, BiMoon } from 'react-icons/bi'

import styles from './Sidebar.module.scss';

const SwitchTheme = () => {
    const { darkTheme, setDarkTheme } = useContext(SettingsContext)

    return (
        <div className={styles.switch}>
            <BiSun className={styles.switch_ico}/>
            <input checked={darkTheme} onChange={() => {
                // setChecked(!checked)
                setDarkTheme(!darkTheme)
            }} id='switchTheme' className={styles.switch_checkbox} type='checkbox' />
            <label htmlFor='switchTheme' className={styles.switch_label}>
                <BiSun className={styles.switch_ico_inside_sun}/>
                <BiMoon className={styles.switch_ico_inside_moon}/>
                <span className={styles.switch_button}></span>
            </label>
            <BiMoon className={styles.switch_ico}/>
        </div>
    );
}

export default SwitchTheme;