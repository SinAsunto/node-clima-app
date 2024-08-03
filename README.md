# Proyecto ClimaApp

Este proyecto es una aplicación de línea de comandos que proporciona información sobre el clima actual de una ubicación específica.

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/SinAsunto/node-clima-app.git
    ```
2. Navega hasta la carpeta del proyecto:
    ```bash
    cd node-clima-app
    ```
3. Ejecuta el siguiente comando para instalar las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el siguiente comando:
    ```bash
    npm start
    ```
3. Escribe el nombre de la ciudad cuando se te solicite.

## Funcionalidades

- **Buscar ciudad**: Permite buscar el clima actual de una ciudad específica.
- **Historial**: Muestra un historial de las ciudades buscadas anteriormente.

## Dependencias

- [axios](https://www.npmjs.com/package/axios)
- [colors](https://www.npmjs.com/package/colors)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [inquirer](https://www.npmjs.com/package/inquirer)

## Configuración

1. Renombra el archivo `example.env` a `.env`:
    ```bash
    mv example.env .env
    ```
2. Configura las variables de entorno en el archivo `.env` según tus necesidades.

## Estructura del Proyecto

```plaintext
.env
.gitignore
app.js
db/
    database.json
helpers/
    inquirer.js
models/
    busquedas.js
package.json
README.md

![image](https://github.com/user-attachments/assets/e0ab3058-10fa-436c-964a-bdf216de2028)

