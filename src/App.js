import { Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Header from './Components/Header/index';
import Breadcrumb from './Components/Breadcrumb/index';
import ItemsList from './Components/Items/List/index';
import ItemDetail from './Components/Items/Detail/index';
import { Provider } from 'react-redux';
import { store } from './state/store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="root">
          <AppBar position="absolute" className="header">
            <Toolbar className="toolbar">
              <Header />
            </Toolbar>
          </AppBar>
          <main className="content">
            <Container className="container">
              <Breadcrumb />
              <Route path="/items" exact component={ItemsList} />
              <Route path="/items/:id" component={ItemDetail} />
            </Container>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
