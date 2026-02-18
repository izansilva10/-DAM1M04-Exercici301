const express = require('express');
const path = require('path');
const fs = require('fs');
const hbs = require('hbs');

const app = express();
const port = 3000;

// =============================
// CONFIGURACIÓN BÁSICA
// =============================

// Carpeta pública (CSS)
app.use(express.static(path.join(__dirname, '../public')));

// Motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Registrar partials
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// =============================
// HELPER lte (menor o igual)
// =============================
hbs.registerHelper('lte', function (a, b) {
    return a <= b;
});

// =============================
// RUTA PRINCIPAL (/)
// =============================
app.get('/', (req, res) => {
    const siteData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/site.json'), 'utf8')
    );

    res.render('index', siteData);
});

// =============================
// RUTA INFORME (/informe)
// =============================
app.get('/informe', (req, res) => {

    const siteData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/site.json'), 'utf8')
    );

    const citiesData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/cities.json'), 'utf8')
    );

    const countriesData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/countries.json'), 'utf8')
    );

    res.render('informe', {
        title: siteData.title,
        subtitle: siteData.subtitle,
        cities: citiesData.cities,
        countries: countriesData.countries
    });
});

// =============================
// ARRANCAR SERVIDOR
// =============================
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
