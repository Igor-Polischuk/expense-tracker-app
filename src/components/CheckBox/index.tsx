import * as React from 'react';


import styles from './CheckBox.module.scss';

interface CheckBox {
    label: string
    id: string
}

const CheckBox: React.FC<CheckBox> = ({label, id}) => {
    return (
        <div className={styles.checkbox}>
            <label className={styles.custom__checkbox} htmlFor={id}>
                <input type="checkbox" id={id} />
                <span className={styles.checkmark}></span>
            </label>
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default CheckBox;