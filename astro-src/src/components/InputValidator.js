function validateIpAddress(ipAddress) {
    const ipAddressRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    let ipAddressValid = ipAddressRegex.test(ipAddress);

    if (ipAddressValid) {
        const ipParts = ipAddress.split('.');
        ipAddressValid = ipParts.every(part => parseInt(part, 10) <= 253);
    }

    return ipAddressValid;
}

function validateSubnetMask(subnetMask) {
    const subnetMaskRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    if (!subnetMaskRegex.test(subnetMask)) {
        return false;
    }

    const octets = subnetMask
        .split('.')
        .map(Number);
    const binary = octets
        .map(octet => octet.toString(2).padStart(8, '0'))
        .join('');

    // Check if the binary representation has leading ones followed by zeros
    const leadingOnesRegex = /^1+0*$/;
    if (!leadingOnesRegex.test(binary)) {
        return false;
    }

    // Check if there are no gaps between the leading ones and trailing zeros
    const firstZeroIndex = binary.indexOf('0');
    const lastOneIndex = binary.lastIndexOf('1');
    if (firstZeroIndex !== -1 && firstZeroIndex < lastOneIndex) {
        return false;
    }

    return true;
}

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
  
  //Export the Functions
  export { validateIpAddress };
  export { validateSubnetMask };
  export { validateGateway };

  