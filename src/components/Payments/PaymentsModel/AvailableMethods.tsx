import * as React from 'react';

import { useAppSelector } from '../../../hooks/redux-hooks';
import { currency } from '../../../utils/currency';
import styles from './PaymentsModel.module.scss';

interface MethodInfoProps {
    method: string
    amount: number
    currencySymbol: string
}

const MethodInfo: React.FC<MethodInfoProps> = ({ method, amount, currencySymbol }) => {
    return (
        <div className={styles.method_info}>
            <span>{method}: </span>
            <span>{amount} {currencySymbol}</span>
        </div>
    )
}

const AvailableMethods = () => {
    const { paymentMethods, currencyName } = useAppSelector(state => state.accaunt)
    const currencySymbol = currency.getSymbolByabbreviation(currencyName)

    const methods = paymentMethods.map((method, i) => <MethodInfo key={i} {...method} currencySymbol={currencySymbol ? currencySymbol : '$'}/>)
    return (
        <div className={styles.available_methods}>
            {methods.length > 0 ? methods : <p style={{textAlign: 'center'}}>No available methods yet</p>}
        </div>
    );
}

export default AvailableMethods;