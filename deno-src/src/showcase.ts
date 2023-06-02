import DatabaseHandler from "./dbHandler.js";
import Security from "./encryption.ts"

const sec = new Security();
const db = new DatabaseHandler();

const token = "91abe6919e1036c2cbfad8ac2e136550afc7b2832d8e6f914969daa8f0f55f8d3863421e30e7a623391da0def1698083";
const passwd = "admin"
const key = await db.getMK()

console.log(await sec.decryptAES(key, true, passwd, token))