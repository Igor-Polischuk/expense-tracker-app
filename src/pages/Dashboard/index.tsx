import BalanceInfoCard from '../../components/BalanceInfoCard';
import LineChart from '../../components/BalanceHistoryInfo';
import Payments from '../../components/Payments';
import styles from './Dashboard.module.scss';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useAppSelector } from '../../hooks/redux-hooks';

const Dashboard = () => {
    const balance = useAppSelector(state => state.accaunt.total)

    return (
        <div className={styles.dashboard}>
            <div className={styles.mainInfoCards}>
                <BalanceInfoCard title='Available balance' sum={balance} />
                <BalanceInfoCard title='Income' sum={0} />
                <BalanceInfoCard title='Exspense' sum={0} />
            </div>
            <div className={styles.payments}>
                <Payments />
            </div>
            <LineChart title='Analytic' />
        </div>
    );
}

export default Dashboard;