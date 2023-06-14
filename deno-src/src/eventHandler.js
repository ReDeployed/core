// Handles events from webserver

import DatabaseHandler from "./dbHandler.js";
import SIMAPIHandler from "./chkpSim.js";
import ChkpHandler from "./chkpHandler.js"

const db = new DatabaseHandler();
const chkpSim = new SIMAPIHandler();
const chkHandler = new ChkpHandler();

class EventHandler{

	base() {
		return "Firewall manager online 👍";
	}

	test() {
		return "This is the test endpoint";
	}

	async pingDB() {
		return await db.pingDB();
	}

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

	async stopManage(id) {
		await db.stopManage(id);
		return db.delApp(id);
	}

	async getManaged(getIdList) {
		return await db.getManaged(getIdList);
	}

	async update() {
		const appList = await db.getManaged();
		for(const entry of appList) {
			const id = entry.id.split(":")[1];
			const ip = entry.ip;
			const SID = await chkHandler.getSID(ip, "admin", "p@ssw0rd");
			// Update
			return await db.addApp(
				id, 
				ip,
				await chkHandler.getDiagnostics(SID, ip, "cpu"),
				await chkHandler.getDiagnostics(SID, ip, "memory"),
				await chkHandler.getAllInterfaces(SID, ip),
				await chkHandler.getVersion(SID, ip),
			);
		}
	}

	async addApp(
		id, ip
	) {
		await db.startManage(id, ip);
		return await db.addApp(
			id, 
			ip,
			await chkpSim.showDiagnosticsCPU,
			await chkpSim.showDiagnosticsMEM,
			await chkpSim.showInterfaces,
			await chkpSim.showVersion,
		);
	}

	async listApp(id) {
		return await db.listApp(id);
	}

	async delApp(
		id,
	) {
		return await db.delApp(id);
	}

	async chgApp() {
		return;
	}

	async addToken(key) {
		return await db.addToken(key);
	}

	async getToken() {
		return await db.getToken();
	}

	async delToken() {
		return await db.delToken();
	}

	async testToken() {
		return await db.testToken();
	}

	async auth(user, passwd) {
		if(await db.compUser(user, passwd)) {
			await db.addToken(passwd);
			const token = await db.getToken();
			return token["token"];
		} else {
			return "Unsuccsessfull login attempt"
		}
		
	}
}

export default EventHandler;