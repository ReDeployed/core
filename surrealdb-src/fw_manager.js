//import firewall_manager_instance from firewall_manager_instance.readJS;

//firewall manager class

let conf = "";

class fw_manager{
	constructor(confPath, fw_range, auth) {
		this.instances = [];
		this.confPath = confPath;
		this.dbAuth = 
		this.readConfig(this.confPath)
	}

	// read config file
	async readConfig(path) {
		if (path) {
			conf = await readJS(path);
			return this.test();
		}
	}

	// add new instance to manager
	createInstance(fw_range, auth, dbAuth) {
		this.instances.push(new firewall_manager_instance(fw_range, auth));
	}

	test() {
		console.log(conf);
		return;
	}

}

// reads json files
function readJS(path) {
	const file = import(path, {
		assert: { type: "json" },
	});
	return file;
}




const fw_manager_001 = await new fw_manager("./conf.json");

