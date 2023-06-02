// Handles events from webserver

import DatabaseHandler from "./dbHandler.js";
import SIMAPIHandler from "./chkpSim.js";
import ChkpHandler from "./ChkpHandler.js"

const db = new DatabaseHandler();
const chkpSim = new SIMAPIHandler();
const chkHandler = new ChkpHandler();

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
	async startManage(ip) {
        const SID = await chkHandler.getSID(ip, "admin", "p@ssw0rd");
        const hostname = await chkHandler.getHostname(SID, ip);
        let id = hostname.name
        await db.startManage(id, ip);
		return await db.addApp(
			id, 
			ip,
			await chkHandler.getDiagnostics(SID, ip, "cpu"),
			await chkHandler.getDiagnostics(SID, ip, "memory"),
			await chkHandler.getAllInterfaces(SID, ip),
			await chkHandler.getVersion(SID, ip),
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






// ------- diaCPU -------
	async diaCPU(id) {
		return await db.getDiagnostics(id, "cpu");
	}

// ------- diaMEM -------
	async diaMEM(id) {
		return await db.getDiagnostics(id, "mem");
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