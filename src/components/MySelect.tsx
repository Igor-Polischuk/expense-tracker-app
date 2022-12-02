import Select, { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import * as React from 'react';

interface Option {
    value: string,
    label: string,

}

interface MySelectProps {
    options: Option[]
    defaultValue: Option
    title?: string
    type: string //transparent , filled
    outline?: boolean
    isSearchable?: boolean
    underline?: boolean
    onChange?: (value: Option) => void
}

const MySelect: React.FC<MySelectProps> = ({ options, defaultValue, title, type, onChange, underline=false, isSearchable = false, outline = false }) => {

    const filledStyles: StylesConfig = {
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: (outline) ? 40 : 10,
            background: !outline ? 'var(--accent-color)' : 'transparent',
            color: !outline ? '#fff' : 'var(--f-color)',
            padding: '2px',
            border: outline ? '1px solid var(--accent-color)' : '0',
            boxShadow: 'none'
        }),

        singleValue: (baseStyles) => ({
            ...baseStyles,
            textAlign: 'center',
            color: outline ? '1px solid var(--accent-color)' : '0',
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: !outline ? '#fff' : 'var(--f-color)',
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            padding: '0'
        }),
        option: (baseStyles) => ({
            ...baseStyles,
            background: '#fff',
            color: '#000',
        }),
    }

    const transparentStyles: StylesConfig = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            background: 'rgba(0, 0, 0, 0)',
            color: 'var(--f-color)',
            border: '0',
            boxShadow: 'none'
        }),
        valueContainer: (baseStyles, state) => ({
            ...baseStyles,
            padding: '0'
        }),
        dropdownIndicator: (baseStyles, state) => ({
            ...baseStyles,
            padding: '0',
            color: 'var(--f-color)',
        }),
        indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            display: 'none'
        }),
        singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: 'var(--f-color)',
            fontWeight: 'bold',
            textDecoration: underline ? 'underline' : 'none',
        }),
        placeholder: (baseStyles, state) => ({
            ...baseStyles,
            fontWeight: 'normal',
            textDecoration: underline ? 'underline' : 'none',
        }),
        menuList: (baseStyles, state) => ({
            ...baseStyles,
            background: 'var(--main-color)',
            color: 'var(--f-color)',
            width: 'fit-content'
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            background: state.isSelected ? 'var(--accent-color)' : 'var(--main-color)',
            width: 'fit-content'

        }),
    }

    const currentTypeStyle = type === 'transparent' ? transparentStyles : filledStyles

    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '5px' }}>
            {!!title && <span>{title}</span>}
            <Select options={options} onChange={(value) => onChange?.(value as Option)} defaultValue={defaultValue} isSearchable={isSearchable} styles={currentTypeStyle}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: 'var(--accent-color)'
                    }
                })} />
        </div>
    )
}

export default MySelect;