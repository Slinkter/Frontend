https://github.com/aleroses/Platzi/blob/master/DW/1-basico/23.tailwind-2-y-3-basico/tailwind-basico.md

## Clase 1 /29

Desarrolo frameword CSS
100 % responsive movil

## Clase 2/29

tailwind 2 --> tailwind 3

## Clase 3/29

tailwind es un framework de css
represenato mediante clases
no orientado a componente solo a utilidades
Paleta de colores

compoentencias : - Bootstrap : poco personalizable - Bulma : modular , importa archiva necesarios - Material UI : Google , system design

## Clase 4/29 : Mobile First y Utility First

Mobile first :

    - Desarrolo para experencia de usuario -

Utility First:

    - Css basado en utilidades
    - estructura mas mas limpia - Desarrolo mas rapido y agil
    - en la etiqueta de  elementos de html se agrega al class=" utility first "

## Clase 5/29 : Creación del proyecto e instalación de Tailwind

Se va a usar PostCss Plugin

https://tailwindcss.com/docs/installation

- Configuracion de proyecto

  npm init -y
  npm install -D tailwindcss postcss autoprefixer
  crear las carpetas y archivos src y public /tailwind.css

  - @tailwind base;
  - @tailwind components;
  - @tailwind utilities;

  npx tailwindcss init , se crear archivo tailwind.config.js y se modifica segun path folder

  module.exports = {
  content: ['./public/index.html', './src/**/*.{html,js}'],
  theme: {
  extend: {},
  },
  plugins: [],
  }

  npm run dev

## Clase 6/29 :Directivas de Tailwind

“Las directivas son reglas personalizadas específicas de Tailwind que puedes utilizar en tu CSS y que ofrecen funcionalidades especiales para proyectos de Tailwind CSS.”

Directiva es una instrucción que utiliza tailwind para insertar código en el archivo final de css que genera. Esto inyecta los estilos base de Tailwind y cualquier estilo base registrado por plugins, también inyecta las clases de componentes de Tailwind y cualquier clase de componente registrado por los plugins

@tailwind base : initicial los elementos sin estilos
@tailwind componse : permite acceso a las clases de tailwind
@tailwind utitliy : acceso a utiliti de tailwind
pero existen mas

## Clase 7/29 :Directivas de Tailwind

## Clase 8/29 :Medidas y Breakpoints

breakpoing : cambia la pantalla de layout - 320px : movil - 768px : table - 1280px: computer

## Clase 9/29 :Flex box y Grid

modelo de layout que funciona con respecto al eje x y eje y

grid : modelo de layout que funciona como una cuadriculla de filas y columnas , para usar en area o secciones

## Clase 11/29 :Flex box y Grid

// instalacion

npm install -D @tailwindcss/forms
npm install -D @tailwindcss/typography
npm install -D @tailwindcss/aspect-ratio

// uso -> tailwind.config.js:

plugins: [
require('@tailwindcss/aspect-ratio'),
require("@tailwindcss/forms"),
require("@tailwindcss/typography"),
],

## Clase 20/29 :
