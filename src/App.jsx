import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import './App.css';
import PaginaInicio from "./paginas/Inicio.pagina";
import PaginaFavoritos from "./paginas/Favoritos.pagina";
import PaginaDetalle from "./paginas/Detalle.pagina";
import Encabezado from "./componentes/layout/encabezado.componente";
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Encabezado />
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="favoritos" element={<PaginaFavoritos />} />
          <Route path="detalle/:characterId" element={<PaginaDetalle />} />
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
