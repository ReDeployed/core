function validateGateway(gateway, ipAddress, subnetMask) {
    // Check if IP address is entered
    if (ipAddress.trim() === '') {
      return false;
    }
  
    // Check if gateway is entered
    if (gateway.trim() === '') {
      return false;
    }
  
    // Validate IP address format
    const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipAddressRegex.test(ipAddress)) {
      return false;
    }
  
    // Validate gateway format
    if (!ipAddressRegex.test(gateway)) {
      return false;
    }
  
    // Check if IP address and gateway are the same
    if (ipAddress === gateway) {
      return false;
    }
  
    // Check if IP address and gateway are in the same network
    const ipAddressParts = ipAddress.split('.');
    const gatewayParts = gateway.split('.');
    const subnetMaskParts = subnetMask.split('.');
  
    for (let i = 0; i < 4; i++) {
      const ipOctet = parseInt(ipAddressParts[i], 10);
      const gatewayOctet = parseInt(gatewayParts[i], 10);
      const subnetMaskOctet = parseInt(subnetMaskParts[i], 10);
  
      if ((ipOctet & subnetMaskOctet) !== (gatewayOctet & subnetMaskOctet)) {
        return false;
      }
    }
  
    return true;
  }
  
  export { validateGateway };
  