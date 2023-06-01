// Handles Checkpoint Appliances

 
class APIHandler{

// ------- login -------
	async login() {
		const response = await fetch("https://10.1.1.101/gaia_api/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			user: "admin",
			password: "p@ssw0rd",
		}),
		});

		const data = await response.json();
		const sid = data.sid;

		return sid;
	}

// ------- get Version -------
	async getVersion(id) {
		const response = await fetch("https://10.1.1.101/gaia_api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: "admin",
				password: "p@ssw0rd",
			}),
			});
	
			const data = await response.json();
			return data
		return;
	}




	// # get version
// curl -s -k -X POST -H "X-chkp-sid:${CHKP_SID}" -H "Content-Type: application/json" -d "{}" https://<IP>:443/gaia_api/v1.7/show-version | jq .
// ------- addApp -------
	async addApp(
		id, hostname, version
	) {
		return;
	}

// ------- listApp -------
	async listApp() {
		// Return running config
		return;
	}

// ------- delApp -------
	async delApp() {
		// delete App
		return;
	}

// ------- chgApp -------
	async chgApp() {
		// change config
		return;
	}


}


// ------------- Export APIHandler Class ------------- // 

export default APIHandler;




// # GAIA API NTERACTION

// # Needed Packages
// - curl
// - jq





// # show interface
// curl -s -k -X POST -H "X-chkp-sid:${CHKP_SID}" -H "Content-Type: application/json" -d "{}" https://<IP>:443/gaia_api/v1.7/show-interfaces | jq .

// # set interface
// curl -s -k -X POST -H "X-chkp-sid:${CHKP_SID}" -H "Content-Type: application/json" -d "{"name":"eth0","comments":"test"}" https://<IP>:443/gaia_api/v1.7/set-physical-interface | jq .

// # Further Reference
// https://sc1.checkpoint.com/documents/latest/GaiaAPIs/#introduction~v1.7%20
