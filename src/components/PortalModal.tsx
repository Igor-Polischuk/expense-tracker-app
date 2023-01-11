import { createPortal } from "react-dom";
import * as React from 'react';

interface ModalPortalProps {
    children: JSX.Element
    id: string
}

const createElementAndInsert = (id: string) => {
    const newDomElement = document.createElement('div');
    newDomElement.id = id
    document.body.insertAdjacentElement('beforeend', newDomElement);
    return newDomElement;
}

const Portal: React.FC<ModalPortalProps> = ({ children, id }) => {
    const [wrapper, setWrapper] = React.useState<HTMLElement | null>(null)
    let alreadyExist = false;
    React.useLayoutEffect(() => {
        let element = document.getElementById(id);
        if (!element) {
            element = createElementAndInsert(id);
            alreadyExist = true
        }
        setWrapper(element);

        return () => {
            if (alreadyExist && element?.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
    }, [id])

    return wrapper ? createPortal(children, wrapper) : null;
}

export default Portal;