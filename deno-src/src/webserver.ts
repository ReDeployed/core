import { Application, Router, Response } from "https://deno.land/x/oak/mod.ts";


import DatabaseHandler from "./dbHandler.js";

// Filename
const filePath = import.meta.url;
const file = filePath.substring(filePath.lastIndexOf('/') + 1);

const port = 8080;
const certFile = "./auth/ca-certificate.pem";
const keyFile = "./auth/key.pem";
const alpnProtocols = ["h2", "http/1.1"];
const app = new Application();
const db = new DatabaseHandler();

const router = new Router();

// Call API Functions
router.get("/", (ctx) => handleRequest(ctx, "/"));
router.get("/test", (ctx) => handleRequest(ctx, "/test"));
router.get("/ping", (ctx) => handleRequest(ctx, "/ping"));
router.get("/addApp", (ctx) => handleRequest(ctx, "/addApp"));
router.get("/listApp", (ctx) => handleRequest(ctx, "/listApp"));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port, certFile, keyFile, alpnProtocols });

console.log(`${file} Started Webserver`);

async function handleRequest(ctx: any, path: string) {
	const response = new Response();

	// Get the Parameters
	const queryString = ctx.request.url.search;

	// Parse the Parameters
	const paramsURL = new URLSearchParams(queryString);
	const params = {};
	for (const [key, value] of paramsURL.entries()) {
		params[key] = value;
	}

// -------------- Simple API Functions --------------

	switch (path) {
			// API Test
			case "/":
				response.body = { message: "API geht 👍" };
				break;
			
			// Test Endpoint
			case "/test":
				response.body = { message: "This is the test endpoint" };
				break;

			// Database Ping
			case "/ping":
				response.body = { message: await db.ping() };
				break;

			// Add Application
			case "/addApp": 
				response.body = { message: await db.addApp(
					params["id"],
					params["hostname"],
					params["version"],
				) }
				break;

			// List Application
			case "/listApp":
				response.body = { message: await db.listApp() };
				break;

			// Delete Application
			case "/delApp":
				break;

			// Delete All 
			case "/detAll":
				break;

			// Default Response
			default:
				response.body = { message: "Invalid endpoint" };
				response.status = 404;
				break;
		}
	ctx.response.headers.set("Content-Type", "application/json");
	ctx.response.body = response.body;
	ctx.response.status = response.status || 200;
}
