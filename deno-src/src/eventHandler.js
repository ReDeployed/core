
import DatabaseHandler from "./dbHandler.js";
import ChkpHandler from "./ChkpHandler.js";


// Filename
const filePath = import.meta.url;
const file = filePath.substring(filePath.lastIndexOf("/") + 1);

const db = new DatabaseHandler();
const chkp = new ChkpHandler();

class EventHandler{


// ------- base (/) -------

	async base() {
		console.log(`${file}> base`); // Logging
		return "Chkp geht 👍";
	}

// ------- test -------
	
	async test() {
		console.log(`${file}> test`); // Logging
		return "This is the test endpoint";
	}



// ------- ping db -------

	async pingDB() {
		console.log(`${file}> pingDB`); // Logging
		return await db.pingDB();
	}



// ------- ping chkp -------

	async pingChkp() {
		console.log(`${file}> pingChkp`); // Logging

		try {
			const dbReturn = db.ping()
		} catch (error) {
			return error;
		}
			
		return dbReturn;
	}



// ------- addApp -------
   
	async addApp(
		id, hostname, version
	) {
		console.log(`${file}> addApp`); // Logging
		return await db.addApp(id, hostname, version)
	}



// ------- listApp -------
	
	async listApp() {
		console.log(`${file}> listApp`); // Logging
		return await db.listApp();
	}



// ------- delApp -------
	
	async delApp() {
		console.log(`${file}> delApp`); // Logging
		return;
	}



// ------- chgApp -------
	
	async chgApp() {
		console.log(`${file}> chgApp`); // Logging
		return;
	}



}


// ------------- Export Event Class ------------- // 

export default EventHandler;