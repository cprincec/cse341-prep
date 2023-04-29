const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contacts Api",
        description: 'Description'
    }, 
    host: 'cprinceccse341.onrender.com',
    schemes: ['https']
}

const outputFile = './swaggerOutput.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutogen(outputFile, endpointsFiles, doc);