import { Application, Router, Response } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from 'https://deno.land/x/cors/mod.ts'

import EventHandler from "./eventHandler.js";

// Filename
const filePath = import.meta.url;
const file = filePath.substring(filePath.lastIndexOf('/') + 1);

// Server
const port = 8080;
const app = new Application();
const eventHandler = new EventHandler();

const router = new Router();

// Call API Functions
router.get("/", (ctx) => handleRequest(ctx, "/"));
router.get("/test", (ctx) => handleRequest(ctx, "/test"));
router.get("/pingDB", (ctx) => handleRequest(ctx, "/pingDB"));
router.get("/pingChkp", (ctx) => handleRequest(ctx, "/pingChkp"));
router.get("/addApp", (ctx) => handleRequest(ctx, "/addApp"));
router.get("/listApp", (ctx) => handleRequest(ctx, "/listApp"));
router.get("/chgApp", (ctx) => handleRequest(ctx, "/chgApp"));

app.use(oakCors({
    origin: '*',
}))
app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port });

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

// ------- base (/) -------

			case "/":
				console.log(`${file}> base`); // Logging
				response.body = { message: await eventHandler.base() };
				break;
			


// ------- test -------

			case "/test":
				console.log(`${file}> test`); // Logging
				response.body = { message: await eventHandler.test() };
				break;



// ------- ping db -------

			case "/pingDB":
				console.log(`${file}>  pingDB`); // Logging
				response.body = { message: await eventHandler.pingDB() };
				break;
			


// ------- ping chkp -------

			case "/pingChkp":
				console.log(`${file}> pingChkp`); // Logging
				response.body = { message: await eventHandler.pingChkp() };
				break;



// ------- addApp -------

			case "/addApp": 
				console.log(`${file}> addApp`); // Logging
				response.body = { message: await eventHandler.addApp(
					params["id"],
					params["hostname"],
					params["version"],
				) }
				break;



// ------- listApp -------

			case "/listApp":
				console.log(`${file}> listApp`); // Logging
				response.body = { message: await eventHandler.listApp() };
				break;



// ------- delApp -------

			case "/delApp":
				console.log(`${file}> delApp`); // Logging
				response.body = { message: await eventHandler.delApp()};
				break;



// ------- chgApp -------

			case "/chgApp":
				console.log(`${file}> chgApp`); // Logging
				response.body = { message: await eventHandler.chgApp()};
				break;



			// Default Response

			default:
				console.log(`${file}> default`); // Logging
				response.body = { message: "Invalid endpoint" };
				response.status = 404;
				break;
		}
	ctx.response.headers.set("Content-Type", "application/json");
	ctx.response.body = response.body;
	ctx.response.status = response.status || 200;
}
