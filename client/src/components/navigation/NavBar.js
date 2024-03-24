import './NavBar.css';
import { Link } from "react-router-dom";
import logo from '../../static-images/steamdb.png'


export default function NavBar() {
  return (
    <>
        <nav>
          <ul id='nav-ul'>
            <li>
              <Link className='logo' to={`/`}>
                <img src={logo} alt='website logo'/>
              </Link>
            </li>
            <div id = 'nav-nonlogo'>
              <li>
                <Link className='link' to={`/search`}> Search </Link>
              </li>
              <li>
                <Link className='link' to={`/lists`}> Lists </Link>
              </li>
              <li>
                <Link className='link' to={`/profile`}> Profile </Link>
              </li>
            </div>
          </ul>
        </nav>
    </>
  )
}
