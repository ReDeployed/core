function validateSubnetMask(subnetMask) {
    const subnetMaskRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;
    if (!subnetMaskRegex.test(subnetMask)) {
      return false;
    }
  
    const octets = subnetMask.split('.').map(Number);
    const binary = octets.map(octet => octet.toString(2).padStart(8, '0')).join('');
  
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
  
  export { validateSubnetMask };
  