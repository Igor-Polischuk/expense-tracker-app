import * as React from 'react';
import Portal from "../../PortalModal";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './Modal.module.scss';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { closeModal } from '../../../redux/slices/modalSlice';

interface ModalProps {
    children: JSX.Element,
    title: string
    open: boolean
}

const Modal: React.FC<ModalProps> = ({ children, title, open }) => {
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        if(open){
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    })
    if (!open) return null;
    
    return (
        <Portal id="modal">
            <div className={`${styles.modal} modal_overlay`} onClick={(e: React.MouseEvent) => {
                if ((e.target as HTMLDivElement).classList.contains('modal_overlay')) {
                    dispatch(closeModal())
                }

            }}>
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <h2>{title}</h2>
                        <AiOutlineCloseCircle fontSize={22} cursor='pointer' onClick={() => dispatch(closeModal())} />
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
}

export default Modal;