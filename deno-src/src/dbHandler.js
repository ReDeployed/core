// Handles the local Database
import Surreal from "https://deno.land/x/surrealdb/mod.ts";

// Filename
const filePath = import.meta.url;
const file = filePath.substring(filePath.lastIndexOf("/") + 1);



// ------------- Database Class ------------- //

class DatabaseHandler{


// -------------- Database Functions --------------

// ------- ping -------

	async ping() {
		console.log(`${file}> ping`); // Logging
		try{
			let db = new Surreal("http://0.0.0.0:8000/rpc");
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


// ------- add Application -------

	async addApp(
		id = Math.random().toString(36).substr(2, 10),
		hostname = "No Hostname",
		version = "No Version"
	) {
		console.log(`${file}> addApp`); // Logging
		try{
			let db = new Surreal("http://0.0.0.0:8000/rpc");
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("appliance", "appliance");

			entry = await db.create(`appliance:${id}`, {
				id: id,
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
			let db = new Surreal("http://0.0.0.0:8000/rpc");
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
		let db = new Surreal("http://0.0.0.0:8000/rpc");
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
		return entry
	} catch(e) {
		return e
	}
}

// ------- change applications -------

}



// ------------- Export Database Class ------------- // 

export default DatabaseHandler;