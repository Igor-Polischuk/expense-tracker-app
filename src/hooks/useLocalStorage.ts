import {useState, useEffect} from 'react';

function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>]{
    const [storedValue, setValue] = useState(() => {
        let currentValue: T;
        try{
            const item = window.localStorage.getItem(key);
            currentValue = (item) ? (JSON.parse(item)) : defaultValue;
        }catch(e){
            currentValue = defaultValue;
        }

        return currentValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(storedValue))
    }, [storedValue, key])


    return [storedValue, setValue];
};

export default useLocalStorage;