/* eslint-disable no-console */

const express = require('express');
const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
// const HTML_FILE = path.join(DIST_DIR, 'index.html');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;
const mockResponse = {
  foo: 'bar',
  bar: 'foo',
};
app.use(express.static(DIST_DIR));

io.on('connection', (socket) => {
  socket.on('action', (params) => {
    io.emit('action', params);
  });
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.get('/api', (req, res) => {
  res.send(mockResponse);
});

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

http.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
