import { faCheck, faInfo, faWarning, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export const showToast = (type: 'success' | 'error' | 'warning' | 'info', msg: string) => {
    switch (type) {
        case 'success':
            toast.success(msg, {
                position: "bottom-right",
                className: 'toast-success',
                icon: ({ theme, type }) => <FontAwesomeIcon icon={faCheck} className="icon-fontawesome" size={'lg'} />,
            });
            break;
        case 'error':
            toast.error(msg, {
                position: "bottom-right",
                className: 'toast-error',
                icon: ({ theme, type }) => <FontAwesomeIcon icon={faXmark} className="icon-fontawesome" size={'lg'} />,
            });
            break;
        case 'warning':
            toast.warning(msg, {
                position: "bottom-right",
                className: 'toast-warning',
                icon: ({ theme, type }) => <FontAwesomeIcon icon={faWarning} className="icon-fontawesome" size={'lg'} />,
            });
            break;
        case 'info':
            toast.info(msg, {
                position: "bottom-right",
                className: 'toast-info',
                icon: ({ theme, type }) => <FontAwesomeIcon icon={faInfo} className="icon-fontawesome" size={'lg'} />,
            });
            break;
    }
}