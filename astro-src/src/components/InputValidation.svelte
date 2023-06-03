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

<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-bottom: 1rem;
    width: max-content;
    margin-left: auto;
    margin-right: auto;
    max-width: 800px; /* Increase the max-width value as needed */
  }

  .input-field {
    width: 100%; /* Set the width of each input field */
    max-width: 300px; /* Adjust the maximum width as needed */
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #666;
    box-sizing: border-box;
  }

  .grid-item {
    display: flex;
    align-items: center;
  }

  .input-label {
    margin-right: 0.5rem;
  }


  .input-field:focus {
    outline: none; /* Remove the focus outline */
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }

  .button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }

  .button-primary {
    background-color: #ccc;
    margin-right: 2em;
    margin-left: 2em;
    color: white;
  }

  .results-container {
    padding-left: 10rem;
    margin-top: 2rem;
  }

  .valid {
    color: green;
  }

  .invalid {
    color: red;
  }
</style>

<h1 style="padding-left: 10rem;">Input Validation</h1>
<div class="grid-container">
  <div class="grid-item">
    <label for="ipAddress" class="input-label"></label>
    <input type="text" id="ipAddress" class="input-field" placeholder="IP Address" bind:value="{ipAddress}">
  </div>

  <div class="grid-item">
    <label for="subnetMask" class="input-label"></label>
    <input type="text" id="subnetMask" class="input-field" placeholder="Subnet Mask" bind:value="{subnetMask}">
  </div>

  <div class="grid-item">
    <label for="gateway" class="input-label"></label>
    <input type="text" id="gateway" class="input-field" placeholder="Gateway" bind:value="{gateway}">
  </div>

  <div class="grid-item">
    <label for="hostname" class="input-label"></label>
    <input type="text" id="hostname" class="input-field" placeholder="Hostname" bind:value="{hostname}">
  </div>
</div>
<div class="button-container">
  <button on:click="{validateFields}" class="button button-primary">Check Validity</button>
</div>
<div class="results-container">
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
