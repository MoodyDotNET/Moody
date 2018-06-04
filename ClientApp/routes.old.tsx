import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MoodyHomeBody } from './components/home/MoodyHomeBody';
import { UserDashboard } from './components/user/UserDashboard';
<<<<<<< HEAD
import {SongsList} from './components/Songs/SongsList';
=======
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
>>>>>>> 9a9b6ac8246392594094438ed713ae58e799a20d

export const routes = (
    <Layout>
        <Route exact path='/' component={ MoodyHomeBody } />
        <Route path='/counter' component={ Counter } />
        <Route path='/fetchdata' component={ FetchData } />
        <Route path='/home' component={ Home }/>
        <Route path='/user' component={ UserDashboard }/>
<<<<<<< HEAD
        <Route path='/songs' component={ SongsList }/>
=======
        <Route exact path='/admin' component={ AdminDashboard }/>
        <Route path='/admin/login' component={ AdminLogin }/>
>>>>>>> 9a9b6ac8246392594094438ed713ae58e799a20d
    </Layout>
);
