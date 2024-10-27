// FlashPopupContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import FlashPopup from '../controls/Toast/FlashPopup';

type PopupItem = {
    id: number;
    type: "success" | "warning" | "error" | "info";
    message: string;
    showPopup: boolean;
};

type FlashPopupContextType = {
    showFlashPopup: (type: "success" | "warning" | "error" | "info", message: string) => void;
};
const FlashPopupContext = createContext<FlashPopupContextType | undefined>(undefined);

// Custom hook to use the FlashPopupContext
export const useFlashPopup = () => {
    const context = useContext(FlashPopupContext);
    if (!context) {
        throw new Error("useFlashPopup must be used within a FlashPopupProvider");
    }
    return context;
};

// Provider component to wrap the app
export const FlashPopupProvider = ({ children }: { children: ReactNode }) => {
    const [popupType, setPopupType] = useState<"success" | "warning" | "error" | "info">("success");
    const [popupMessage, setPopupMessage] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false);
    let [popups, setPopups] = useState<PopupItem[]>([]);
    let nextId = 0;
    // Global showFlashPopup function
    const showFlashPopup = (type: "success" | "warning" | "error" | "info", message: string) => {
        // setPopupType(type);
        // setPopupMessage(message);
        // setShowPopup(true);

        const id = popups.length * 28; // Unique ID for each popup
        const newPopup: PopupItem = { id, type, message, showPopup: true };

        // Add the new popup to the popups array
        setPopups((prevPopups) => [...prevPopups, newPopup]);
        setTimeout(() => {
            closePopup(id);
        }, 3000);
        // var component = document.getElementById("flash-popup-component");
        // Hide the popup after 3 seconds
        // setTimeout(() => {
        //     if (component != null) {
        //         component.style.animation = 'closePopup 0.2s linear forwards';
        //     }
        // }, 3000);

        // setTimeout(() => {
        //     if (component != null) {
        //         component.style.animation = 'openPopup 0.2s linear forwards';
        //     }
        //     setShowPopup(false)
        // }, 3200);


    };
    const closePopup = (id: number) => {
        setPopups((prevPopups) =>
            prevPopups.map((popup) =>
                popup.id === id ? { ...popup, showPopup: false } : popup
            )
        );

        // Remove the popup from state after the animation (0.2s after it's hidden)
        setTimeout(() => {
             setPopups((prevPopups) =>
                prevPopups.filter((popup) => popup.id !== id)
            );
        }, 200);
    };

    return (
        <FlashPopupContext.Provider value={{ showFlashPopup }}>
            {children}
            {/* FlashPopup Component */}
            {/* <div className='background-popup'> */}
            {popups.map((popup, index) => {
                // let positionPixel = index * 28;
                // popup.id = positionPixel;
                return (
                    <FlashPopup key={popup.id} id={popup.id} type={popup.type} message={popup.message} showPopup={popup.showPopup} />
                )
            })}
            {/* </div> */}
        </FlashPopupContext.Provider>
    );
};
