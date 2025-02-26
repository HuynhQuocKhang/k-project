import { faFacebook, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './SocialPlatform.scss';
const SocialPlatform = () => {
  return (
    <>
      <div className="social-container mt-3 mb-3">
        <div className="social-item" title="Log in with your Google account">
          <FontAwesomeIcon className="social-icon" icon={faGoogle}></FontAwesomeIcon>
        </div>
        <div className="social-item" title="Log in with your Facebook account">
          <FontAwesomeIcon className="social-icon" icon={faFacebook}></FontAwesomeIcon>
        </div>
        <div className="social-item" title="Log in with your GitHub account">
          <FontAwesomeIcon className="social-icon" icon={faGithub}></FontAwesomeIcon>
        </div>
      </div>
    </>
  )
};

export default SocialPlatform;