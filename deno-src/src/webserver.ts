// Database manager API

import { Application, Router, Response } from "https://deno.land/x/oak@v12.5.0/mod.ts";

import EventHandler from "./eventHandler.js";
import DatabaseHandler from "./dbHandler.js";
import ChkpHandler from "./ChkpHandler.js";
import Security from "./encryption.ts";

// Server
const port = 8080;
const alpnProtocols = ["h2", "http/1.1"];
const app = new Application();
const eventHandler = new EventHandler();
const db = new DatabaseHandler();
//const chkp = new ChkpHandler();
const sec = new Security();
const router = new Router();

// Overall Api Endpoints
router.get("/", (ctx) => handleRequest(ctx, "/"));
router.get("/test", (ctx) => handleRequest(ctx, "/test"));
router.get("/pingDB", (ctx) => handleRequest(ctx, "/pingDB"));
router.get("/pingChkp", (ctx) => handleRequest(ctx, "/pingChkp"));
router.get("/startManage", (ctx) => handleRequest(ctx, "/startManage"));
router.get("/stopManage", (ctx) => handleRequest(ctx, "/stopManage"));
router.get("/listApp", (ctx) => handleRequest(ctx, "/listApp"));
router.get("/update", (ctx) => handleRequest(ctx, "/update"));
router.get("/auth", (ctx) => handleRequest(ctx, "/auth"));


app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port, alpnProtocols });

await db.addMK(await sec.generateKey());
await db.addUser("admin", "admin");

console.log(`Webserver running on Port ${port}`)

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
	switch(path) {

// ------- base (/) -------
			case "/":
				response.body = { message: await eventHandler.base() };
				break;

// ------- test -------
			case "/test":
				response.body = { message: await eventHandler.test() };
				break;

// ------- ping db -------
			case "/pingDB":
				response.body = { message: await eventHandler.pingDB() };
				break;
			
// ------- ping chkp -------
			case "/pingChkp":
				response.body = { message: await eventHandler.pingChkp() };
				break;

// ------- start manage -------
			case "/startManage":
				response.body = { message: await eventHandler.startManage(
					params["ip"],
				) };
				break;

// ------- stop manage -------
			case "/stopManage":
				response.body = { message: await eventHandler.stopManage(
					params["id"],
				) };
				break;

// ------- stop manage -------
			case "/getManaged":
				response.body = { message: await eventHandler.getManaged(
					params["getIdList"],
				) };
				break;

// ------- listApp -------
			case "/listApp":
	response.body = { message: await eventHandler.listApp(
		params["id"],
	) };
	break;

// ------- update -------
			case "/update":
	response.body = { message: await eventHandler.update() };
	break;

// ------- test token -------
			case "/auth":
				response.body = { message: await eventHandler.auth(
					params["user"],
					params["passwd"],
				)};
				break;

// ------- default -------
			default:
				response.body = { message: "Invalid endpoint" };
				response.status = 404;
				break;
		}
	ctx.response.headers.set("Content-Type", "application/json");	
	ctx.response.headers.set("Cache-Control", "no-cache");

	ctx.response.body = response.body;
	ctx.response.status = response.status || 200;
}





// // ------- addRoute-------
// case "/addRoute":
// 	response.body = { message: await eventHandler.getInt(
// 		params["id"],
// 		params["route"],
// 	)};
// 	break;

// // ------- getRoute -------
// case "/getRoute":
// 	response.body = { message: await eventHandler.getInt(
// 		params["id"],
// 	)};
// 	break;

// // ------- delRoute -------
// case "/delRoute":
// response.body = { message: await eventHandler.getInt(
// 	params["id"],
// )};
// break;