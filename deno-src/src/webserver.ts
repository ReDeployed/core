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

// Manage list
router.get("/startManage", (ctx) => handleRequest(ctx, "/startManage"));
router.get("/getManaged", (ctx) => handleRequest(ctx, "/getManaged"));
router.get("/stopManage", (ctx) => handleRequest(ctx, "/stopManage"));

// Appliances
router.get("/addApp", (ctx) => handleRequest(ctx, "/addApp"));
router.get("/listApp", (ctx) => handleRequest(ctx, "/listApp"));
router.get("/delApp", (ctx) => handleRequest(ctx, "/delApp"));
router.get("/chgApp", (ctx) => handleRequest(ctx, "/chgApp"));
router.get("/addToken", (ctx) => handleRequest(ctx, "/addToken"));
router.get("/getToken", (ctx) => handleRequest(ctx, "/getToken"));
router.get("/delToken", (ctx) => handleRequest(ctx, "/delToken"));
router.get("/testToken", (ctx) => handleRequest(ctx, "/testToken"));
router.get("/auth", (ctx) => handleRequest(ctx, "/auth"));

// Update
router.get("/update", (ctx) => handleRequest(ctx, "/update"));

// Interfaces
router.get("/addInt", (ctx) => handleRequest(ctx, "/addInt"));
router.get("/getInt", (ctx) => handleRequest(ctx, "/getInt"));
router.get("/delInt", (ctx) => handleRequest(ctx, "/delInt"));

// Diagnostics
router.get("/diaCPU", (ctx) => handleRequest(ctx, "/diaCPU"));
router.get("/diaMEM", (ctx) => handleRequest(ctx, "/diaMEM"));

// Security 
router.get("/addToken", (ctx) => handleRequest(ctx, "/addToken"));
router.get("/getToken", (ctx) => handleRequest(ctx, "/getToken"));
router.get("/delToken", (ctx) => handleRequest(ctx, "/delToken"));
router.get("/testToken", (ctx) => handleRequest(ctx, "/testToken"));
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



// -------------- Appliance API Functions --------------

// ------- start manage -------
			case "/startManage":
				response.body = { message: await eventHandler.startManage(
					params["id"],
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


// -------------- Security API Functions --------------

// ------- add Token -------
			case "/addToken":
				response.body = { message: await eventHandler.addToken(
					params["key"],
				)};
				break;

// ------- get token -------
			case "/getToken":
				response.body = { message: await eventHandler.getToken()};
				break;

// ------- delete token -------
			case "/delToken":
				response.body = { message: await eventHandler.delToken()};
				break;
	
// ------- test token -------
			case "/testToken":
				response.body = { message: await eventHandler.testToken()};
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