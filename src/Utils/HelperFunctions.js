import { toast } from "react-toastify";

export const notify = (theme, msg)=> {
    return toast[theme](msg, {
        position: "bottom-right",
         autoClose: 3000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "light",
         
     });
 }