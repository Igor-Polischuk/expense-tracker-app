
import * as React from 'react';

interface ContainerProps {
    children: JSX.Element
}

export const Container: React.FC<ContainerProps> = ({children}) => {
    const styles: React.CSSProperties={
        width: '95%',
        margin: '0 auto',
        padding: '0 10px',
        height: '100%',
    }

    return (
        <div style={styles}>
            {children}
        </div>
    );
};