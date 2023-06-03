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
    
      const CPU = await checkpoint.getDiagnostics(SID, CHKP_IP, "cpu");
      console.log("CPU Diagnostics:");
      console.log(CPU);

      const MEMORY = await checkpoint.getDiagnostics(SID, CHKP_IP, "memory");
      console.log("Memory Diagnostics:");
      console.log(MEMORY);

      const DISK = await checkpoint.getDiagnostics(SID, CHKP_IP, "disk");
      console.log("Disk Diagnostics:");
      console.log(DISK);

    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  mainFunction();

