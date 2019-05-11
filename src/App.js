import React from 'react';
import './App.css';
import Header from './Header/Header'
import Homepage from './homepage/homepage';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import SearchResult from './search/SearchResult';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Route component={Header}/>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/SearchResult" component={SearchResult} />
        </div>
      </Router>
    </div>
  );
}

export default App;
