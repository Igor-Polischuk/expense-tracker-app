import { useRef, useState, FC } from 'react';
import { NewPaymentMethod, Result } from '../../components/NewPaymentMethod';
import styles from './CreateAccauntPage.module.scss';

interface Option {
    value: string,
    label: string,
}

interface PaymentsMethodsProps {
    setMethods: (arr: Result[]) => void
}

const PaymentsMethods: FC<PaymentsMethodsProps> = ({ setMethods }) => {
    const methodsOptions: Option[] = [
        { value: 'cash', label: 'Cash' },
        { value: 'card', label: 'Debit card' },
        { value: 'bank', label: 'Bank account' }
    ]

    const inputsValues = useRef<Result[]>([])

    const handleChange = (value: Result) => {
        if (inputsValues.current.length == 0) {
            inputsValues.current = [value]
        } else {
            let found = false;
            inputsValues.current.forEach((item, i) => {
                if (item.id === value.id) {
                    found = true
                    inputsValues.current[i] = value
                }
            })
            !found && inputsValues.current.push(value)
        }

        const res = combineTheSameMethods(inputsValues.current)
        setMethods(res)
    }

    const [methodsElement, setMethodsElement] = useState([<NewPaymentMethod id={0} key={0} onChange={handleChange} options={methodsOptions} defaultValue={methodsOptions[0]} />])

    const addMethod = () => {
        setMethodsElement(elements => [...elements, <NewPaymentMethod id={methodsElement.length} key={methodsElement.length} onChange={handleChange} options={methodsOptions} defaultValue={methodsOptions[0]} />])
    }

    return (
        <div className={styles.methods} style={{ justifyContent: methodsElement.length === 3 ? 'space-between' : '' }}>
            {methodsElement}
            {methodsElement.length < 3
                &&
                <button type='button' onClick={addMethod} style={{ width: 'fit-content' }} className='button--filled'>Add..</button>}
        </div>
    );
}

function combineTheSameMethods(arr: Result[]) {
    arr = JSON.parse(JSON.stringify(arr));
    let currentMeyhods: string[] = []
    const newArr: Result[] = [];
    arr.forEach((item) => {
        if (currentMeyhods.includes(item.method)) {
            const oldMethod = newArr.find(value => value.method === item.method)
            if (oldMethod) oldMethod.amount += item.amount;
        } else {
            currentMeyhods.push(item.method)
            newArr.push(item)
        }
    })

    return newArr;

}

export default PaymentsMethods;
