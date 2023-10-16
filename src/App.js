import Navbar from "./components/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DjangoForm from "./components/DjangoForm.jsx";
import DeployDjangoDocs from "./components/DeployDjangoDocs.jsx";
import ReactJsForm from "./components/ReactJsForm.jsx";
import DeployReactJsDocs from "./components/DeployReactJsDocs.jsx";
import Home from "./components/Home.jsx";


function App() {
  return (
    <>
    <Router>
      <Navbar />

     <div className="container">
     <Routes>
      <Route path="/" exact element={ <Home />}/>
      <Route path="/django" exact element={ <DjangoForm />}/>
      <Route path="/deploy-django-docs" exact element={ <DeployDjangoDocs />}/>
      <Route path="/react" exact element={ <ReactJsForm />}/>
      <Route path="/deploy-react-docs" exact element={ <DeployReactJsDocs />}/>
      </Routes>
     </div>



    </Router>
    </>
  );
}

export default App;
