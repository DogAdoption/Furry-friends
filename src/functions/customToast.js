import CustomToastBtn from '../components/CustomToastBtn';

export const customToast = (toastType, message) => {
    document.querySelector('.mainContainer').style.pointerEvents = "none"
    
    return toastType(message, {
        closeButton: <CustomToastBtn />,
        autoClose: false,
    });
}