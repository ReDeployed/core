export function validateIpAddress(ipAddress) {
    const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    let ipAddressValid = ipAddressRegex.test(ipAddress);
  
    if (ipAddressValid) {
      const ipParts = ipAddress.split('.');
      ipAddressValid = ipParts.every(part => parseInt(part, 10) <= 253);
    }
  
    return ipAddressValid;
  }
  