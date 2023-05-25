// Handles the local Database
import Surreal from "https://deno.land/x/surrealdb/mod.ts";

// Filename
const filePath = import.meta.url;
const file = filePath.substring(filePath.lastIndexOf('/') + 1);
const DB_URL = 'http://surreal:8000/rpc';

// Database Handler
class DatabaseHandler{


// -------------- Database Functions --------------

// ------- ping -------

	async pingDB() {
		console.log(`${file}> \t pingDB`); // Logging
		try{
			let db = new Surreal(DB_URL);
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("test", "test");
			db.close()
		} catch(e) {
			return e
		}
		return "pong"
	}

	async addApp(
		id = Math.random().toString(36).substr(2, 10),
		hostname = "No Hostname",
		version = "No Version"
	) {
		console.log(`${file}> addApp`); // Logging
		try{
			let db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("appliance", "appliance");

			entry = await db.create(`appliance:${id}`, {
				id: id,
				updated_at: new Date(),
				hostname: hostname,
				version: version,
			})
			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

// ------- list applications -------

	async listApp(
		id = ""
	) {
		console.log(`${file}> listApp`); // Logging
		try{
			let db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("appliance", "appliance");

			if(id == "") {
				entry = await db.select("appliance");
			} else {
				entry = await db.select(`appliance:${id}`);
			}

			db.close()
			console.log(entry);
			return entry
		} catch(e) {
			return e
		}
	}

// ------- delete applications -------

async delApp(
	id = ""
) {
	console.log(`${file}> delApp`); // Logging
	try{
		let db = new Surreal(DB_URL);
		let entry;
		await db.signin({
			user: "root",
			pass: "root",
		})
		await db.use("appliance", "appliance");

		if(id == "") {
			entry = await db.delete("appliance");
		} else {
			entry = await db.delete(`appliance:${id}`);
		}

		db.close()
		return entry
	} catch(e) {
		return e
	}
}

// ------- change applications -------

async chgApp(
	id = "",
	field = "",
	value = "",
) {
	console.log(`${file}> chgApp`); // Logging
	try{
		let db = new Surreal(DB_URL);
		let entry;
		await db.signin({
			user: "root",
			pass: "root",
		})
		await db.use("appliance", "appliance");

			switch(field) {
				case "id":
					entry = await db.change(`appliance:${id}`, {
						id: value,
						updated_at: new Date(),
					});
					break;

				case "hostname":
					entry = await db.change(`appliance:${id}`, {
						hostname: value,
						updated_at: new Date(),
					});
					break;
				
				case "version":
					entry = await db.change(`appliance:${id}`, {
						version: value,
						updated_at: new Date(),
					});
					break;
			}

		db.close()
		return entry
	} catch(e) {
		return e
	}
}

}

export default DatabaseHandler;
