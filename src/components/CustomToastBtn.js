import React from 'react';
import { toast } from 'react-toastify';

const CustomToastBtn = () => {
  const closeToast = () => {
    document.querySelector(".mainContainer").style.pointerEvents = "all";
    toast.dismiss();
  }
 
  return (
    <button className='closeToastBtn' onClick={closeToast}>Ok</button>
  )
}

export default CustomToastBtn