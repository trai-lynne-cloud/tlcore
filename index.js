const Runtime = require('./runtime')
const app = require('./runtime/api/ingestionServer')
const port = 3000;

// Start Runtime 
console.log("[TLCore] Starting Runtime...")
Runtime.start()

// Start Ingestion Server 
console.log("[TLCore] Starting Ingestion Server...")

app.listen(port, () => {
    console.log(`[TLCore] Ingestion Server Listening on Port ${port}`);
});

console.log("[TLCore] System Booted")