import { useEffect, useReducer } from "react";
const initState = {
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
    value: "",
};
const actionTypes = {
    error: "ERROR",
    confirm: "CONFIRM",
    write: "WRITE",
    check: "CHECK",
    delete: "DELETE",
    reset: "RESET",
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.error:
            return { ...state, error: true, loading: false };
        case actionTypes.confirm:
            return { ...state, loading: false, error: false, confirmed: true };
        case actionTypes.write:
            return { ...state, value: action.payload };
        case actionTypes.check:
            return { ...state, loading: true, error: false };
        case actionTypes.delete:
            return { ...state, deleted: true };
        case actionTypes.reset:
            return { ...state, value: "", confirmed: false, deleted: false };
        default:
            return {
                ...state,
            };
    }
};

const SECURITY_CODE = "paradigma";

const UseReducer = ({ nameprops }) => {
    //
    const [state, dispatch] = useReducer(reducer, initState);
    //
    const onError = () => {
        dispatch({ type: actionTypes.error });
    };
    const onConfirm = () => {
        dispatch({ type: actionTypes.confirm });
    };
    const onWrite = (e) => {
        dispatch({ type: actionTypes.write, payload: e.target.value });
    };
    const onCheck = () => {
        dispatch({ type: actionTypes.check });
    };
    const onDelete = () => {
        dispatch({ type: actionTypes.delete });
    };
    const onReset = () => {
        dispatch({ type: actionTypes.reset });
    };

    useEffect(() => {
        if (!!state.loading) {
            //backend start
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm();
                } else {
                    onError();
                }
            }, 2000);
        }

        return () => {};
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <>
                <h2>Eliminar {nameprops}</h2>
                <p>por favor escribie el codigo de seguridad</p>
                {state.error && !state.loading && (
                    <p> Error : codigo incorrecto</p>
                )}
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
            </>
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

export default UseReducer;
