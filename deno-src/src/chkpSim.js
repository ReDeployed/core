// Simulates a checkpoint appliance

class SIMAPIHandler{ 
		// GET /show-version
		async getVersion() {
			const entry = await Deno.readTextFile("./simJSON/showVersion.json");
			return JSON.parse(entry);
		}

		// GET /show-hostname
		async getHostname() {		
			const entry = await Deno.readTextFile("./simJSON/showHostname.json");
			return JSON.parse(entry);
		}

		// GET /show-interfaces
		async getAllInterfaces() {		
			const entry = await Deno.readTextFile("./simJSON/showInterfaces.json");
			return JSON.parse(entry);
		}

		// POST /show-diagnostics CPU
		async getDiagnosticsCPU() {	
			const entry = await Deno.readTextFile("./simJSON/showDiagnosticsCPU.json");
			return JSON.parse(entry);
		}	

		// POST /show-diagnostics
		async getDiagnosticsMEM() {		
			const entry = await Deno.readTextFile("./simJSON/showDiagnosticsMEM.json");
			return JSON.parse(entry);
		}
}

// ------------- Export Database Class ------------- // 

export default SIMAPIHandler;
