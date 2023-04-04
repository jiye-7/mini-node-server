const http = require('http');
const port = 4777;

const server = http.createServer((request, response) => {
  const { method, url } = request;

  let body = [];

  if (method === 'OPTIONS') {
    response.writeHead(200, defaultCorsHeader);
    response.end();
  }

  request.on('error', (err) => {
    console.error(err.message);
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    response.writeHead(200, defaultCorsHeader);

    if (method !== 'POST') {
      response.writeHead(400, defaultCorsHeader);
      response.end();
    }

    if (method === 'POST' && url === '/upper') {
      let value = JSON.parse(body.toString());
      value.text = value.text.toUpperCase();
      response.write(JSON.stringify(value));
    } else if (method === 'POST' && url === '/lower') {
      let value = JSON.parse(body.toString());
      value.text = value.text.toLowerCase();
      response.write(JSON.stringify(value));
    }

    response.end();
  });
});

server.listen(port, () => {
  console.log(`server is listening... port: ${port}`);
});

const defaultCorsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Max-Age': 10,
};
