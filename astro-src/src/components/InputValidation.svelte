<script>
  import { validateIpAddress, validateSubnetMask, validateGateway } from './InputValidator.js';

  let ipAddress = '';
  let subnetMask = '';
  let gateway = '';
  let hostname = '';
  let ipAddressValid = false;
  let subnetMaskValid = false;
  let gatewayValid = false;
  let showResults = false;

  function validateFields() {
    ipAddressValid = validateIpAddress(ipAddress);
    subnetMaskValid = validateSubnetMask(subnetMask);
    gatewayValid = validateGateway(gateway, ipAddress, subnetMask);
    showResults = true;
  }
</script>

<h1 style="padding-left: 10rem;">Input Validation</h1>

<div style="padding-left: 10rem;">
  <label for="ipAddress">IP Address:</label>
  <input type="text" id="ipAddress" bind:value="{ipAddress}">
</div>

<div style="padding-left: 10rem;">
  <label for="subnetMask">Subnet Mask:</label>
  <input type="text" id="subnetMask" bind:value="{subnetMask}">
</div>

<div style="padding-left: 10rem;">
  <label for="gateway">Gateway:</label>
  <input type="text" id="gateway" bind:value="{gateway}">
</div>

<div style="padding-left: 10rem;">
  <label for="hostname">Hostname:</label>
  <input type="text" id="hostname" bind:value="{hostname}">
</div>

<button on:click="{validateFields}" style="padding-left: 10rem;">Check Validity</button>

<div style="padding-left: 10rem;">
  {#if showResults}
      <p>Hostname: Hostname is hella valid sheeeesh</p>
    {#if ipAddressValid}
      <p class="valid">Valid IP address!</p>
    {:else}
      <p class="invalid">Invalid IP address!</p>
    {/if}

    {#if subnetMaskValid}
      <p class="valid">Valid Subnet Mask!</p>
    {:else}
      <p class="invalid">Invalid Subnet Mask!</p>
    {/if}

    {#if gatewayValid}
      <p class="valid">Valid Gateway!</p>
    {:else}
      <p class="invalid">Invalid Gateway or IP-Address/Mask Input!</p>
    {/if}
  {/if}
</div>
