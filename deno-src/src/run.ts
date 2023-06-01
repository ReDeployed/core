import DatabaseHandler from "./dbHandler.js";
import Security from "./encryption.ts";
import EventHandler from "./eventHandler.js";

const db = new DatabaseHandler();
const sec = new Security();
const event = new EventHandler();

class Run {

	async getBasicKey() {
		await db.addMK(await sec.generateKey());
		console.log(await db.getMK());
	}

	async genBasicUser() {
		await db.addUser("MeinUser", "MeinPasswort");
		console.log(await db.getUser("MeinUser"));
	}
}


let run = new Run();

await run.getBasicKey();
await run.genBasicUser();

