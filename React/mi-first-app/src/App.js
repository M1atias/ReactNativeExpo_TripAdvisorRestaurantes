import logo from './logo.svg';
import './App.css';
import Saludar from './components/Saludar';
import {useState, useEffect} from 'react';

function App() {

  const [stateCar, setStateCar] = useState(false);
  const [contar, setContar] = useState(0);

  useEffect(() => {
    console.log('Total: ' + contar);
  }, [contar])
  

  const encenderApagar = () =>{
    //setStateCar(!stateCar);

    setStateCar(prevValue => !prevValue);
    setContar(contar+1);
  }
  //const userName = 'Maty';
  //const userAge = '26';

  const user = {
    nombre: 'Matute',
    edad: '21',
    color: 'Red'
  }

  const saludarFN = (name, edad) =>{
    console.log(`Hola ${name}, tiene ${edad} años`)
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>El coche esta: {stateCar ? 'Encendido' : ' Apagado'}</h3>
        <h4>Clicks: {contar} </h4>
        <button onClick={encenderApagar}>Encender/ Apagar</button>
        <Saludar userInfo={user} saludarFN={saludarFN}/>
      </header>
    </div>
  );
}

export default App;
