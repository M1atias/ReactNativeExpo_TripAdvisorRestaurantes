import logo from './logo.svg';
import './App.css';
import Saludar from './components/Saludar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Saludar name='Maty' age='22'/>
        <Saludar name='Matute' age='21'/>
      </header>
    </div>
  );
}

export default App;
