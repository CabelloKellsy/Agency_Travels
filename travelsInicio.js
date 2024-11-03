
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;

//llamar a las rutas del archivo Json
const rutaArchivoJson = path.join(__dirname, 'travels.json');

//leer el archivo JSON de forma sincrona
let datos;
try {
    const data = fs.readFileSync(rutaArchivoJson, 'utf8');
    datos = JSON.parse(data);
    console.log("Archivo JSON leido correctamente");
} catch (error) {
    console.log("error al leer el archivo JSON", error);
    process.exit(1);
};
console.log(datos);
//para ejecutar el archivo desde consola: node travelsInicio.js

//leer el archivo de estilo y guardar el contenido en una variable
const contenidoCss = path.join(__dirname, 'estilos.css');
let estiloCSS = '';
try {
    estiloCSS = fs.readFileSync(contenidoCss, 'utf8');
} catch (error) {
    console.log("error al leer el archivo CSS", error);
}

//crear el servidor HTTP
const server = http.createServer((req, res) => {
    let body = "";
    let title = "";

    const rutas = datos.map(destino => `<li><a href="${destino.id}">${destino.lugar}</a></li>`).join("");

    if (req.url === "/" || req.url === "/inicio") {
        title = `${datos[0].id}`;
        body = `<h2>${datos[0].nombre}</h2>`;
        body += `<p>${datos[0].descripcion}</p>`;
        body += `<p>${datos[0].precio}</p>`;
        body += `<img src=${datos[0].img} alt="${datos[5].id}">`;

    } else if (req.url === "/maldivas") {

        title = `${datos[1].id}`;
        body = `<h2>${datos[1].nombre}</h2>`;
        body += `<p>${datos[1].descripcion}</p>`;
        body += `<p>${datos[1].precio}</p>`
        body += `<img src=${datos[1].img} alt="${datos[5].id}">`;

    } else if (req.url === "/egipto") {
        title = `${datos[2].id}`
        body = `<h2>${datos[2].nombre}</h2>`;
        body += `<p>${datos[2].descripcion}</p>`;
        body += `<p>${datos[2].precio}</p>`;
        body += `<img src=${datos[2].img} alt="${datos[5].id}">`;

    } else if (req.url === "/nuevayork") {
        title = `${datos[3].id}`;
        body = `<h2>${datos[3].nombre}</h2>`;
        body += `<p>${datos[3].descripcion}</p>`;
        body += `<p>${datos[3].precio}</p>`;
        body += `<img src=${datos[3].img} alt="${datos[5].id}">`;

    } else if (req.url === "/venecia") {
        title = `${datos[4].id}`
        body = `<h2>${datos[4].nombre}</h2>`;
        body += `<p>${datos[4].descripcion}</p>`;
        body += `<p>${datos[4].precio}</p>`
        body += `<img src=${datos[4].img} alt="${datos[5].id}">`;

    } else if (req.url === "/vietnam") {
        title = `${datos[5].id}`
        body = `<h2>${datos[5].nombre}</h2>`;
        body += `<p>${datos[5].descripcion}</p>`;
        body += `<p>${datos[5].precio}</p>`;
        body += `<img src=${datos[5].img} alt="${datos[5].id}">`;
    } else {
        title = "Error 404";
        body = "<h1> La ruta solicitada no existe</h1>";
        body += `<img src="https://img.freepik.com/free-vector/404-error-web-template-flat-style_23-2147776910.jpg?t=st=1730637887~exp=1730641487~hmac=30c017f8bf9a8c946a31f060adc110b96e3b638b20fb9553e5127e9d286b3124&w=740" alt="Logo">`;
    }

    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
   <style> ${estiloCSS} </style>
</head>
<header>
    <h1>Kellsy's Travels</h1>
    <nav>
        <ul id=menu>
        ${rutas}
        </ul>
    </nav>
</header>

<body>
${body}
</body>
</html>`

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(html);
    res.end();

});

server.listen(PORT, () => console.log(`Conexion exitosa en el puerto http://localhost:${PORT}`));