import logo from './logo.svg';
import './App.css';
import Saludar from './components/Saludar';

function App() {

  //const userName = 'Maty';
  //const userAge = '26';

  const user = {
    nombre: 'Matute',
    edad: '21',
    color: 'Red'
  }

  const saludarFN = (name) =>{
    console.log("hola " + name);
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <Saludar userInfo={user} saludarFN={saludarFN}/>
      </header>
    </div>
  );
}

export default App;
