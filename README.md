# Encrypted TimeSeries


## Overview

This project consists of a backend application that performs the following tasks:

1. **Generation and Emission of Encrypted Data Stream:**
   - The backend application generates encrypted data and emits it over a socket.

2. **Listening to Incoming Data Stream:**
   - It listens for incoming data stream on a socket.

3. **Decryption and Decoding:**
   - Upon receiving the data stream, the backend application decrypts and decodes it.

4. **Saving to Time Series Database:**
   - The decoded data is then saved to a time series database.

5. **Emitting Saved Data to Frontend:**
   - Finally, the backend emits the saved data to a small frontend application.

## Setup

1. **Dependencies:**
   - List any dependencies that need to be installed.

2. **Configuration:**
   - Specify any configuration settings that need to be set, such as database connection details.

## Usage

1. **Running the Backend Application:**
   - Provide instructions on how to run the backend application.

2. **Setting Up the Frontend Application:**
   - If applicable, include instructions for setting up and running the frontend application.

## Example

```bash
# Install dependencies
npm install

# Set up configuration
cp config.example.js config.js
# Modify config.js with your actual configuration

# Run the backend application
node backend.js


## Emitter Service

- Periodically generates a data stream of encrypted messages.
- Each message contains an object with keys: name, origin, destination, and a secret_key.
- Values for name, origin, destination are randomized from a constant list provided in `data.json`.
- Adds a secret_key by creating a sha-256 hash of the object.
- Encrypts the payload using the `aes-256-ctr` algorithm with a pass key.
- Connects to the listener service over sockets.
- Sends out a new message stream every 10s.

## Listener Service

- Accepts connections from the emitter service via sockets.
- Decrypts the encrypted message stream and retrieves the payload.
- Validates objects using the secret_key for data integrity.
- Discards operations with compromised data integrity.
- Adds a timestamp to the valid object.
- Saves the object to a MongoDB collection for time-series data, with each document corresponding to a minute.

## Frontend

- Displays valid data in real-time.
- Shows the success rate for data transmission and decoding.

## MongoDB Schema

- Design the schema to optimize performance for aggregating time-series queries.
- Each document corresponds to a minute of received data.

## Getting Started

1. Clone the repository.
2. Install dependencies for the backend services.
3. Set up MongoDB and configure the connection.
4. Run the emitter service and listener service.
5. Launch the frontend app.

## Dependencies

- Node.js (for emitter and listener services)
- MongoDB
- Frontend framework (e.g., React)

## Configuration

- Update configuration files for emitter and listener services.
- Configure MongoDB connection parameters.
- Adjust frontend configuration if necessary.



[LIVE](https://uitimeseries.onrender.com/)


