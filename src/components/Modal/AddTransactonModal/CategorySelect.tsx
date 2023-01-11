import * as React from 'react';
import Select, { Options, StylesConfig } from 'react-select';
import getCategory from '../../../utils/category';

interface CategorySelectProps {
    type: string
    onSelect: (value: { value: string, label: string }) => void
    valid?: boolean
}

interface OptionI {
    value: string
    label: string
}

export const CategorySelect: React.FC<CategorySelectProps> = ({ type, onSelect, valid = true}) => {

    const selectStyles: StylesConfig = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            background: 'transparent',
            border: '0',
            boxShadow: 'none',
            borderRadius: '0px',
            borderBottom: valid ? '1px solid var(--accent-color)' : '1px solid var(--red)',
            "&:hover": {

            }
        }),
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            textTransform: 'capitalize'
        }),
        singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: 'var(--f-color)'
        }),
        indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            display: 'none'
        }),
        menuList: (baseStyles, state) => ({
            ...baseStyles,
            background: 'var(--main-color)',
            color: 'var(--f-color)'
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            transition: '0.1s',
            background: state.isSelected ? 'var(--accent-color)' : '',
            "&:hover": {
                color: '#fff',
                background: 'var(--accent-color)'
            }
        })
    }
    let cats;
    const prevType = React.useRef(type)
    const [currentCat, setCurrentCat] = React.useState<OptionI | ''>('');
    React.useEffect(() => {
        setCurrentCat('');
    }, [type])

    if (type === 'expense') {
        cats = getCategory().expense;
    } else {
        cats = getCategory().income;
    }
    const group = cats.map(cat => ({ label: cat.title, options: cat.categories.map(item => ({ label: item, value: item })) }))
    return (
        <Select onChange={newValue => {
            onSelect(newValue as OptionI);
            setCurrentCat(newValue as OptionI);
        }}
            value={currentCat}
            options={group}
            menuPlacement="top"
            placeholder='category'
            styles={selectStyles} />
    );
};