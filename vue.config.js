const path = require('path')  
module.exports = {
    baseUrl: process.env.NODE_ENV === "production" ? "./" : "",
    assetsDir:"",
    outputDir: "dist",
}