import { Application, Router, Response } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from 'https://deno.land/x/cors/mod.ts'

import EventHandler from "./eventHandler.js";
import DatabaseHandler from "./dbHandler.js";
import ChkpHandler from "./chkpHandler.js";
import Security from "./encryption.ts";

// Server
const port = 8080;
// const certFile = "./ca/ca-certificate.pem";
// const keyFile = "./ca/key.pem";
const alpnProtocols = ["h2", "http/1.1"];
const app = new Application();
const eventHandler = new EventHandler();
const db = new DatabaseHandler();
const chkp = new ChkpHandler();
const sec = new Security();

const router = new Router();

// Api Endpoints
router.get("/", (ctx) => handleRequest(ctx, "/"));
router.get("/test", (ctx) => handleRequest(ctx, "/test"));
router.get("/pingDB", (ctx) => handleRequest(ctx, "/pingDB"));
router.get("/pingChkp", (ctx) => handleRequest(ctx, "/pingChkp"));
router.get("/addApp", (ctx) => handleRequest(ctx, "/addApp"));
router.get("/listApp", (ctx) => handleRequest(ctx, "/listApp"));
router.get("/delApp", (ctx) => handleRequest(ctx, "/delApp"));
router.get("/chgApp", (ctx) => handleRequest(ctx, "/chgApp"));
router.get("/addToken", (ctx) => handleRequest(ctx, "/addToken"));
router.get("/getToken", (ctx) => handleRequest(ctx, "/getToken"));
router.get("/delToken", (ctx) => handleRequest(ctx, "/delToken"));
router.get("/testToken", (ctx) => handleRequest(ctx, "/testToken"));
router.get("/auth", (ctx) => handleRequest(ctx, "/auth"));



app.use(oakCors({
    origin: '*',
}))
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
	switch (path) {


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

// ------- addApp -------
			case "/addApp": 
				response.body = { message: await eventHandler.addApp(
					params["id"],
					params["hostname"],
					params["version"],
				) }
				break;

// ------- listApp -------
			case "/listApp":
				response.body = { message: await eventHandler.listApp(
					params["id"],
				) };
				break;

// ------- delApp -------
			case "/delApp":
				response.body = { message: await eventHandler.delApp(
					params["id"],
				)};
				break;

// ------- chgApp -------
			case "/chgApp":
				response.body = { message: await eventHandler.chgApp()};
				break;

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
	ctx.response.body = response.body;
	ctx.response.status = response.status || 200;
}
