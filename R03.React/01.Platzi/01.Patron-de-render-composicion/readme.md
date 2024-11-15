# Patrones de Render y Composición en React

### Patrones de Render

1. **Render Props**:

    - Permite que un componente comparta lógica con otros componentes mediante una función que se pasa como prop.
    - Ejemplo:

        ```jsx
        const DataProvider = ({ render }) => {
            const data = fetchData();
            return render(data);
        };

        const App = () => (
            <DataProvider render={(data) => <DisplayData data={data} />} />
        );
        ```

2. **Higher-Order Components (HOCs)**:

    - Es una función que toma un componente y devuelve un nuevo componente con lógica adicional.
    - Ejemplo:

        ```jsx
        const withData = (WrappedComponent) => {
            return class extends React.Component {
                state = { data: null };

                componentDidMount() {
                    this.setState({ data: fetchData() });
                }

                render() {
                    return (
                        <WrappedComponent
                            data={this.state.data}
                            {...this.props}
                        />
                    );
                }
            };
        };

        const EnhancedComponent = withData(DisplayData);
        ```

3. **Conditional Rendering**:
    - Renderiza componentes basados en condiciones.
    - Ejemplo:
        ```jsx
        const App = ({ isLoggedIn }) => (
            <div>{isLoggedIn ? <Dashboard /> : <Login />}</div>
        );
        ```

### Patrones de Composición

1. **Composición de Componentes**:

    - Combina componentes pequeños y reutilizables para crear componentes más complejos.
    - Ejemplo:

        ```jsx
        const Header = () => <header>Header</header>;
        const Footer = () => <footer>Footer</footer>;

        const Layout = ({ children }) => (
            <div>
                <Header />
                {children}
                <Footer />
            </div>
        );

        const App = () => (
            <Layout>
                <main>Main Content</main>
            </Layout>
        );
        ```

2. **Children Props**:

    - Permite pasar componentes hijos a través de props.
    - Ejemplo:

        ```jsx
        const Card = ({ children }) => <div className="card">{children}</div>;

        const App = () => (
            <Card>
                <h1>Title</h1>
                <p>Content</p>
            </Card>
        );
        ```

3. **Slot Pattern**:

    - Similar a los children props, pero permite definir múltiples "slots" para diferentes partes del componente.
    - Ejemplo:

        ```jsx
        const Modal = ({ header, body, footer }) => (
            <div className="modal">
                <div className="modal-header">{header}</div>
                <div className="modal-body">{body}</div>
                <div className="modal-footer">{footer}</div>
            </div>
        );

        const App = () => (
            <Modal
                header={<h1>Header</h1>}
                body={<p>Body Content</p>}
                footer={<button>Close</button>}
            />
        );
        ```

### Visualización Gráfica

Imagina la siguiente estructura de componentes:

### Introducción

Composición de componentes

### 1. Principios de diseño en React

#### A) Filosofía de React para el equipo de Facebook

**Abstracciones comunes:**  
React no quiere incluir código innecesario en su núcleo, especialmente código demasiado específico para casos de uso concretos. Sin embargo, existen excepciones.

**Interoperabilidad:**  
React trata de trabajar bien con otras bibliotecas de interfaz de usuario.

**Estabilidad:**  
React va a mantener sus APIs, componentes, funcionamiento, etc., aunque estén descontinuados para no romper el código que usamos.

**Válvulas de escape:**  
Cuando React quiera descontinuar un patrón que no les gusta, es su responsabilidad considerar todos los casos de uso existentes y educar a la comunidad respecto a las alternativas antes de descontinuarlo.

**Experiencia de desarrollo:**  
El objetivo de React no es solo solucionar nuestros problemas con su código, sino también proporcionar una buena experiencia y disfrute. El `React Context` es un ejemplo de cambio en actualizaciones para usarlo.

**Implementación:**  
Siempre que sea posible, React preferirá código sencillo a código elegante. El código es desechable y cambia a menudo. Es importante no introducir nuevas abstracciones internas a menos que sea absolutamente necesario. Se prefiere código detallado que sea fácil de mover, cambiar y eliminar, sobre código elegante que esté abstraído de manera prematura y sea difícil de cambiar.

**Optimizado para instrumentación:**  
React siempre busca nombres distintivos y detallados (no necesariamente nombres largos).

**Dogfooding:**  
React priorizará a Facebook en temas de mejoras de implementación y código o mantenimiento. Esto beneficia no solo a su empresa sino también a todos los desarrolladores que utilizan React.

#### B) Filosofía de React para ti

**1) Planificación:**  
Aquí es donde dividimos nuestras responsabilidades de lo que debemos hacer y lo que debe hacer React por detrás con las descripciones que le damos. React transforma nuestro código para que funcione en HTML.

**2) Configuración:**  
React asegura que tengamos compatibilidad entre cualquier librería y aplicación que utilicemos con React. React no permite cambiar el core en tiempo de ejecución.

**3) Depuración:**  
React siempre deja pistas predecibles donde podamos buscar errores en nuestra aplicación, como mensajes de errores de lógica en la consola.

#### 4) Patrón de composición de componentes

No usa `React Context` pues es un reemplazo.

Es un patrón o principio que indica que cada componente debe darnos mucha libertad para elegir dónde y cómo usarlo. Cada componente debe realizar una tarea muy específica, pero no debe decirnos cómo usar esa solución que nos brinda; debe ser flexible al momento de utilizarlo. Nos permitirá tener componentes mucho más fáciles de integrar al resto de componentes y facilitará reutilizar o hacer cambios en nuestros componentes.

-   La colocación de estado es un problema.
-   Principio de la máxima cercanía a la relevancia.
-   Principio Stateful vs Stateless: no mezclar UI con lógica.
    -   App (estado)
        -   TodoHeader
            -   TodoCounter (stateless: solo consume la data del estado)
            -   TodoSearch (stateful: tiene un estado distinto)
        -   TodoList
            -   TodoItem (stateful)

Es un patrón de diseño. Se define un estado y se pasa un solo estado a los componentes. Toda la información de variables está en `App` y se distribuye a todos los componentes.

-   App (state)
    -   TodoHeader
        -   TodoCounter
        -   TodoSearch (state)
    -   TodoList
        -   `Array.map(item => <Component {...state}>`

Cuando aumenta la complejidad, se usa `React Context`.

#### 5) Patrón de Render Props y Render Functions

El patrón de Render Props es una técnica en React que permite compartir lógica entre componentes mediante una prop cuyo valor es una función. Este patrón es útil para crear componentes reutilizables y flexibles.

Definición y Conceptos
Render Props: Es una técnica en la que un componente recibe una función que retorna un elemento React y lo utiliza para renderizar su salida. Esta función se pasa como una prop al componente.

Es la continuación del patrón de composición de componentes. Ahora tenemos dos tipos de propiedades del componente:

-   Props normales (valor o variable)
-   Props render (devuelve un componente o elemento)

Ya no es necesario renderizar en el `{children}`, sino que todo sube a la sección de propiedad, donde la propiedad `render` es la principal.

```jsx
<Component>
    {error && <Error />}
    {loading && <Loading />}
    <Item />
</Component>
```

```jsx
<Component
    error={error}
    loading={loading}
    onError={() => <Error />}
    onLoading={() => <Loading />}
    render={<Item />}
/>
```

Ventajas del Patrón de Render Props

-   Reutilización de Lógica: Permite encapsular y reutilizar lógica compleja en diferentes componentes.
-   Flexibilidad: Los componentes pueden definir cómo se renderiza la lógica compartida.
-   Mantenimiento: Facilita el mantenimiento y la prueba de componentes al separar la lógica de la presentación.

Render Functions

-   Las Render Functions son similares a las Render Props, pero en lugar de pasar una función como prop, se utiliza una función directamente en el cuerpo del componente para renderizar elementos dinámicamente.

#### React-Children y React CloneElement

Son hooks para pasar propiedades especiales a los componentes hijos.

#### 6) High Order Components (HOC)

Las funciones de orden superior (High Order Functions) y currying son funciones que devuelven otras funciones y pueden recibir parámetros.

Es un patrón de diseño. Las funciones pueden devolver un valor en sus retornos, pero estas funciones de orden superior devuelven otras funciones, es decir, es una función que devuelve otra función.

Si llamamos a la HOC y le enviamos un parámetro, aún no tendremos un resultado. Como está devolviendo otra función, debemos llamar a esa función que obtenemos luego de llamar a la de orden superior, enviarle los nuevos parámetros que necesita la función de retorno y entonces obtendremos nuestro resultado.

Los High Order Components (componentes de orden superior) son componentes que reciben un componente y retornan otro componente con nuevas props o elementos, lo que permite reutilizar lógica dentro de varios componentes. Con este HOC, podemos reutilizar este código y no tenemos que crear un estado local para cada componente, sino que delegamos esta tarea a otro componente.

Los Higher-Order Components (HOC) son una técnica avanzada en React para reutilizar la lógica de los componentes. No forman parte de la API de React como tal, sino que son un patrón que surge de la naturaleza composicional de React.

Definición y Conceptos
Un Higher-Order Component es una función que toma un componente y retorna un nuevo componente con funcionalidades adicionales. Los HOCs permiten añadir comportamiento a los componentes sin modificar su código original.

Ventajas de los Higher-Order Components
Reutilización de Lógica: Permiten encapsular y reutilizar lógica compleja en diferentes componentes.
Separación de Preocupaciones: Ayudan a mantener el código limpio y modular al separar la lógica de la presentación.
Flexibilidad: Los HOCs pueden tomar argumentos adicionales para personalizar su comportamiento, lo que los hace muy flexibles.

```jsx
// Definición del HOC
function HOC(var1) {
    return function FuncReturn(var2) {
        return var1 + var2;
    };
}

// Creación de una instancia del HOC
const withSum = HOC(1);

// Uso del HOC para sumar valores
const sumTotal = withSum(2);
console.log(sumTotal); // Output: 3
```

### Conclusión: Render Props vs HOCs vs React Hooks

-   **Render Props:** Son útiles cuando deseamos realizar validaciones o renderizados condicionales, ya que podemos definir qué vamos a mostrar en un componente desde sus props.
-   **HOC:** Los High Order Components muestran todo su potencial cuando queremos reutilizar lógica, código e inyectar información a un componente por medio de sus props. Aumentan la complejidad del código, pero si se utilizan correctamente, son una herramienta poderosa.
-   **Custom Hooks:** Disponibles desde la versión 16.8.0 de React, permiten encapsular lógica dentro de una función que podemos utilizar tantas veces como queramos. Por ejemplo, podríamos crear un custom hook que haga peticiones a un endpoint y nos retorne el estado actual de la petición para saber qué renderizar mientras llega la data.

---

He corregido y ampliado algunas frases para mayor claridad y precisión. También he añadido más información complementaria y mejorado la organización del contenido. ¡Espero que te resulte útil!
