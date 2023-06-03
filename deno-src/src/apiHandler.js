
// Filename
const filePath = import.meta.url;
const file = filePath.substring(filePath.lastIndexOf("/") + 1);

class ChkpHandler{

	// ------- pingChkp -------

	async pingChkp(id) {
		console.log(`${file}> \t addApp`); // Logging
		// API Ping
		return;
	}



	// ------- addApp -------

	async addApp(
		id, hostname, version
	) {
		console.log(`${file}> \t addApp`); // Logging
		// Add
		return;
	}



	// ------- listApp -------

	async listApp() {
		console.log(`${file}> \t listApp`); // Logging
		return;
	}



	// ------- delApp -------

	async delApp() {
		console.log(`${file}> \t delApp`); // Logging
		return;
	}



	// ------- chgApp -------

	async chgApp() {
		console.log(`${file}> \t chgApp`); // Logging
		return;
	}


}


// ------------- Export APIHandler Class ------------- // 

export default APIHandler;