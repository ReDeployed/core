// Start deno with "--unsafely-ignore-certificate-errors"

// const response = await fetch("https://192.168.23.137:8080/", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   insecure: true, // Disable SSL certificate verification
// });

// const data = await response.json();
// console.log(data);

// Webserver data
const PROTOCOL = "";
const IP = "";
const PORT = ""

export class ClientDatabaseHandler{
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


// Example usage & test
let db = new ClientDatabaseHandler();
console.log(await db.api("ping"));