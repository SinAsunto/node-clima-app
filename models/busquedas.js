const fs = require('fs');

const axios = require('axios').default;

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHERMAP_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar = '') {
        try {
            // Petición HTTP
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id, // ID de lugar
                nombre: lugar.place_name, // Nombre del lugar
                lng: lugar.center[0], // Longitud
                lat: lugar.center[1] // Latitud
            }));

        } catch (error) {
            console.log('Error:', error);
            return [];
        }
    }

    async climaLugar(lat, lon) {
        try {
            // Petición HTTP
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon } // Destructuración de parámetros
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.error('Error al obtener el clima:', error.response ? error.response.data : error.message);
        }
    }

    agregarHistorial(lugar = '') {
        if (this.historial.includes(lugar.toLocaleLowerCase())) return;

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.historial = data.historial;
    }

}

module.exports = Busquedas;