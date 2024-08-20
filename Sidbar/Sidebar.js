import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoS from '../../assets/images/Samuel.png'
import LogoC from '../../assets/images/Clarke.png'
import LogoQ from '../../assets/images/Quy.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import { faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => (
  <div className='nav-bar'>
    <Link className='logo' to='\'>
      <img src={LogoS} alt="logo" className="sub-logo"/>
      
      <img src={LogoC} alt="logo" className="sub-logo2"/>
      <img src={LogoQ} alt="logo" className="sub-logo3"/>
    </Link>
    <nav>
        <NavLink exact="true" activeclassname="active" to="/">
            <FontAwesomeIcon icon={faHome} color="#4d4d4e" />

        </NavLink>
        <NavLink exact={true} activeclassname="active" className="projects-link" to="/projects">
            <FontAwesomeIcon icon={faCode} color="#4d4d4e" />

        </NavLink>
        <NavLink exact="true" activeclassname="active" className="contact-link" to="/contact">
            <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />

        </NavLink>
    </nav>
    <ul>
      <li>
        <a target="_blank" rel='noreferrer' href='https://www.linkedin.com/in/samuelclarke-quy/'>
          <FontAwesomeIcon icon={faLinkedin} color="#4d4d43" />
        </a>
      </li>

      <li>
        <a target="_blank" rel='noreferrer' href='https://github.com/samcq2'>
          <FontAwesomeIcon icon={faGithub} color="#4d4d43" />
        </a>
      </li>
    </ul>

  </div>
)

export default Sidebar