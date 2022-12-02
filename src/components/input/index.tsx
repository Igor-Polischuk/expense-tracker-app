import * as React from 'react';


import styles from './Input.module.scss'

interface InputProps {
    name: string
    label: string
    type: string,
    refprop?: React.LegacyRef<HTMLInputElement>
    [x:string]: any;
}

const Input: React.FC<InputProps> = ({name, label, type, refprop, ...props}) => {

    return (
        <div className={styles.input_wrapper}>
            <label htmlFor="password">{label}</label>
            <input {...props} ref={refprop} type={type} name={name} id={name} placeholder={label} />
        </div>
    );
}

export default Input;