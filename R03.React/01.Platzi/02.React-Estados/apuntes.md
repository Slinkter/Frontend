# Curso de React.js: Manejo profesional del estado

## Tabla de contenido

-   [Curso de React.js: Manejo profesional del estado](#curso-de-reactjs-manejo-profesional-del-estado)
    -   [Tabla de contenido](#tabla-de-contenido)
    -   [Componentes](#componentes)
        -   [Componentes con funciones](#componentes-con-funciones)
        -   [Componentes con clases](#componentes-con-clases)
    -   [Estado](#estado)
        -   [Estados simples](#estados-simples)
        -   [Estados compuestos](#estados-compuestos)
    -   [useEffect](#useeffect)
        -   [Ciclo de vida de un componente](#ciclo-de-vida-de-un-componente)
    -   [Paradigmas de programación](#paradigmas-de-programación)
        -   [Imperativo](#imperativo)
        -   [Declarativo](#declarativo)
    -   [Reducer](#reducer)

---

## Componentes

Los componentes de React pueden ser creados de dos maneras: con funciones y clases.

### Componentes con funciones

Los componentes se crean con funciones de la siguiente manera:

```javascript
import React from 'react';

function FunctionComponent(props) {
  ...
  return (
    ...
  )
}
export { FunctionComponent };
```

### Componentes con clases

Los componentes se crean usando clases de javascript de la siguiente manera:

```javascript
import React from 'react';

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    ...
  }
  render() {
    return (
      ...
    );
  }
}

export { ClassComponent };
```

Los props ahora se reciben desde el constructor de la clase y dentro de la función `render()` se retorna el contenido del componente

---

## Estado

### Estados simples

Son aquellos que son definidos como se muestra abajo, son individuales y almacenan tipos de datos como number, string, boolean, etc, es decir, solo un valor con su respectivo actualizador.

```javascript
function FunctionComponent() {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(false)
  const [counter, setCounter] = React.useState(0)
  setValue('Hola')
  setError(true)
  setCounter(5)
  ...
}
```

**NOTA:** Los componentes creados a partir de clases solo pueden hacer uso de estados compuestos.

### Estados compuestos

Los estados compuestos agrupan a los estados simples en una estructura de datos, comúnmente un objeto.

```javascript
function FunctionComponent() {
    const [state, setState] = React.useState({
        value: "",
        error: false,
        counter: 0,
    });
    setState({
        ...state,
        value: "Hola",
        error: true,
        counter: 5,
    });
}
```

```javascript
import React from 'react';

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      counter: 0
    };
  }
  render(){
    this.state({
      value: 'Hola',
      error: true,
      counter: 5
    })
    ...
  }
}
```

**NOTA:** Es importante pasar las props a la clase de la cual se esta heredando, en este caso `React.Component`, desde el constructor para poder hacer uso de `this.state`.

---

## useEffect

En un componente creado a partir de una función se implementa de la siguiente manera:

```javascript
function FunctionComponent() {
  React.useEffect(() => {
    ...
  }
  }, [...])
}
```

Mientras que para un componente creado a partir de una clase tenemos que hacer uso del uso de [ciclo de vida de un componente de React](#ciclo-de-vida-de-un-componente), específicamente del método `componentDidUpdate()` el cual se ejecuta cada vez que detecte un cambio en el estado de nuestro componente:

```javascript
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    ...
  }
  componentDidUpdate() {
    ...
  }
}
```

#### Ciclo de vida de un componente

![Ciclo de vida de un componente](ciclodevida.png)

---

## Paradigmas de programación

Son formas de organizar y plantear nuestras ideas para después ser pasadas a código de programación.

### Imperativo

Consiste en escribir código de tal manera que se entienda el paso a paso de la solución implementada.

**_Ejemplo:_**

```javascript
import React from "react";

const SECURITY_CODE = "paradigma";

function UseState() {
    const [state, setState] = React.useState({
        value: "",
        error: false,
        loading: false,
        delete: false,
        confirm: false,
    });

    React.useEffect(() => {
        if (!!state.loading) {
            // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
            setTimeout(() => {
                if (state.value === SECURITY_CODE)
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        value: "",
                        confirm: true,
                    });
                else
                    setState({
                        ...state,
                        error: true,
                        loading: false,
                        value: "",
                    });
            }, 3000);
        }
    }, [state.loading]);

    if (!state.delete && !state.confirm)
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {state.error && <p>Error: Código de seguridad invalido</p>}
                {state.loading && !state.error && <p>Cargando...</p>}
                <form>
                    <input
                        placeholder="Código de seguridad"
                        value={state.value}
                        onChange={(event) =>
                            setState({ ...state, value: event.target.value })
                        }
                    />
                    <input
                        type="submit"
                        value="Comprobar"
                        onClick={(e) => {
                            e.preventDefault();
                            setState({
                                ...state,
                                loading: true,
                                error: false,
                            });
                        }}
                    />
                </form>
            </div>
        );
    else if (!state.delete && !!state.confirm)
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>¿Estás seguro que deseas eliminar UseState?</p>
                <div>
                    <button
                        type="button"
                        onClick={() => {
                            setState({
                                ...state,
                                delete: true,
                            });
                        }}
                    >
                        Por supuesto
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setState({
                                ...state,
                                confirm: false,
                            });
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    else
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Eliminado con éxito</p>
                <button
                    type="button"
                    onClick={() =>
                        setState({
                            ...state,
                            delete: false,
                            confirm: false,
                        })
                    }
                >
                    Recuperar UseState
                </button>
            </div>
        );
}

export { UseState };
```

### Declarativo

Al contrario del paradigma imperativo, este no se centra tanto en seguir un código paso a paso sino en abstraerlo en funciones y métodos con distintos fines como por ejemplo reutilizarlo.

**_Ejemplo:_**

```javascript
import React from "react";

const SECURITY_CODE = "paradigma";

function UseState() {
    const [state, setState] = React.useState({
        value: "",
        error: false,
        loading: false,
        delete: false,
        confirm: false,
    });

    const onCorrect = () => {
        setState({
            ...state,
            error: false,
            loading: false,
            value: "",
            confirm: true,
        });
    };
    const onError = () => {
        setState({
            ...state,
            error: true,
            loading: false,
            value: "",
        });
    };
    const onWrite = (newValue) => {
        setState({ ...state, value: newValue });
    };
    const onCheck = () => {
        setState({
            ...state,
            loading: true,
            error: false,
        });
    };
    const onConfirm = () => {
        setState({
            ...state,
            delete: true,
        });
    };
    const onReset = () => {
        setState({
            ...state,
            confirm: false,
            delete: false,
        });
    };

    React.useEffect(() => {
        if (!!state.loading) {
            // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
            setTimeout(() => {
                if (state.value === SECURITY_CODE) onCorrect();
                else onError();
            }, 3000);
        }
    }, [state.loading]);

    if (!state.delete && !state.confirm)
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {state.error && <p>Error: Código de seguridad invalido</p>}
                {state.loading && !state.error && <p>Cargando...</p>}
                <form>
                    <input
                        placeholder="Código de seguridad"
                        value={state.value}
                        onChange={(event) => onWrite(event.target.value)}
                    />
                    <input
                        type="submit"
                        value="Comprobar"
                        onClick={(e) => {
                            e.preventDefault();
                            onCheck();
                        }}
                    />
                </form>
            </div>
        );
    else if (!state.delete && !!state.confirm)
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>¿Estás seguro que deseas eliminar UseState?</p>
                <div>
                    <button type="button" onClick={onConfirm}>
                        Por supuesto
                    </button>
                    <button type="button" onClick={onReset}>
                        Cancelar
                    </button>
                </div>
            </div>
        );
    else
        return (
            <div>
                <h2>Eliminar UseState</h2>
                <p>Eliminado con éxito</p>
                <button type="button" onClick={onReset}>
                    Recuperar UseState
                </button>
            </div>
        );
}

export { UseState };
```

---

## Reducer

[Lee el comentario completo](https://platzi.com/comentario/3143908/)
![¿Qué es un reducer?](qesunreducer.jpg)

```javascript
import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        if (!!state.loading) {
            // La doble negación nos permite validar si la variable es diferente de undefined y si es verdadero.
            setTimeout(() => {
                if (state.value === SECURITY_CODE)
                    dispatch({
                        type: "CORRECT",
                    });
                else
                    dispatch({
                        type: "ERROR",
                    });
            }, 3000);
        }
    }, [state.loading]);

    if (!state.delete && !state.confirm)
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>
                {state.error && <p>Error: Código de seguridad invalido</p>}
                {state.loading && !state.error && <p>Cargando...</p>}
                <form>
                    <input
                        placeholder="Código de seguridad"
                        value={state.value}
                        onChange={(event) =>
                            dispatch({
                                type: "WRITE",
                                payload: event.target.value,
                            })
                        }
                    />
                    <input
                        type="submit"
                        value="Comprobar"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch({ type: "CHECK" });
                        }}
                    />
                </form>
            </div>
        );
    else if (!state.delete && !!state.confirm)
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>¿Estás seguro que deseas eliminar UseState?</p>
                <div>
                    <button
                        type="button"
                        onClick={() => dispatch({ type: "CONFIRM" })}
                    >
                        Por supuesto
                    </button>
                    <button
                        type="button"
                        onClick={() => dispatch({ type: "RESET" })}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    else
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Eliminado con éxito</p>
                <button
                    type="button"
                    onClick={() => dispatch({ type: "RESET" })}
                >
                    Recuperar {name}
                </button>
            </div>
        );
}

const initialState = {
    value: "",
    error: false,
    loading: false,
    delete: false,
    confirm: false,
};

const reducerObject = (state, payload) => ({
    CORRECT: {
        ...state,
        error: false,
        loading: false,
        value: "",
        confirm: true,
    },
    ERROR: {
        ...state,
        error: true,
        loading: false,
        value: "",
    },
    WRITE: {
        ...state,
        value: payload,
    },
    CHECK: {
        ...state,
        loading: true,
        error: false,
    },
    CONFIRM: {
        ...state,
        delete: true,
    },
    RESET: {
        ...state,
        confirm: false,
        delete: false,
    },
});

const reducer = (state, action) => {
    if (reducerObject(initialState)[action.type])
        return reducerObject(initialState, action.payload)[action.type];
    else return state;
};

export { UseReducer };
```
