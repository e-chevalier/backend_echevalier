
import { React } from "../config/deps.ts";

const App = () => {

    return (
    <div>
        <form id="fcolor">
            <input id="finput" type="text" name="color"/>
            <button>Submit</button>
        </form>    
      <h3>
        Colores ingresados.
      </h3>
    
      <div id="listColors"></div>
        
      
    </div>
  );
};

export default App;