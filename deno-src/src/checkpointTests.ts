import ChkpHandler from "./ChkpHandler.js";

//credentials and ip of A-GW
const CHKP_USER = "admin";
const CHKP_PASS = "Chkp!234";
const CHKP_IP = "10.1.1.1";

let checkpoint = new ChkpHandler();

//trying to get sid
const SID = checkpoint.getSID(CHKP_IP, CHKP_USER, CHKP_PASS);
console.log(SID);
