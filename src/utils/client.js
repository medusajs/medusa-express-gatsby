const Medusa = require("@medusajs/medusa-js").default

const BACKEND_URL = process.env.GATSBY_STORE_URL || "http://localhost:9000"

const client = new Medusa({ baseUrl: BACKEND_URL });

module.exports.client = client;