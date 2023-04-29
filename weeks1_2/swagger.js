const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contacts Api",
        description: 'Description'
    }, 
    host: 'localhost:8000',
    schemes: ['http']
}

const outputFile = './swaggerOutput.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);