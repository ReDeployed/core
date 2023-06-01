// Handles the local database

import Surreal from "https://deno.land/x/surrealdb@v0.7.3/mod.ts";
import Security from "./encryption.ts"

const sec = new Security();
const DB_URL = 'http://surreal:8000/rpc'

// ------------- Database Class ------------- //

// Database Handler
class DatabaseHandler{

// ------------- Database Functions ------------- // 

// ------- ping -------
	async pingDB(token) {	
		try{
			const db = new Surreal(DB_URL);
			await db.signin({
				user: "root",
				pass: "root",
			})

			if(!await this.compToken(token)) {
				db.close();
				throw "Invalid Token";
			}



			await db.use("test", "test");
			db.close()
		} catch(e) {
			return e
		}
		return "pong"
	}

// ------- add Application -------
	async addApp(
		//token,
		id = Math.random().toString(36).substr(2, 10),
		hostname = "No Hostname",
		version = "No Version"
	) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("appliance", "appliance");

			if(id == "") {
				id = Math.random().toString(36).substr(2, 10);
			}

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

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
		//token, 
		id = ""
	) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("appliance", "appliance");

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

			console.log(id);

			if(id == "") {
				entry = await db.select("appliance");
			} else {
				entry = await db.select(`appliance:${id}`);
				console.log(id);
			}

			db.close()
			return entry
		} catch(e) {
			return e
		}
	}

// ------- delete applications -------
	async delApp(
		//token,
		id = ""
	) {	
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("appliance", "appliance");

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }


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
		//token,
		id = "",
		field = "",
		value = "",
	) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("appliance", "appliance");

			if(!await this.compToken(token)) {
				db.close();
				throw "Invalid Token";
			}


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


// ------------- Security Functions ------------- // 

// ------- set master key ("should" be kept somwhere else) -------
	async addMK(key) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("user", "user");

			entry = await db.update("user:masterKey", {
				mk: key,
			});

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

// ------- get master key -------
	async getMK() {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("user", "user");

			entry = await db.select("user:masterKey");

			db.close()
			return entry
		} catch(e) {
			return e
		}
	}

// ------- add token -------
	async addToken(passwd) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("user", "user");

			const key = await this.getMK()
			const token = await sec.createToken(key, passwd)

			entry = await db.update("user:token", {
				token: token,
				hashToken: await sec.hash("MD5", token),
			});

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

// ------- get token ------- 
	async getToken() {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})

			await db.use("user", "user");

			entry = await db.select("user:token");

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}



// ------------- Password Functions ------------- // 

// ------- add user ------- 
	async addUser(user, passwd) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("user", "user");

			const hashedPasswd = await sec.hash("SHA512", passwd);

			entry = await db.update(`user:${user}`, {
				user: user,
				passHash: hashedPasswd,
			});

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

// ------- delete user -------
	async delUser(user) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("user", "user");

			entry = await db.delete(`user:${user}`);

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

// ------- get user -------
	async getUser(user) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("user", "user");

			entry = await db.select(`user:${user}`);

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

	// ------- compare user -------
	async compUser(user, passwd) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("user", "user");


			const dbUser = await this.getUser(user);
			const dbUserName = dbUser["user"];
			const dbUserPasswd = dbUser["passHash"]

			const hashedPasswd = await sec.hash("SHA512", passwd);

			if(user == dbUserName && hashedPasswd == dbUserPasswd) {
				console.log(`${user} successfully authenticated`);
				entry = true;
			} else {
				console.log("Unsuccsessfull login attempt");
				entry = false;
			}

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

	// ------- compare user -------
	async compToken(token) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			

			const dbToken = await this.getToken();
			dbToken = dbToken["hashToken"];

			if(dbToken == token) {
				entry = true;
			} else {
				entry = false;
			}

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

}

// ------------- Export Database Class ------------- // 

export default DatabaseHandler;
