import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './ButtonWithIcon.scss';
import { ReactNode } from 'react';
type SimpleButtonProps = {
  children?: ReactNode;
  onClick?: () => void;
  className?: any;
}
const SimpleButton = ({ children, onClick, className }: SimpleButtonProps) => {
  return (
    <div className={className ? className + ' button-box' : 'button-box'} onClick={onClick} onTouchStart={onClick}>
      <span>{children}</span>
    </div>
  );
}

export default SimpleButton;