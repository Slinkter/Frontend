import React from "react";

class ExampleClassState extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
        };
    }
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.nameprops}</h2>
                <p>por favor escribie el codigo de seguridad</p>
                {this.state.error && <p> Error : codigo incorrecto</p>}
                <input type="text" placeholder="codigo de seguridad" />
                <button
                    onClick={() => this.setState({ error: !this.state.error })}
                >
                    Comprobar
                </button>
            </div>
        );
    }
}

export default ExampleClassState;
