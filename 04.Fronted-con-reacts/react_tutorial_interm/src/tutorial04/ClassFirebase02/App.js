import "./App.css";

function App() {
  return (
    <div className="App">
      hola <p>{process.env.REACT_APP_SALUDOS}</p>
    </div>
  );
}

export default App;
