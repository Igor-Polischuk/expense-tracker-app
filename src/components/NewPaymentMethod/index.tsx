import * as React from 'react';
import Select from 'react-select';
import MySelect from '../MySelect';
import styles from './NewPaymentMethod.module.scss';

export interface Result{
    amount: number,
    method: string,
    id: number
}

interface NewPaymentMethodProps {
    onChange: (value: Result) => void,
    id: number,
    [x: string]: any
}

export const NewPaymentMethod: React.FC<NewPaymentMethodProps> = ({id, onChange, ...props}) => {
    
    const [method, setMethods] = React.useState('cash');
    const [amount, setAmount] = React.useState(0);
    
    React.useEffect(() => {
        onChange({method, amount, id})
    })
    return (
        <div className={styles.paymentWrapper}>
            <MySelect
            options={props.options}
            defaultValue={props.defaultValue}
            type='transparent'
            onChange={(value: {value: string, label: string}) => setMethods(value.value)
            }
             />
            <input type='number' min={0} value={amount} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(+e.target.value)} className={styles.paymentSum} />
        </div>
    );
};