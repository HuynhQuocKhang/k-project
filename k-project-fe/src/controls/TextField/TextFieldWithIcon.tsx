import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './TextFieldWithIcon.scss';
type TextFieldWithIconProps = {
  icon: any;
  placeholder: string;
  value: string;
}
const TextFieldWithIcon = ({ icon, placeholder, value }: TextFieldWithIconProps) => {
  return (
    <div className='text-field-box'>
      <FontAwesomeIcon className='text-field-icon' icon={icon} />
      <input className='text-field-input' type="text" placeholder={placeholder} value={value} />
    </div>
  );
}

export default TextFieldWithIcon;