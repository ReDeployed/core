import ChkpHandler from "../ChkpHandler.js";

//credentials and ip of A-GW
const CHKP_USER = "admin";
const CHKP_PASS = "Chkp!234";
const CHKP_IP = "10.1.1.1";

let checkpoint = new ChkpHandler();

async function mainFunction() {
    try {
      const SID = await checkpoint.getSID(CHKP_IP, CHKP_USER, CHKP_PASS);
      console.log('SID:', SID);
    
      const ROUTE = await checkpoint.addStaticRoute(SID, CHKP_IP, "172.16.0.0", 24, "gateway", "172.16.0.1", 4);
      console.log('New Route:', ROUTE);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  mainFunction();

