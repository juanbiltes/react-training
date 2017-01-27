import React, {update} from 'react';
import DisplayTareas from './DisplayTareas';
import './App.scss';
import WarningMessage from './WarningMessage';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputTarea: '',
      tareas: [ /*{
        nombre: '',
        completada: false
      }*/],
      intentoGuardarTareaVacia: false
    };
  }

  nuevaTarea(e) {
    e.preventDefault();
    this.setState({
      inputTarea: e.target.value,
      intentoGuardarTareaVacia: false
    });
  }

  agregarTarea(e) {
    // https://facebook.github.io/react/docs/update.html
    e.preventDefault();
    if(this.state.inputTarea === '') {
      this.setState({
        intentoGuardarTareaVacia: true
      });
      return;
    }
    const nuevaTarea = {
      nombre: this.state.inputTarea,
      completada: false
    };
    const tareas = this.state.tareas.splice(0);
    tareas.push(nuevaTarea);

    this.setState({
      inputTarea: '',
      tareas: tareas
    });
  }

  completarTarea(key) {
    const tareas = this.state.tareas.slice();
    return (e) => {
      tareas[key].completada = !tareas[key].completada;
      this.setState( {
        tareas: tareas
      });
    };
  }

  render() {
    return (
      <div>
        <WarningMessage show={this.state.intentoGuardarTareaVacia} />
        <div className="app">
          <form onSubmit={this.agregarTarea.bind(this)}>
            <input type="text"
                    onChange={this.nuevaTarea.bind(this)}
                    value={this.state.inputTarea}
                    placeholder="Inserte tarea"
                    size="30"/>
            <input type="submit" value="Agregar"/>
          </form>
          <DisplayTareas tareas={this.state.tareas} completar={this.completarTarea.bind(this)}/>
        </div>
      </div>
    );
  }

}
