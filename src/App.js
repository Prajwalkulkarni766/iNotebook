import { useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationalMenu from './Components/NavigationalMenu';
import Home from './Components/Home';
import NoteState from './Contexts/notes/NoteState';
import SendAlert from './Components/SendAlert';
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (variant, description) => {
    setAlert({
      alertVariant: variant,
      alertDescription: description
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavigationalMenu />
          <div style={{ height: "60px" }}>
            <SendAlert alert={alert} />
          </div>
          <div className='container'>
            <Routes>
              <Route exact
                path="/"
                element={
                  <Login showAlert={showAlert} />
                }></Route>
              <Route exact
                path="/home"
                element={
                  <Home showAlert={showAlert} />
                }></Route>
              <Route exact
                path="/signup"
                element={
                  <Signup showAlert={showAlert} />
                }></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
