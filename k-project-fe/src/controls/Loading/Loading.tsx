import './Loading.scss';
import LoginImage from '../assets/images/signup-image.jpg';
import { TextField } from '@mui/material';
import { faCheck, faKey, faTruckLoading, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
type LoadingProps = {
    isLoading: boolean
}
const Loading = ({ isLoading }: LoadingProps) => {
    useEffect(() => {
        var component = document.getElementById('loading-component');
        if (component == null) return;
        else
            component.style.display = isLoading ? 'flex' : 'none';
    }, [isLoading])
    return (
        <div className="loading-component" id="loading-component">
            <div className='loading-container'>
                <div className='loading-item loading-icon'>
                    <div className='loading-icon-box'>
                    </div>
                </div>
                <div className='loading-item loading-title'>Loading...</div>
            </div>
        </div>
        //     <div className="loader">
        //     <span></span>
        //     <span></span>
        //     <span></span>
        // </div>
    );
}
export default Loading;
