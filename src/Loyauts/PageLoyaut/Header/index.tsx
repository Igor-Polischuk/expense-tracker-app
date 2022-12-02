import { useAppSelector } from '../../../hooks/redux-hooks';
import styles from './Header.module.scss';

const Header = () => {
    const email = useAppSelector(state => state.user.email);

    return ( 
        <header className={styles.header}>
            <span className={styles.name}>{email}</span>
            <div className={styles.photo}></div>
        </header>
     );
}
 
export default Header;