// Simulates a checkpoint appliance

class SIMAPIHandler{ 
		// GET /show-version
		async showVersion() {
			const entry = await Deno.readTextFile("./simJSON/showVersion.json");
			return JSON.parse(entry);
		}

		// GET /show-hostname
		async showHostname() {		
			const entry = await Deno.readTextFile("./simJSON/showHostname.json");
			return JSON.parse(entry);
		}

		// GET /show-interfaces
		async showInterfaces() {		
			const entry = await Deno.readTextFile("./simJSON/showInterfaces.json");
			return JSON.parse(entry);
		}

		// POST /show-diagnostics CPU
		async showDiagnosticsCPU() {	
			const entry = await Deno.readTextFile("./simJSON/showDiagnosticsCPU.json");
			return JSON.parse(entry);
		}	

		// POST /show-diagnostics
		async showDiagnosticsMEM() {		
			const entry = await Deno.readTextFile("./simJSON/showDiagnosticsMEM.json");
			return JSON.parse(entry);
		}
}

// ------------- Export Database Class ------------- // 

export default SIMAPIHandler;
