import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  //State del formulario

  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const { ciudad, pais } = busqueda;

  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({});

  const [error, guardarError] = useState(false);

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "9af9dbb54b1bcb40efaf35981e6826e4";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        
        guardarError(resultado.cod === "404");
        guardarResultado(resultado);
        guardarConsultar(false);

        //Verificar resultados correctos
      }
    };
    consultarAPI();
    //eslint-disable-next-line
  }, [consultar]);

  //let componente;

  // if (error) {
  //   componente = <Error mensaje="No hay resultados" />;
  // } else {
  //   componente = <Clima resultado={resultado} />;
  // }

  return (
    <Fragment>
      <Header titulo="Clima React App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {error ? (
                <Error mensaje="La ciudad no es correcta" />
              ) : (
                <Clima resultado={resultado} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
