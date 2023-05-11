// These methodes handle the Database via Fetch

const PROTOCOL = "http";
const IP = "192.168.23.137";
const PORT = "8080"


class ClientDatabaseHandler{
	async api(path="") {
		let url = `${PROTOCOL}://${IP}:${PORT}/${path}`;
		try {
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				throw new Error("Request failed.");
			}
		} catch (error) {
			return error;
		}
	}
}


let db = new ClientDatabaseHandler();

console.log(await db.api("ping"));



// ------------- Export Database Class ------------- // 

export default ClientDatabaseHandler;