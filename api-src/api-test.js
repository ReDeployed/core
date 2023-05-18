const https = require("https");

// Enter IP address and authentification
const serverIP = "";
const username = "";
const password = "";

const serverPort = 443;
const endpoint = `/web_api/show-simple-gateway?name=${serverIP}`;
let method = "GET"

const options = {
  hostname: serverIP,
  port: serverPort,
  path: endpoint,
  method: method,
  auth: `${username}:${password}`,
  rejectUnauthorized: false // ignore SSL/TLS certificate errors
};

const req = https.request(options, res => {
  let data = "";
  res.on("data", chunk => {
    data += chunk;
  });
  res.on("end", () => {
    console.log(data)
  });
});

req.on("error", error => {
  console.error(error);
});

req.end();
