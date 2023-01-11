import React from "react";
import { useAppSelector } from "../../../hooks/redux-hooks";
import { currency } from "../../../utils/currency";
import MySelect from "../../MySelect";

import styles from './AddTransactionModal.module.scss';

export const Transfer = () => {
    const { paymentMethods, currencyName } = useAppSelector(state => state.accaunt);
    const currencySymbol = currency.getSymbolByabbreviation(currencyName);
    const options = paymentMethods.map(method => ({ value: method.method, label: method.method }));
    const [firstOption, setFirstOption] = React.useState(options[0].value);
    const [secondOption, setSecondOption] = React.useState(options[0].value);

    const findAmountByValue = (value: string) => {
        const res = paymentMethods.filter(item => item.method === value);
        return res[0].amount;
    }

    return (
        <>
            <div className={styles.transfer__input__wrapper}>
                <p>From:</p>
                <div className={styles.transfer__input}>
                    <MySelect options={options} defaultValue={options[0]} type='transparent' onChange={(value) => {
                        setFirstOption(value.value)
                    }} />
                    <p className={styles.methodBalance}>{findAmountByValue(firstOption)} {currencySymbol}</p>
                </div>
            </div>
            <div className={styles.transfer__input__wrapper}>
                <p>To:</p>
                <div className={styles.transfer__input}>
                    <MySelect options={options} defaultValue={options[0]} type='transparent' onChange={(value) => {
                        setSecondOption(value.value)
                    }} />
                    <p className={styles.methodBalance}>{findAmountByValue(secondOption)} {currencySymbol}</p>
                </div>
            </div>
            <div className={styles.sum}>
                    <p>Commision</p>
                    <input type="number" placeholder='Amount' className={styles.ammount} />
                </div>
        </>

    )
}