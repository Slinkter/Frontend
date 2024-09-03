import React, { useEffect, useState } from "react";

const SECURITY_CODE = "paradigma";

const ExampleUseState = ({ nameprops }) => {
  const [state, setState] = useState({
    value: "",
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
  });

  const onConfirm = () => {
    setState({ ...state, loading: false, error: false, confirmed: true });
  };
  const onError = () => {
    setState({ ...state, loading: false, error: true });
  };
  const onWrite = (e) => {
    setState({ ...state, value: e.target.value });
  };
  const onCheck = () => {
    setState({ ...state, loading: true, error: false });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true,
    });
  };
  const onReset = () => {
    setState({
      ...state,
      deleted: false,
      confirmed: false,
      value: "",
    });
  };

  useEffect(() => {
    console.log("start");

    if (!!state.loading) {
      //backend start
      setTimeout(() => {
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }
      }, 2000);
      //backend end
    }

    console.log("end");
    return () => {};
  }, [state.loading]);

  console.log("=================");
  console.log(" render :");
  console.log(state);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {nameprops}</h2>
        <p>por favor escribie el codigo de seguridad</p>
        {state.error && !state.loading && <p> Error : codigo incorrecto</p>}
        {state.loading && <p>Cargando ...</p>}
        <input
          type="text"
          placeholder="codigo de seguridad"
          value={state.value}
          onChange={(e) => {
            onWrite(e);
          }}
        />
        <button onClick={() => onCheck()}>Comprobar</button>
      </div>
    );
  } else if (!state.deleted && !!state.confirmed) {
    return (
      <>
        <p>pedimos confirmacion estas seguro ?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          si ,eliminar
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          no , ir atras
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>la tarea fue eliminado</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          resetear ,volver atras
        </button>
      </>
    );
  }
};

export default ExampleUseState;
