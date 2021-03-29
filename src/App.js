import { Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Header from './Components/Header/index';
import ContainerCard from './Components/ContainerCard/index';
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
            <Route path="/" exact component={ContainerCard} />
            {/* <Route path="/items" component={Autorizacion} /> */}
          </Container>
        </main>
      </div>
    </div>
  );
}

export default App;
