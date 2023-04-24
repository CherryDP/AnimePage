import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/HomePage';
import AnimeDetails from './components/AnimeDetailsPage';
import Header from './components/NavigationPage';
import Filter from './components/Filters';
import GenreAnimeList from './components/Genre';
import Home_Manga from './components/HomePageManga';
import MangaDetails from './components/MangaDetails';
import GenreMangaList from './components/MangaGenre';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/anime/:id" component={AnimeDetails} />
        <Route path="/Filters" component={Filter} />
        <Route path="/genre/:genreId" component={GenreAnimeList} />
        <Route path="/HomePageManga" component={Home_Manga} />
        <Route path="/manga/:id" component={MangaDetails} />
        <Route path="/MangaGenre/:genreId" component={GenreMangaList}/>
      </Switch>
    </Router>
  );
}

export default App;