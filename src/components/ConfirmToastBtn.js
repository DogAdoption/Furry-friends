import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmToastBtn = ({deleteHandler}) => {
    const handleCancel = () => {
        toast.dismiss();
        document.querySelector('.mainContainer').style.pointerEvents = "all"
    }
    return (
        <div>
            <button className='closeToastBtn redBtn' style={{marginRight: '5px'}} onClick={deleteHandler}>Yes</button>
            <button className='closeToastBtn' onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export default ConfirmToastBtn