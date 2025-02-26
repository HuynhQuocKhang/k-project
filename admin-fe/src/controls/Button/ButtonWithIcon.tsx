import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './ButtonWithIcon.scss';
import { ReactNode } from 'react';
type ButtonWithIconProps = {
  icon: any;
  children?: ReactNode;
  onClick?: () => void;
}
const ButtonWithIcon = ({ icon, children, onClick }: ButtonWithIconProps) => {
  return (
    <div className='button-box' onClick={onClick}>
      <FontAwesomeIcon className='button-icon' icon={icon} />
      <span className='button-text'>{children}</span>
    </div>
  );
}

export default ButtonWithIcon;