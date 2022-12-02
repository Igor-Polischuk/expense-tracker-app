import { Outlet } from "react-router-dom";

import styles from './AuthLoyaut.module.scss';
import image from './Manage money-rafiki.svg';
import { useEffect, useState } from "react";
import Logo from "../../components/Logo";

const AuthLoyaut = () => {
    return (
        <div className={styles.content}>
            <div className={styles.main}>
                <Logo className={styles.logo} />
                <div className={styles.form}>
                    <Outlet />
                </div>
            </div>
            <img src={image} className={styles.image} alt="Decorative image" />
        </div>
    );
}

export default AuthLoyaut;