import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './TextFieldWithIcon.scss';
import { useEffect } from 'react';
type TextFieldWithIconProps = {
  icon: any;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
}
const TextFieldWithIcon = ({ icon, placeholder, value, onChange }: TextFieldWithIconProps) => {

  const handleChange = (e: any) => {
    onChange(e.target.value);
  }

  return (
    <div className='text-field-box'>
      <FontAwesomeIcon className='text-field-icon' icon={icon} />
      <input className='text-field-input' type="text" placeholder={placeholder} value={value} onChange={(e: any) => handleChange(e)} />
    </div>
  );
}

export default TextFieldWithIcon;