import { Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Header from './Components/Header/index';
import ItemsList from './Components/Items/List/index';
import ItemDetail from './Components/Items/Detail/index';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="root">
        <AppBar position="absolute" className="header">
          <Toolbar className="toolbar">
            <Header />
          </Toolbar>
        </AppBar>
        <main className="content">
          <Container className="container">
            <Route path="/items" exact component={ItemsList} />
            <Route path="/items/:id" component={ItemDetail} />
          </Container>
        </main>
      </div>
    </div>
  );
}

export default App;
