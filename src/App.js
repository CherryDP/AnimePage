import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/HomePage';
import AnimeDetails from './components/AnimeDetailsPage';
import Watchlist from './components/WatchlistPage';
import Header from './components/NavigationPage';
import Filter from './components/Filters';
import GenreAnimeList from './components/Genre';


function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/anime/:id" component={AnimeDetails} />
        <Route path="/WatchListPage" component={Watchlist} />
        <Route path="/Filters" component={Filter} />
        <Route path="/genre/:genreId" component={GenreAnimeList} />
      </Switch>
    </Router>
  );
}

export default App;