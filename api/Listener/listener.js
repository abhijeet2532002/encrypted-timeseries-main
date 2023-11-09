const { decryptMessage, isDataValid } = require("../utility/utill");
const TimeSeriesModel = require("../models/timesSeries.model");

function initializeDataListener(io) {
    io.on("connection", (socket) => {
        // Event listener for "listen_request" messages from clients
        socket.on("listen_request", async (receivedData) => {
            const decryptedData = JSON.parse(
                decryptMessage(receivedData.encryptedMessage, receivedData.secretKey)
            );

            // Validate the received data and save it to the database
            if (isDataValid(decryptedData, receivedData.secretKey)) {
                try {
                    await TimeSeriesModel.create(decryptedData);
                } catch (error) {
                    console.log(error);
                }

                // Emit the decoded data back to the client
                socket.emit("decoded", decryptedData);
            }
        });
    });
}

module.exports = initializeDataListener;
