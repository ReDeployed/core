import MgmtHandler from "../MgmtHandler.js";

//credentials and ip of A-BMS
const CHKP_USER = "admin";
const CHKP_PASS = "Chkp!234";
const CHKP_IP = "10.1.1.102";

let checkpoint = new MgmtHandler();

const SID = checkpoint.getMgmtSID(CHKP_IP, CHKP_USER, CHKP_PASS);

console.log(SID);

