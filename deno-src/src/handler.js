// Handles the local Database
import Surreal from "https://deno.land/x/surrealdb/mod.ts";

// Filename
const filePath = import.meta.url;
const file = filePath.substring(filePath.lastIndexOf('/') + 1);



// ------------- Database Class ------------- //

class DatabaseHandler{

// ------- ping -------

	async ping() {
		console.log(`${file}> ping`); // Logging
		try{
			let db = new Surreal('http://re-surreal:8000/rpc');
			await db.signin({
				user: 'root',
				pass: 'root',
			})
			await db.use('test', 'test');
			db.close()
		} catch(e) {
			return e
		}
		return "pong"
	}



// -------------- Database Functions --------------

// ----- read - Get Appliance -----

	async read(id) {
		console.log(`${file}> read`); // Logging
		// connection
		let db = new Surreal('http://127.0.0.1:8000/rpc');
		await db.signin({
			user: 'root',
			pass: 'root',
		})
		await db.use('appliance', 'appliance');

		// function
		let selected = await db.select("appliance:" + id);

		// Close connection
		db.close()
		return selected;
	}



// ----- readAll - Get All Appliances -----

	async readAll(type="appliance") {
		console.log(`${file}> readAll`); // Logging
		// connection
		let db = new Surreal('http://127.0.0.1:8000/rpc');
		await db.signin({
			user: 'root',
			pass: 'root',
		})
		await db.use('appliance', 'appliance');

		// function
		let all = await db.select(type);

		// Close connection
		db.close()
		return all;
	}



// ----- createApp - Create Appliance -----

	async createApp(
		appId="",
		appHostname="",
		appVersion="", 
	) {
		console.log(`${file}> createApp`); // Logging
		// connection
		let db = new Surreal('http://127.0.0.1:8000/rpc');
		await db.signin({
			user: 'root',
			pass: 'root',
		})
		await db.use('appliance', 'appliance');

		if(appId == "") {
			appId = Math.random().toString(36).substr(2, 10);
		}

		// Create firewall
		let createdApp = await db.create(`appliance:${appId}`, {
			identifier: appId,
			hostname: appHostname,
			version: appVersion,
		});

		// Close connection
		db.close()
		return createdApp;
	}



// ----- addVersion - Add Version -----

	async addVersion(
		verId, os_build, os_edition, os_kernel_version, product_version
	) {
		console.log(`${file}> addVersion`); // Logging
		// connection
		let db = new Surreal('http://127.0.0.1:8000/rpc');
		await db.signin({
			user: 'root',
			pass: 'root',
		})
		await db.use('appliance', 'appliance');

		let addedVersions = await db.change(`appliance:${verId}`, {
			os_build: os_build,
			os_edition: os_edition,
			os_kernel_version: os_kernel_version,
			product_version: product_version,
		})

		// Close connection
		db.close()
		return addedVersions;
	}



// ----- addRoutes - Add Routes -----

	async addRoutes() {
		return;
	}



// ----- addInt - Add Interfaces -----

	async addInt() {
		return;
	}





// ----- delAll - Delete All Firewall -----

	async delAll(type="appliance") {
		console.log(`${file}> delAll`); // Logging
		// connection
		let db = new Surreal('http://127.0.0.1:8000/rpc');
		await db.signin({
			user: 'root',
			pass: 'root',
		})
		await db.use('appliance', 'appliance');

		// function
		try {
			await db.delete(type);
		} catch (e) {
			console.log(e);
		}

		// Close connection
		db.close();
		return "delAll";
	}

}



// ------------- Export Database Class ------------- // 

export default DatabaseHandler;