import './App.css';
import Home from './components/Home';
import EventsListing from './components/EventsListing';
import EventDetails from './components/EventDetails';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import CollectorContextProvider from './components/CollectorContext';
import Collectors from './components/Collectors';


function App() {
  return (
    <CollectorContextProvider>
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the Marvel Universe</h1>
          <nav>
            <Link className="navlink" to="/">
              Home
            </Link>
            <Link className="navlink" to="/marvel-characters/page/1">
              Characters
            </Link>
            <Link className="navlink" to="/collectors">
              Collections
            </Link>
          </nav>
        </header>
        <br />
        <div className="App-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/marvel-characters/page/:pageNum"
              element={<EventsListing />}
            />
            <Route path="/character/:id" element={<EventDetails />} />
            <Route path="/collectors" element={<Collectors />} />

          </Routes>
        </div>
      </div>
    </Router>
    </CollectorContextProvider>
  );
}

export default App;
