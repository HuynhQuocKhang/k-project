import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCheckCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import './FlashPopup.scss';

import { useEffect } from 'react';
type ToastProps = {
    type: "success" | "warning" | "error" | "info";
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
    message: string;
    showPopup?: boolean;
    onClose?: () => void; // Added onClose prop,
    id?: any,
}
const FlashPopup = ({ type = "success", message, showPopup, position = "bottom-right", id }: ToastProps) => {
    useEffect(() => {
        if (showPopup) {
            changePosition();
            changeType();
            var component = document.getElementById('flash-popup-component-' + id);
            if (component == null) return;
            else {
                component.style.display = showPopup ? 'flex' : 'none';
                component.style.bottom = id + "px";
                for (var index = 0; index < id; index = index + 28) {
                    var blurItem = document.getElementById('flash-popup-component-' + index);
                    if (blurItem)
                        blurItem.style.filter = "blur(1px)";
                }
            }
        }
        else {
            var listHtml = document.getElementsByClassName('flash-popup-component');
            if (listHtml.length > 0) {
                for (var item = 0; item < listHtml.length; item++) {
                    var itemHtml = listHtml[item] as HTMLElement;

                    // Get the current bottom value (removing 'px' and converting to number)
                    let currentBottom = parseInt(itemHtml.style.bottom) || 0;
                    if (currentBottom > 0)
                        // Subtract 28px and update the bottom value
                        itemHtml.style.bottom = `${currentBottom - 28}px`;
                }
            }
        }
    }, [showPopup])

    const textTruncate = (text: string) => {
        var messageTitle = document.getElementById("flash-popup-text");
        if (messageTitle != null)
            messageTitle.title = text;
        if (text.length > 40)
            return text.substring(0, 40) + " ...";
        else
            return text;
    }

    const changePosition = () => {
        var component = document.getElementById("flash-popup-component");
        if (component != null) {
            component.className = "flash-popup-component " + position;
        }
    }

    const changeType = () => {
        const colorValue = getComputedStyle(document.documentElement).getPropertyValue(`--${type}-color`);
        document.documentElement.style.setProperty('--success-color', colorValue);
    }
    return (
        <div id={"flash-popup-component-" + id} className="flash-popup-component bottom-right">
            <div className="flash-popup-background">
            </div>
            <div className='flash-popup-content'>
                <FontAwesomeIcon icon={faCheck} className='flash-popup-icon' />
                <div className='flash-popup-message'>
                    <div className='flash-popup-title'>{type.toUpperCase()}</div>
                    <div id="flash-popup-text" className='flash-popup-text'>{textTruncate(message)}</div>
                </div>
            </div>
            <div className='corner-icon'>
                <FontAwesomeIcon icon={faCheck} className='flash-popup-icon' />
            </div>
        </div>
    );
}

export default FlashPopup;