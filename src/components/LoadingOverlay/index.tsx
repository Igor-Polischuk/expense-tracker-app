import Loader from "../Loader";
import styles from './LoadingOverlay.module.scss';

export const LoadingOverlay = () => {
    return <div className={styles.loading}><Loader size={60}/></div>
}