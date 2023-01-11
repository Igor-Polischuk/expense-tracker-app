import { useAppSelector } from '../../../hooks/redux-hooks';
import Modal from '../ModalContainer';

export const AddPaymentsModal = () => {
    const isOpen = useAppSelector(state => state.modal.showAddPaymentsMethodModal);
    
    return (
        <Modal title='Add payments method' open={isOpen}>
            <div>
                <p>Add new payments method</p> 
            </div>
        </Modal>
    );
};