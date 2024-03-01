import './NavBar.css';
import { Link } from "react-router-dom";
import logo from '../../static-images/steamdb.png'


export default function NavBar() {
  return (
    <>
        <nav>
          <ul id='nav-ul'>
            <li>
              <Link to={`/`}>
                <img src={logo} alt='website logo'/>
              </Link>
            </li>
            <li>
              <Link to={`/search`}> Search </Link>
            </li>
            <li>
              <Link to={`/TODO`}> Lists </Link>
            </li>
            <li>
              <Link to={`/TODO`}> Profile </Link>
            </li>
          </ul>
        </nav>
    </>
  )
}
