// Handles events from webserver

import DatabaseHandler from "./dbHandler.js";
import SIMAPIHandler from "./chkpSim.js";

const db = new DatabaseHandler();
const chkpSim = new SIMAPIHandler();

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

// ------- start manage -------
	async startManage(id, ip) {

		if(id == "" || id == undefined) {
			const hostname = await chkpSim.showHostname();
			id = hostname.name
		}

		console.log(id, ip);
		await db.startManage(id, ip);
		return await db.addApp(
			id, 
			ip,
			await chkpSim.showDiagnosticsCPU(),
			await chkpSim.showDiagnosticsMEM(),
			await chkpSim.showInterfaces(),
			await chkpSim.showVersion(),
			);


	}

// ------- stop manage -------
	async stopManage(id) {
		await db.stopManage(id);
		return db.delApp(id);
	}

// ------- start manage -------
	async getManaged(getIdList) {
		return await db.getManaged(getIdList);
	}

// ------- listApp -------
	async listApp(id) {
		return await db.listApp(id);
	}

// ------- addApp -------
	async addApp(
		id, ip
	) {
		await db.startManage(id, ip);
		await db.addApp(
			id, 
			ip,
			await chkpSim.showDiagnosticsCPU,
			await chkpSim.showDiagnosticsMEM,
			await chkpSim.showInterfaces,
			await chkp.getVersion,
			)
		
	}

// ------- update -------
	async update() {

		const appList = await db.getManaged();

		for(const entry of appList) {
			
			const id = entry.id.split(":")[1];
			const ip = entry.ip;

			// Update
			return await db.addApp(
				id, 
				ip,
				await chkpSim.showDiagnosticsCPU(),
				await chkpSim.showDiagnosticsMEM(),
				await chkpSim.showInterfaces(),
				await chkpSim.showVersion(),
				);	}


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