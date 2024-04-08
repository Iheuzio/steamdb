import './App.css';
import HorizontalScroller from './components/main/HorizontalScroller';
import Recaptcha from './components/Recaptcha';

// import Navbar from './components/NavBar';
// import Homepage from './components/Homepage';
// import SearchPage from './components/search/SearchPage'

function App() {
  return (
    <div className="App">
      {/* <Navbar />
      <Homepage /> */}
      {/* <SearchPage /> */}
      <Recaptcha />
      <HorizontalScroller />
    </div>
  );
}

export default App;

