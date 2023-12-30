## Clase 01/41

### Tecnologia Text2IMG

- Text input --> procesamiento modelo de datos --> img output
- Fotorealismo

### Tecnologia Text2Text

- Texto input --> prcesamiento modelo de datos --> text output
- GTP-3 , chatbot de alto nivel
- Texto complejos ---> keyworkd resumen

## Clase 02/41 : Cómo funciona text-to-Image: difussion

- Son modelos de difussion (text2img)
- Link [https://labs.openai.com/]

### Stable diffusion

- funciona bajo un espacio vectorial
- se divide en dos pespertivas : Text Encode y Image generator
- Text Encode : se base en "CLIP" (contrastive lagangue-image pre-trainig) es una tecnologo o arq. que es capaz de relacionar text con imgs , se cruza la imagen con text para tener una relacion con la imagen . es decir las imagenes tiene caracterisitcas ya pre definina con palabras claves para cuando se usa se relaciona con el text-input.

- Image generator : toma un vector generado por "CLIP" , toma una image en ruido .
  - IG- Image formation Creator
  - IG - Image Autoencoder
- Modelos de diffusion : Es tecnica agrega ruido a una imagen de alto difinicion , y luego devuelve a una nueva imagen desde el ruido.

Stable Diffusion:

1. Text encoder(Entendimiento de texto)

CLIP: (Contrastive Language-Image Pre-Training): Es una tecnologia o arquitectura desarrollada por el equipo de Open AI capaz de relacionar textos con imagenes. 2. Image generator

Image formation creator: Generador de la información de la imágen

2. Image autoencoder: Quien toma el espacio vectorial y genera una imagen como resultado
   Diffuser: Generar ruido en una imagen

## Clase 03 /41 Exponentes de IA generativa: DALL·E 2, Midjourney y Stable Difussion

Dall E 1:
2021

DALL·E 2:
Fue entrenado con imagenes separadas en CLIP, genera imagenes con muchos detalles y alta resoluciòn

Midjourney:
Funciona a travès de discord, en calidad y diseño es lo mejor que se puede encontrar con promps muy basicos.

Stable Difussion:
Sus productos son libres, se encuentra en Hugging Face y es el primero en lograr al menos 33.000 review en los primeros noventa dias de lanzamiennto.

## Clase 04/41 : Generación de imágenes con DALL·E 2

## Clase 05/41 : Restricciones y limitantes de DALL·E 2

### Restricciones de DALL·E 2

Odio, Acoso, Violencia, Autolesiòn, Sexual, Impactante, Actividad ilegal, Engaño, Politico, Salud pública y personal.

### Limitantes de DALL·E 2

Formas, colores y posiciones, no maneja bien los textos

–Restricciones:

Uso no autorizado: DALL·E 2 es propiedad de OpenAI y su uso está restringido a ciertas condiciones y restricciones. Cualquier uso no autorizado puede resultar en acciones legales por parte de OpenAI.
Requerimientos computacionales: DALL·E 2 requiere de una gran cantidad de recursos computacionales para funcionar. Esto significa que puede ser costoso y lento de utilizar en algunos casos, lo que limita su accesibilidad para algunos usuarios y empresas.
Privacidad y seguridad: El uso de DALL·E 2 puede plantear preocupaciones sobre la privacidad y la seguridad de los datos. Como es una tecnología que funciona con descripciones de texto, puede haber riesgos de filtración de información confidencial o privada.
–Limitantes:

1.Tamaño y calidad de las imágenes: Las imágenes generadas por DALL·E 2 son limitadas en tamaño y calidad debido a las limitaciones de la red neuronal. Las imágenes generadas son de 512x512 píxeles, lo que puede ser insuficiente para algunas aplicaciones. 2. Complejidad de la descripción de texto: DALL·E 2 funciona mejor con descripciones de texto simples y concretas. Cuando se utilizan descripciones de texto complejas o ambiguas, la red neuronal puede generar imágenes inexactas o irrelevantes. 3. Limitaciones en la comprensión del contexto: Aunque DALL·E 2 puede comprender el contexto en cierta medida, todavía tiene dificultades para entender el contexto más amplio de una imagen o descripción de texto. 4. Falta de variabilidad y creatividad: DALL·E 2 puede ser limitado en su capacidad para generar imágenes que sean creativas y únicas. 5. Sesgo en el conjunto de datos: La red neuronal de DALL·E 2 puede estar sesgada en función del conjunto de datos con el que fue entrenada. 6. Limitaciones en la generación de texto: Aunque DALL·E 2 se utiliza para generar imágenes a partir de texto, todavía tiene limitaciones en la generación de texto. 7. Falta de interpretación de las imágenes: DALL·E 2 puede generar imágenes impresionantes a partir de descripciones de texto, pero aún tiene limitaciones en la interpretación y comprensión de las imágenes.

## Clase 06 : Prompt tuning: luces, detalles, sombras y perspectivas

Prompt tuning: Mejorar nuestros prompt para DATA LOVERS

Estructura:

1.¿Qué es lo que yo quiero?

2.¿Cúal es el sujeto o la escena que yo quiero que se pinte?

3.Indicar la perspectiva de calidad

4.Determinar el modo

-Variables
-Luz
-Cantidad
-Brillo
-Tamaños
-Area
-Resoluciòn
-Tonalidades y texturas de Piel
-Expresiones

Prompt book for data lovers II ❤️ [https://docs.google.com/presentation/d/1V8d6TIlKqB1j5xPFH7cCmgKOV_fMs4Cb4dwgjD5GIsg/edit#slide=id.g1834b964b0f_3_4]

https://pitch.com/v/DALL-E-prompt-book-v1-tmd33y/59c40045-c6b6-439a-9b85-e8b955d2b6ff

## Clase 07 : Prompt tuning en DALL·E 2: práctica

## Clase 08 : Prompt tuning: estilos y artistas

existen muchos estilo y dalle los puede interpretar. por ejemplo: water color, story bock, digital painting, collage, vector art, dibujo a lapiz, color, boligrafo, digital art, etc…
Ademas de los estilos de trazos, tambien tenemos estilos artísticos, como: cultura romana, mesopotamia, cuevas, renacentistas, impresionismo, barroco, estilos modernos; neo expresionismo etc. Resaltar la palabra “STYLE”
Dalle tambien puede generar obras de artistas especificos. se debe resaltar la plabra “BY” + “nombre del artista” ejem; Van goh

## Clase 09 : rompt tuning en DALL·E 2: práctica de estilos y artistas

## Clase 10 : Uso de API de DALL·E 2 con Python

otra forma de generar img con una api
esta en la documentacion de openai
se usa un notebook de jupyter en Google

https://platform.openai.com/docs/guides/images/introduction?context=node

generar la api-key

es de pago

## Clase 11 : Generación de imágenes con Midjourney

se paga para usar en discro ctl-k , bot , /imagined

## Clase 12 : Prompt tuning con Midjourney

Al igual que DALLE-2 tiene tecnicas para mejorar sus prompts, agregando artistas, estilos, epocas.

Describir estilos:
Por default esta photorealism
a cyberpunk wizard
a surreal lanscape
a psychedelic astronaut
Evitar muchos pequeños detalles
avoid: “a monkey on roller skates jugglinkg razor blades in hurricane” ⚠️
try: “a monkey that´s a hurricane of chaos” ☑️
Especificar cantidades con un numero o algo que haga referencia como “gatos / gato”
Usar sustantivos singulares o numeros especificos
Avoid: “psychedelic astronauts”
try: “psychedelic astroanut crew”
avoid: “cyberpunk wizards”
try: “three cyberpunk wizards”
Negative prompts → alto que no quiero que salga en la imagen
Avoid: “young man stands in a downpour without an umbreslla and hat”
Try: “young man stands in a downpour --no umbrella, hat”
Seed (semilla)
Cada vez q ejecuto un prompt puedo tener muchas versiones, para mantener el contexto se puede usar la semilla de la imagen que queremos mejorar --seed 42
Calidad (0.25, 0.5, 1,2,5)
por default la calidad es 1
--quality 0.25 no tan buenos resultados, 4x mas rapido y barato
--quality 2 resultados mas detallados, 2x mas lento y costos
Pesos:
la atencion que le damos al promt, se define con::<Nro> (tiene que estar adelante del texto), Esto asigna un peso al prompt, ejem: “a bouquer of eyeballs ::3 in an earthenware vase ::1.5”
Tambien se puede dar peso negativo ::-2 para que le de menos importancia a esa parte del prompt ejem: “hot dog::1.5 food::-1”
Existe muchas variables que podemos setear desde discord
