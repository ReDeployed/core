// Handles events from webserver

import DatabaseHandler from "./dbHandler.js";
import ChkpHandler from "./chkpHandler.js";

const db = new DatabaseHandler();
const chkp = new ChkpHandler();

class EventHandler{

// ------- base (/) -------
	base() {
		return "Firewall manager online 👍";
	}

// ------- test -------
	test() {
		return "This is the test endpoint";
	}

// ------- ping db -------
	async pingDB() {
		return await db.pingDB();
	}

// ------- ping chkp -------
	async pingChkp() {
		try {
			return dbReturn = await db.ping()
		} catch (error) {
			return error;
		}
	}

// ------- addApp -------
	async addApp(
		id, hostname, version
	) {
		return await db.addApp(id, hostname, version);
	}

// ------- listApp -------
	async listApp(id) {
		return await db.listApp(id);
	}

// ------- delApp -------
	async delApp(
		id,
	) {
		return await db.delApp(id);
	}

// ------- chgApp -------
	async chgApp() {
		return;
	}

// ------- add token -------
	async addToken(key) {
		return await db.addToken(key);
	}

// ------- get token -------
	async getToken() {
		return await db.getToken();
	}

// ------- delete token -------
	async delToken() {
		return await db.delToken();
	}

// ------- test token -------
	async testToken() {
		return await db.testToken();
	}

// ------- auth -------
	async auth(user, passwd) {
		// Check if user exists

		console.log(user, passwd);

		if(await db.compUser(user, passwd)) {
			await db.addToken(passwd);
			const token = await db.getToken();
			return token["token"];
		} else {
			return "Unsuccsessfull login attempt"
		}
		
	}


}


// ------------- Export Event Class ------------- // 

export default EventHandler;