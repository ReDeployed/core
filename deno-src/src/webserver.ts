// Custom Database API

import DatabaseHandler from './handler.js';

const db = new DatabaseHandler();

const port = 8080;

const server = Deno.listen({
	port: port, 
});

console.log("Webserver running on " + port);

for await (const conn of server) {
	serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
	const httpConn = Deno.serveHttp(conn);

	for await (const requestEvent of httpConn) {
		try {
			const url = new URL(requestEvent.request.url);
			let response;
		 
			switch (url.pathname) {

// -------------- Test Functions --------------

// ----- Basic Reply -----

				case "/":
					response = {message: "API geht 👍"};
					break;



// ----- Ping -----

				case "/ping":
					response = {message: await db.ping()};
					break;



// -------------- Database Functions --------------

// ----- read - Get Appliance -----

				case "/read":
					let identifierGet = url.searchParams.get("id");
					response = {message: await db.read(identifierGet)};
					break;



// ----- readAll - Get All Appliances -----

				case "/readAll":
					response = {message: await db.readAll()};
					break;



// ----- createApp - Create Appliance -----
				
				case "/createApp":
					let idCreateApp = url.searchParams.get("id");
					let hostname = url.searchParams.get("hostname");
					let version = url.searchParams.get("version");

					response = {message: await db.createApp(idCreateApp, hostname, version)};
					break;



// ----- addVersion - Add Version -----


					
// ----- addRoutes - Add Routes -----



// ----- addInt - Add Interfaces -----
				



// ----- delAll - Delete All Firewall -----

				case "/deleteAll":
					db.delAll();
					response = {message: "Deleted All Firewalls"};
					break;



// ----- Default  -----
				
				default:
					response = { error: "Unknown Request :(" };
					break;
			}
			
			requestEvent.respondWith(
				new Response(JSON.stringify(response)), {
					headers: {"Content-Type": "application/json"},
				}
			);
		} catch (error) {
			requestEvent.respondWith(
				new Response(JSON.stringify({error: error.message}), {
					status: 500,
					headers: {"Content-Type": "application/json"},
				}
				)  
			)
		}
	}
}
