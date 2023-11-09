const { generateAndEmitDataStream } = require("../utility/utill");

function initializeDataEmitter(io) {
    io.on("connection", (socket) => {
        // Periodically generate and emit data streams to connected clients
        setInterval(() => {
            generateAndEmitDataStream(socket);
        }, 10000);
    });
}

module.exports = initializeDataEmitter;
