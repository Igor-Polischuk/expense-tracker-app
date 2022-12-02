import { HashLoader } from 'react-spinners';
import * as React from 'react';

interface LoaderProps {
    className?: 'string',
    size?: number,
    color?: string 
}

const Loader: React.FC<LoaderProps> = ({className, size = 30, color='#5921B5'}) => {
    const styles: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px 0'
    }

    return (<div style={styles} className={className}>
        <HashLoader size={size} color={color} />
    </div>)
}

export default Loader;