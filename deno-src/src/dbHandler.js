// Handles the local database

import Surreal from "https://deno.land/x/surrealdb@v0.7.3/mod.ts";
import Security from "./encryption.ts"

const sec = new Security();
const DB_URL = 'http://surreal:8000/rpc'

// ------------- Database Class ------------- //

// Database Handler
class DatabaseHandler{

// ------------- Database Functions ------------- // 

// ------- startManage -------
	async startManage(id, ip) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("manage", "manage");


			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

			entry = await db.update(`manage:${id}`, {
				id: id,
				ip: ip,
				updated_at: new Date(),
			})
			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

	// ------- getManaged -------
	async getManaged(getIdList = false) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("manage", "manage");
			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

			entry = await db.select("manage");

			if(getIdList) {
				const ids = entry.map(item => item.id);
				entry = ids;
			}

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

// ------- stopManage -------
	async stopManage(id) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("manage", "manage");

			if(id == "") {
				id = Math.random().toString(36).substr(2, 10);
			}

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

			entry = await db.delete(`manage:${id}`)
			db.close()
			return entry;
		} catch(e) {
			return e
		}s
	}



// ------------- Database Functions ------------- // 

// ------- ping -------
	async pingDB(/*token*/) {	
		try{
			const db = new Surreal(DB_URL);
			await db.signin({
				user: "root",
				pass: "root",
			})

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

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
		id,
		ip,
		diaCPU,
		diaMEM,
		interfaces,
		version,
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

			entry = await db.update(`appliance:${id}`, {
				id: id,
				ip: ip,
				updated_at: new Date(),
				diaCPU: diaCPU,
				diaMEM: diaMEM,
				interfaces: interfaces,
				version: version,
			})

			console.log(entry)

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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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

// ------- add interface -------
	async addInt(
		//token,
		id = Math.random().toString(36).substr(2, 10),
		app = "No Application", // interface owned by
		name = "No Interfacename",
		ip = "No IP",
		mask = "/24",
		nextHop = "1.2.3.4",
	) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("interface", "interface");

			if(id == "") {
				id = Math.random().toString(36).substr(2, 10);
			}

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

			entry = await db.create(`interface:${id}`, {
				id: id,
				app: app,
				name: name,
				ip: ip,
				mask: mask,
				nextHop: nextHop,
			})

			db.close()
			return entry;
		} catch(e) {
			return e
		}
	}

// ------- list interfaces -------
	async getInt(
		id,
		app,
	) {
		try{
			const db = new Surreal(DB_URL);
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("interface", "interface");

			if(id != undefined) {
				entry = await db.select(`interface:${id}`);
			} else if(app != undefined) {
				console.log("asdf");
				const result = await db.select("interface");
				entry = result.filter(entry => entry.app == app);
				return entry;
			} else {
				entry = await db.select("interface");
			} 

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }



			// entry = await db.query(`SELECT * FROM type::table($tb) WHERE type::table{app} = ${app};`, {
			// 	tb: "interface",
			// 	app: app,
			// });

			db.close()
			return entry
		} catch(e) {
			return e
		}
	}

// ------- delete interface -------
	async delInt(
		//token,
		id = ""
	) {	
		try{
			const db = new Surreal("http://0.0.0.0:8000/rpc");
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("interface", "interface");

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

			entry = await this.delete(`interface:${id}`);

			db.close()
			return entry
		} catch(e) {
			return e
		}
	}



// ------------- Diagnostics Functions ------------- // 

// ------- setDiagnostics -------
	async setDiagnostics(
		id = "",
		diaCPU,
		diaMEM,
	) {	
		try{
			const db = new Surreal("http://0.0.0.0:8000/rpc");
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("diagnostics", "diagnostics");

			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }

			entry = await db.update(`diagnostics:${id}`, {
				id: id,
				diaCPU: diaCPU,
				diaMEM: diaMEM,
			})

			console.log(entry);

			db.close()
			return entry
		} catch(e) {
			return e
		}
	}

// ------- getDiagnostics -------
	async getDiagnostics(
		id,
		type,
	) {	
		try{
			const db = new Surreal("http://0.0.0.0:8000/rpc");
			let entry;
			await db.signin({
				user: "root",
				pass: "root",
			})
			await db.use("diagnostics", "diagnostics");
	
			// if(!await this.compToken(token)) {
			// 	db.close();
			// 	throw "Invalid Token";
			// }
	
			const result = await db.select(`diagnostics:${id}`);
	
			switch(type) {
				case "cpu":
					entry = result["diaCPU"];
					break;

				case "mem": 
					entry = result["diaMEM"];
					break;
			
				default:
					entry = result;
					break;
			}

			console.log(entry);
			
			db.close()
			return entry
		} catch(e) {
			return e
		}
	}





// ------- add route -------
async addRoute(
	//token,
	id = Math.random().toString(36).substr(2, 10),
	app = "No Application", // interface owned by
	name = "No Interfacename",
	ip = "No IP",
	mask = "/24",
	nextHop = "1.2.3.4",
) {
	try{
		const db = new Surreal(DB_URL);
		let entry;
		await db.signin({
			user: "root",
			pass: "root",
		})
		await db.use("interface", "interface");

		if(id == "") {
			id = Math.random().toString(36).substr(2, 10);
		}

		// if(!await this.compToken(token)) {
		// 	db.close();
		// 	throw "Invalid Token";
		// }

		entry = await db.create(`interface:${id}`, {
			id: id,
			app: app,
			name: name,
			ip: ip,
			mask: mask,
			nextHop: nextHop,
		})

		db.close()
		return entry;
	} catch(e) {
		return e
	}
}

// ------- list route -------
async getRoute(
	id,
	app,
) {
	try{
		const db = new Surreal(DB_URL);
		let entry;
		await db.signin({
			user: "root",
			pass: "root",
		})
		await db.use("interface", "interface");

		if(id != undefined) {
			entry = await db.select(`interface:${id}`);
		} else if(app != undefined) {
			console.log("asdf");
			const result = await db.select("interface");
			entry = result.filter(entry => entry.app == app);
			return entry;
		} else {
			entry = await db.select("interface");
		} 

		// if(!await this.compToken(token)) {
		// 	db.close();
		// 	throw "Invalid Token";
		// }



		// entry = await db.query(`SELECT * FROM type::table($tb) WHERE type::table{app} = ${app};`, {
		// 	tb: "interface",
		// 	app: app,
		// });

		db.close()
		return entry
	} catch(e) {
		return e
	}
}

// ------- delete route -------
async delRoute(
	//token,
	id = ""
) {	
	try{
		const db = new Surreal("http://0.0.0.0:8000/rpc");
		let entry;
		await db.signin({
			user: "root",
			pass: "root",
		})
		await db.use("interface", "interface");

		// if(!await this.compToken(token)) {
		// 	db.close();
		// 	throw "Invalid Token";
		// }

		entry = await this.delete(`interface:${id}`);

		db.close()
		return entry
	} catch(e) {
		return e
	}
}

// ------- add interface to appliance -------

// ------- remove interface from device -------




// ------------- Security Functions ------------- // 

// ------- set master key ("should" be kept somwhere else) -------
	async addMK(key) {
		try{
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			return e;
		}
	}

// ------- delete user -------
	async delUser(user) {
		try{
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
			const db = new Surreal("http://0.0.0.0:8000/rpc");
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
