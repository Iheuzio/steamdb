import './NavBar.css';
import { Link } from "react-router-dom";
import logo from '../../static-images/steamdb.png'
import { Trans, useTranslation } from 'react-i18next';


export default function NavBar() {

  const {t, i18n} = useTranslation()

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

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
                <Link className='link' to={`/search`}>
                  <Trans i18nKey="navbar.search"></Trans>
                </Link>
              </li>
              <li>
                <Link className='link' to={`/lists`}> Lists </Link>
              </li>
              <li>
                <Link className='link' to={`/profile`}> Profile </Link>
              </li>
            </div>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('de')}>DE</button>
          </ul>
        </nav>
    </>
  )
}
