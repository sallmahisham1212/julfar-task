import MapEsri from './components/MapEsri/MapEsri.jsx'
import './App.css';
import { setAssetPath } from "@esri/calcite-components/dist/components";
// CDN hosted assets
setAssetPath("https://js.arcgis.com/calcite-components/2.7.1/assets");

function App() {
  return (

    <div className="App">
      <MapEsri />
    </div>
  );
}

export default App;
