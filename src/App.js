import {Switch, Route,Redirect} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Jobs from './components/Jobs';
import JobItemDetails from './components/JobItemDetails';
import NotFoundRoute from './components/NotFoundRoute';
import './App.css';

const App =  ()  => (
      <Switch>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/" component={Home} />
        <Route exact path="/jobs" component={Jobs} />
        <Route exact path="/jobs/:id" component={JobItemDetails} />
        <Route path="/Not-Found" component={NotFoundRoute} />
        <Redirect to="/Not-Found" />
      </Switch>
 )

export default App
