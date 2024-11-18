import { Link, NavLink } from 'react-router-dom';
import LogoS from '../../Pictures/Samuel.png';
import LogoC from '../../Pictures/Clarke.png';
import LogoQ from '../../Pictures/Quy.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faHome, faEnvelope, faCircleUser, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => (
  <div className="flex flex-col items-center bg-gray-900 text-gray-100 w-20 h-screen fixed left-0 md:w-24 lg:w-28">
    <Link to="/" className="my-4">
      <div className="flex flex-col items-center">
        <img
          src={LogoS}
          alt="Logo S"
          className="flex w-8 h-6 md:w-12 md:h-8 lg:w-14 lg:h-10 mb-2"
        />
        <img
          src={LogoC}
          alt="Logo C"
          className="flex w-8 h-6 md:w-12 md:h-8 lg:w-14 lg:h-10 mb-2"
        />
        <img
          src={LogoQ}
          alt="Logo Q"
          className="flex w-8 h- md:w-12 md:h- lg:w-14 lg:h-10"
        />
      </div>
    </Link>

    <nav className="flex flex-col gap-10 mt-8">
      <NavLink
        exact="true"
        className={({ isActive }) =>
          `text-gray-400 hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
        }
        to="/"
      >
        <FontAwesomeIcon
          icon={faLandmark}
          className="flex text-2xl md:text-5xl lg:text-4xl"
        />
      </NavLink>

      <NavLink
        exact="true"
        className={({ isActive }) =>
          `text-gray-400 hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
        }
        to="/home"
      >
        <FontAwesomeIcon
          icon={faHome}
          className="flex text-2xl md:text-5xl lg:text-4xl"
        />
      </NavLink>

      <NavLink
        exact="true"
        className={({ isActive }) =>
          `text-gray-400 hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
        }
        to="/about"
      >
        <FontAwesomeIcon
          icon={faCircleUser}
          className="flex text-2xl md:text-5xl lg:text-4xl"
        />
      </NavLink>

      <NavLink
        exact="true"
        className={({ isActive }) =>
          `text-gray-400 hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
        }
        to="/projects"
      >
        <FontAwesomeIcon
          icon={faCode}
          className="flex text-2xl md:text-5xl lg:text-4xl"
        />
      </NavLink>

      <NavLink
        exact="true"
        className={({ isActive }) =>
          `text-gray-400 hover:text-yellow-300 ${isActive ? 'text-yellow-300' : ''}`
        }
        to="/contact"
      >
        <FontAwesomeIcon
          icon={faEnvelope}
          className="flex text-2xl md:text-5xl lg:text-4xl"
        />
      </NavLink>
    </nav>

    <ul className="flex flex-col items-center gap-4 mt-auto mb-8">
      <li>
        <a
          href="https://www.linkedin.com/in/samuelclarke-quy/"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-yellow-300"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            className="text-lg md:text-5xl lg:text-4xl"
          />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/samcq2"
          target="_blank"
          rel="noreferrer"
          className="text-gray-400 hover:text-yellow-300"
        >
          <FontAwesomeIcon
            icon={faGithub}
            className="text-lg md:text-5xl lg:text-4xl"
          />
        </a>
      </li>
    </ul>
  </div>
);

export default Sidebar;