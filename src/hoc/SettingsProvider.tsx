import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface SettingsProviderProps {
    children: JSX.Element
}

interface ValueI{
    darkTheme: boolean
    setDarkTheme: (theme: boolean) => void
}

const defaultValue = {
    darkTheme: false,
    setDarkTheme: (isDark: boolean) => undefined,
}

export const SettingsContext = React.createContext<ValueI>(defaultValue)

const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
    const isUserDark = (window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [darkTheme, setDarkTheme] = useLocalStorage<boolean>('darkTheme', isUserDark);
    // const [darkTheme, setDarkTheme] = React.useState<boolean>(false);
    React.useEffect(() => {
        document.body.dataset.theme = darkTheme ? 'dark' : 'light'
    }, [darkTheme])

    const value = {darkTheme, setDarkTheme}

    return <SettingsContext.Provider value={value}>
        {children}
    </SettingsContext.Provider>
}

export default SettingsProvider;