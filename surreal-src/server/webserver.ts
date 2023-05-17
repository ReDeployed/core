import { Application, Router, Response } from "https://deno.land/x/oak/mod.ts";


import DatabaseHandler from "./handler.js";

const port = 8080;
const certFile = "./auth/my-ca-certificate.crt";
const keyFile = "./auth/my-key.pem";
const alpnProtocols = ["h2", "http/1.1"];
const file = "webserfer.ts>"
const app = new Application();
const db = new DatabaseHandler();

const router = new Router();

// API Functions
router.get("/", (ctx) => handleRequest(ctx, "/"));
router.get("/test", (ctx) => handleRequest(ctx, "/test"));
router.get("/ping", (ctx) => handleRequest(ctx, "/ping"));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port, certFile, keyFile, alpnProtocols });

console.log(`${file} Started Webserver`);

async function handleRequest(ctx: any, path: string) {
	const response = new Response();

	console.log(ctx);
	console.log(path);

	// -------------- Simple API Functions --------------

	switch (path) {
			case "/":
				response.body = { message: "API geht 👍" };
				break;
			
			case "/test":
				response.body = { message: "This is the test endpoint" };
				break;

			case "/ping":
				response.body = { message: await db.ping() };
				break;

			default:
				response.body = { message: "Invalid endpoint" };
				response.status = 404;
				break;
		}
	ctx.response.headers.set("Content-Type", "application/json");
	ctx.response.body = response.body;
	ctx.response.status = response.status || 200;
}
