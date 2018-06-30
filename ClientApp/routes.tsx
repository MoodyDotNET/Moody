import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MoodyHomeBody } from './components/home/MoodyHomeBody';
import { UserDashboard } from './components/user/UserDashboard';
import {SongsList} from './components/Songs/SongsList';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { SongComponent } from './components/Songs/Song';
import { UploadFile } from './components/UploadFile';
import { AlbumsList } from './components/albums/AlbumsList';
import { AlbumComponent } from './components/albums/Album';
import { ArtistsList } from './components/artists/ArtistsList';
import { ArtistComponent } from './components/artists/Artist';
import { MemberLoginRoute } from './components/user/MemberLoginRoute';
import { PlaylistComponent } from './components/Playlist/PlaylistComponent';

export const routes = (
    <Layout>
        <Route exact path='/' component={ MoodyHomeBody } />
        <Route path='/counter' component={ Counter } />
        <Route path='/fetchdata' component={ FetchData } />
        <Route path='/login' component={ MemberLoginRoute } />
        <Route path='/home' component={ Home }/>
        <Route path='/user' component={ UserDashboard }/>
        <Route path='/songs/:searchResult' component={ SongsList }/>
        <Route path='/song/:songId' component={ SongComponent }/>
        <Route exact path='/admin' component={ AdminDashboard }/>
        <Route path='/admin/login' component={ AdminLogin }/>
        <Route path='/upload' component={ UploadFile }/>
        <Route path='/artists' component={ ArtistsList }/>
        <Route path='/artist/:id' component={ ArtistComponent }/>
        <Route path='/albums' component={ AlbumsList }/>
        <Route path='/album/:id' component={ AlbumComponent }/>
        <Route path='/playlist' component= { PlaylistComponent }/>
    </Layout>
);
