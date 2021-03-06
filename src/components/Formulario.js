import React, {useState}from "react";

const Formulario = ({busqueda, guardarBusqueda,guardarConsultar}) => {



    const [error,guardarError] = useState(false);

    //Extraer ciudad y pais
    const {ciudad, pais } =busqueda;


    //Leyendo el formulario
    const handleChange = e =>{
        //Actualizar el estate
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e =>{
        e.preventDefault();

        //Validar 
        if (ciudad.trim()===''|| pais.trim()==='') {
            guardarError(true);
            return;
        }

        guardarError(false);

        //Pasar al componente principal

        guardarConsultar(true);

    }

  return (
    <form onSubmit={handleSubmit}>
        {error ? <p className="red darken-4 error">Todos los campos son obligatorios</p> : null}
      <div className="input-field col s12">
        <input type="text" name="ciudad" id="ciudad" value={ciudad} onChange={handleChange}/>
        <label htmlFor="ciudad">Ciudad:</label>
      </div>

      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">-- Seleccione un pais --</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="US">Estados Unidos</option>
          <option value="ES">España</option>
          <option value="MX">México</option>
          <option value="NI">Nicaragua</option>
          <option value="PE">Perú</option>
        </select>

        <label htmlFor="pais">Pais:</label>
      </div>

      <div className="input-field col s12">
          <input type="submit" value="Buscar datos" className="waves-effect waves-light btn-large btn-block yellow accent-4"/>
      </div>
    </form>
  );
};

export default Formulario;
