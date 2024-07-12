https://pollen-zebra-c8b.notion.site/Curso-de-React-js-Patrones-de-Render-y-Composici-n-605d51bd9e2d4d2ab45751444bbf154e

# Introduccion Composición de componentes

# 1.Principios de diseño en React

## A) Filosofia de React para Team Facebook

### Abstracciones comunes:

-   Se refiere que a React no quiere incluir código inútil en su core, código que sea demasiado especifico para caso de uso demasiado concreto. Sin embargo, existen excepciones.

### Interoperabilidad:

-   React trata de trabajar bien con otras bibliotecas de interfaz de usuario .

### Estabilidad:

-   React va a mantener sus apis, componentes, funcionamiento, etc… aunque estén descontinuados para no romper el código que usamos.

### Válvulas de escape:

-   Cuando React quiera descontinuar un patrón que no les gusta, es sus responsabilidad considerar todos los casos de uso existentes para él, y antes de descontinuarlo educar a la comunidad respecto a las alternativas.

### Experiencia de desarrollo:

-   el objetivo de React no es solo que con su código podamos solucionar nuestro problemas también van a buscar una solución que nos den una buena experiencia y disfrute. react context fue un ejemplo de cambio en actualizaciones para usarlo.

### Implementación:

-   Siempre que sea posible React preferirá código aburrido a código elegante. El código es descartable y cambia a menudo. Así que es importante que no introduzca nuevas abstracciones internas al menos que sea absolutamente necesario. Código detallado que sea fácil de mover, cambiar y eliminar es preferido sobre código elegante que esté abstraído de manera prematura y que sea difícil de cambiar.

### Optimizado para instrumentación:

-   React siempre va a buscar el nombre mas distintivos y detallados(no necesariamente nombres largos).

### Dogfooding:

-   React va a priorizar a Facebook en temas de mejoras de implentacion y codigo o mantenimiento , Esto tiene la ventaja no solo para su empresa sino también a todos los desarrolladores que utiliza React.

## B) Filosofia de React para ti

### 1)Planificación:

-   Acá es donde nosotros dividimos nuestras responsabilidades de los que debemos hacer y lo que tiene que hacer React por detrás con las descripciones que le hacemos. react tranforma nuestro codigo para que funciones en htlm

### 2)Configuración :

-   React siempre se asegurara que nosotros tengamos compatibilidad entre cualquier librería y aplicación que utilicemos React.React no permite cambiar el core en tiempo de ejecucion.

### 3) Depuración:

-   se refiere que a React siempre va a dejarte pistas un rastro predecible, donde podamos buscar los errores en nuestra aplicación.Mensaje de Errores de logica en consola.

---

### 4) Patron de Composicion de componentes(patron)

No usa react context pues es un reemplazo
Es un patron o principio, indica que cada componente debe darnos mucha libertad para elegir donde y como usarlo.

Cada componente debe realizar una tarea muy específica, pero no debe de decirnos como usar esa solución que nos brinda, debe de ser flexible al momento de utilizarlo Nos permitirá tener componentes mucho más fáciles de integrar al resto de componentes.
Nos facilitará reutilizar o hacer cambios en nuestros componentes.

-   La colocación de estado es un problemas.
-   Principio de la Maxima cercania a la relevancias.
-   Principio Stateful vs stateless : no mezclar UI con lógica.

        -App (estado )
        **TodoHeader
        ---TodoCounter (stateless : solo consume la data del estado)
        ---TodoSearch (statefull : tiene un estado distinto)
        **TodoList
        ---TodoItem (statefull)

-   Es un patron de diseño
-   Se define un estado y se pasa uno solo estado a los componentes
-   Toda la informacion de variables esta en App y se da todos los componentes.

        - App (state)
        -- TodoHeader
        --- TodoCounter
        --- TodoSearch (state)
         -- TodoList
        --- Array.map( item => <Component {...state}>)

-   cuando aumenta la complejidad se usa react context.

---

### 5)Patron de Render props y render functions

es la continuacion del patron de composicion de componentes
ahora tenemos dos tipos propiedades del componente  
 _ props normal ( valor o variable)
_ props render (devuelve un component o elemento)

Ya no es necesario renderizar en el {children} sino todo sube a la section de propiedad.Donde la propiedad render es la principal

```JSX
<Component >
      {error & <Error/>}
      {loading & <Loading/>}
      <Item/>
</Compontent>

```

```JSX
<Component
      error={error}
      loading={loading}
      onError = {() => <Error/>}
      onLoading={() => <Loading/>}
      render = { <Item/>}
/>

```

#### React-Children y React CloneElement

-   son hooks para para pasar propiedades especiales a los components hijos

---

### 6) High Order Components (HOC)

-   high ordern funcion y curring , estas funciones de orden superior devuelven funciones , pueder recibir parametros

-   Es un patron de diseño.
    Las funciones como las conocemos pueden devolvernos un valor en sus returns, pero estas funciones de “orden superior”, son funciones que devuelven otras funciones, es decir Es una funcion de vuelven otra funcion.

-   Si llamamos a la HOC y le enviamos un parámetro no tendremos todavía un resultado, como está devolviendo otra función tenemos que llamar a esa función que obtenemos luego de llamar a la de orden superior, enviarle los nuevos parámetros que necesita la función de retorno y entonces si, obtendremos nuestro resultado.

-   Los high order components (o componentes de orden superior) son componentes que reciben un componente y retornan otro componente con nuevas props o elementos, lo cual nos permite reutilizar lógica dentro de varios componentes.

-   Y con este HOC ahora podemos reutilizar este código, y ya no tenemos que crear un estado local para cada componente, sino que le delegamos esta tarea a otro componente.

```JSX
// --> Definición del HOC
function HOC(var1) {
  return function FuncReturn(var2) {
    return var1 + var2;
  }
}

// --> Creación de una instancia del HOC
const withSum = HOC(1);

// --> Uso del HOC para sumar valores
const sumTotal = withSum(2);
console.log(sumTotal); // Output: 3


```

## Conclusion : Render-props vs HOCs vs React-Hooks

-   Render props

Las render props son muy útiles cuando deseamos realizar validaciones o renderizados condicionales, ya que podemos definir que es lo que vamos a mostrar en un componente desde sus props.

-   HOC.

Los high order components muestran todo su potencial cuando queremos reutilizar lógica, código e inyectar información a un componente por medio de sus props. Es cierto que estos aumentan la complejidad de nuestro código, pero si son utilizados correctamente llegan a ser una herramienta muy poderosa.

-   Custom Hooks

Los hooks de React son una herramienta que está disponible desde la versión 16.8.0, estos nos permiten encapsular lógica dentro de una función, la cual podemos utilizar tantas veces como queramos. Por ejemplo, podríamos crear un custom hook que nos permite hacer peticiones hacia cierto endpoint y que nos retorne el estado actual de la petición para saber que renderizar mientras llega la data.
