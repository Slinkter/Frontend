const miURL = new URL(
    "https://www.ejemplo.org/cursos/node/cursobasico?ordernar=vistas&nivel=basico"
);

//console.log(miURL);
console.log(miURL.hostname);
console.log(miURL.pathname);
console.log(miURL.searchParams);
console.log(miURL.searchParams.get("ordernar"));
console.log(miURL.searchParams.get("nivel"));
