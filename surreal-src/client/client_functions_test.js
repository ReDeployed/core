import ClientDatabaseHandler from './client_functions.js';

async function test() {
	let db = new ClientDatabaseHandler();
	let response;
	let testList = [];
	let totalTests = 0;
	let successfulTests = 0;

	console.log("\n--- Begin of test --- \n\n");

	// TEST 001
	// Generall API Test
	// Expecting "API geht 👍"
	response = await db.api("");
	if(response.message == "API geht 👍") {
		console.log("TEST 1 -> Successful")
		testList.push(true);
	}else {
		console.log("TEST 1 -> Failed")
		testList.push(false);
	}

	// TEST 002
	// DB Ping Test
	// Expecting "pong"
	response = await db.api("ping");
	if(response.message == "pong") {
		console.log("TEST 2 -> Successful")
		testList.push(true);
	}else {
		console.log("TEST 2 -> Failed")
		testList.push(false);
	}

	// TEST 003
	// DB delete All
	// Expecting "Deleted All Firewalls"
	response = await db.api("deleteAll");
	if(response.message == "Deleted All Firewalls") {
		console.log("TEST 3 -> Successful")
		testList.push(true);
	}else {
		console.log("TEST 3 -> Failed")
		testList.push(false);
	}

	// TEST 004
	// DB Create - full
	// Expecting "appliance:SuppaID"
	response = await db.api("createApp?id=SuppaID&hostname=Hostname123&version=Version1");
	if(response.message.id == "appliance:SuppaID") {
		console.log("TEST 4 -> Successful")
		testList.push(true);
	}else {
		console.log("TEST 4 -> Failed")
		testList.push(false);
	}

	// TEST 05
	// DB List all
	// Expecting "Version1"
	response = await db.api("readAll");
	if(response.message[0].version == "Version1") {
		console.log("TEST 5 -> Successful")
		testList.push(true);
	}else {
		console.log("TEST 5 -> Failed")
		testList.push(false);
	}

	// TEST 06
	// DB Delete all
	// Expecting 
	response = await db.api("deleteAll");
	if(response.message == "Deleted All Firewalls") {
		console.log("TEST 5 -> Successful")
		testList.push(true);
	}else {
		console.log("TEST 5 -> Failed")
		testList.push(false);
	}



	console.log("\n\n--- End of test --- \n");

	testList.forEach(test => {
		totalTests ++;
		if(test) {
			successfulTests ++
		}
	})

	console.log(`${successfulTests} test(s) of ${totalTests} test(s) successful`)
}


await test();