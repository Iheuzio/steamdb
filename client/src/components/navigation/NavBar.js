import './NavBar.css';
import { Link } from "react-router-dom";
import logo from '../../static-images/steamdb.png'
import { Trans, useTranslation } from 'react-i18next';


export default function NavBar({setLang=''}) {

  const {t, i18n} = useTranslation();

  const changeLanguage = (language) => {
    //check if setLang was defined, if yes, setLanguage for details page translation
    if(setLang !== ''){
      setLang(language);
    }
    localStorage.setItem("currentLang", JSON.stringify(language))
    i18n.changeLanguage(language);
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
                <Link className='link' to={`/lists`}>
                  <Trans i18nKey="navbar.lists"></Trans> 
                </Link>
              </li>
              <li>
                <Link className='link' to={`/profile`}>
                  <Trans i18nKey="navbar.profile"></Trans>
                </Link>
              </li>
            </div>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('de')}>DE</button>
          </ul>
        </nav>
    </>
  )
}
