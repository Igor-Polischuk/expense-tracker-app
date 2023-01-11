import { getAuth } from "firebase/auth";
import { NavLink } from 'react-router-dom';
import Logo from '../../../components/Logo';
import SwitchTheme from './SwitchTheme';

import { MdDashboard } from 'react-icons/md';
import { TbReceipt2, TbSettings } from 'react-icons/tb';
import { ImCalendar, ImStatsBars, ImArrowRight2, ImArrowLeft2 } from 'react-icons/im';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiLogoutBoxLine, RiMenuUnfoldLine } from 'react-icons/ri';

import { Link } from 'react-router-dom';
import { useAppDispatch } from "../../../hooks/redux-hooks";
import { setUser } from "../../../redux/slices/userSlice";
import { useState, useEffect } from "react";
import styles from './Sidebar.module.scss';
import useWindowSize from "../../../hooks/useWindowSize";
import { openAddTransactionModal } from "../../../redux/slices/modalSlice";

const setActiveClass = ({ isActive }: { isActive: boolean }) => isActive ? styles.active_link : ''

export const Sidebar = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(true);
    const classNames = open ? styles.aside : styles.aside + ' ' + styles.hide;
    const togleSidebar = () => {
        setOpen(!open);
    }

    const [width] = useWindowSize();
    useEffect(() => {
        width < 750 && setOpen(false);
    }, [width]);


    const signOut = () => {
        const auth = getAuth();
        auth.signOut();
        dispatch(setUser({ email: '', uid: '' }));
    }

    return (
        <>
            <aside className={classNames}>
                <div className={styles.aside__header}>
                    <Logo className={styles.logo} />
                    <button className={styles.toggleBTN} onClick={togleSidebar}>
                        {!open ? <RiMenuUnfoldLine /> : <ImArrowLeft2 />}
                    </button>
                </div>

                <nav>
                    <button className={`button--filled rounded fit flex-alc ${styles.addBtn}`} onClick={() => dispatch(openAddTransactionModal())}><AiOutlinePlus fontSize={22} /><span>Add</span></button>
                    <ul className={styles.navigation}>
                        <li>
                            <NavLink to='/dashboard' className={setActiveClass}><MdDashboard /><span>Dashboard</span></NavLink>
                        </li>
                        <li>
                            <NavLink to='/transactions' className={setActiveClass}><TbReceipt2 /><span>Transactions</span></NavLink>
                        </li>
                        <li>
                            <NavLink to='/planning' className={setActiveClass}><ImCalendar /><span>Planing</span></NavLink>
                        </li>
                        <li>
                            <NavLink to='/statistics' className={setActiveClass}><ImStatsBars /><span>Statistic</span></NavLink>
                        </li>
                        <li>
                            <NavLink to='/settings' className={setActiveClass}><TbSettings /><span>Settings</span></NavLink>
                        </li>
                    </ul>
                    <SwitchTheme />
                </nav>
                <Link to='/login' onClick={signOut} className={styles.log_out}><RiLogoutBoxLine /></Link>
            </aside>
            <div className={styles.fake_sidebar}></div>
        </>
    );
};