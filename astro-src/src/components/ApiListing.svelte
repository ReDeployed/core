<script>
  import { onMount, afterUpdate } from "svelte";
  import { tick } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { validateIpAddress } from './InputValidator.js';

  let terminalText = "Welcome to Re:Deploy Firewall Manager"; //40
  let newText = " Firewall Configs";
  let typingComplete = true;
  let ipAddress = '';
  let ipAddressValid = false;
  let showResults = false;
  let isLoading = true;
  let data = [];
  let showPopup = false;
  const BASE_URL = "https://localhost:8080"

  onMount(async () => {
    // update first
    try {
      const res = await fetch(BASE_URL + "/update");
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }

    // then fetch
    try {
      const res = await fetch(BASE_URL + "/listApp");
      if (res.status == 200) {
        data = await res.json();
      } else {
        console.error("Failed to fetch data from the API.");
      }
    } catch (error) {
      console.error("Error occurred while fetching data:", error);
    }

    isLoading = false; // Set isLoading to false regardless of API call success or failure
  });

 async function startMan(ip) {
    const res = await fetch(BASE_URL + "/startManage?ip=" + ip);
    if (res.status == 200) {
      console.log("Worked");
    } else {
      console.error("Failed to fetch data from the API.");
    }
  }

  function redirectToPage(pageUrl) {
    window.location.href = pageUrl;
  }


  function showPopupWindow() {
    showPopup = true;
  }

  function hidePopupWindow() {
    showPopup = false;
  }

  function handleInputChange(event) {
    ipAddress = event.target.value;
  }

  function handlePopupCancel() {
    hidePopupWindow();
    ipAddress = ""; // Reset the input value when canceling
  }

 function handlePopupSubmit() {
    if (ipAddressValid = validateIpAddress(ipAddress)) {
      showResults = true;
      startMan(ipAddress); // Call startMan function with the input value
      hidePopupWindow();
      ipAddress = ""; // Reset the input value after submission
    }
    else {
      showResults = true;
    }

  }

  async function deleteText() {
    for (let i = 0; i < 40; i++) {
      terminalText = terminalText.slice(0, -1);
      await tick();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    typingComplete = true;
  }


  async function typeText() {
    for (let i = 0; i < newText.length; i++) {
      terminalText += newText[i];
      await tick();
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }

 onMount(async () => {
    await deleteText();
    await typeText();
  });

  afterUpdate(() => {
    const terminal = document.getElementById("terminal");
    terminal.scrollTop = terminal.scrollHeight;
  });
</script>

<main>
  <h1 id="terminal" class="font-bold terminal-text">
    {#if typingComplete}
      {terminalText}
    {/if}
    <span class="blinking-underscore">_</span>
  </h1>
</main>

  <div class="flex justify-center items-center space-x-4">
    <button class="plus-button" on:click|stopPropagation={showPopupWindow}>
      <i class="fas fa-plus"></i>
    </button>

    {#if showPopup}
      <div class="popup-container">
        <div class="popup-content">
          <input
            type="text"
            id="ipAddress"
            class="popup-input"
            placeholder="Enter Firewall IP-Address"
            bind:value={ipAddress}
            on:input={handleInputChange}
          />
          
          {#if showResults}
            {#if ipAddressValid}
              <p class="valid">Valid IP-Address!</p>
            {:else}
              <p class="invalid">IP-Address Invalid/NotFound!</p>
            {/if}
          {/if}

          <div class="popup-buttons">
            <button class="submit-button" on:click={handlePopupSubmit}>Submit</button>
            <button class="cancel-button" on:click={handlePopupCancel}>Cancel</button>
          </div>
        </div>
      </div>
    {/if}
  </div>


  {#if isLoading}
    <div class="loading-circle">
      <div class="loading-spinner" />
    </div>
  {:else if data['message'].length > 0}
    <div style="padding-left: 2rem;">
      <ul
        style="list-style-type: none; padding: 0; max-width: 100%; overflow-x: hidden;"
      >
  {#each data['message'] as item}
    <li style="margin-bottom: 1rem; border-bottom: 1px solid black; display: flex;" key={item.id}>
  <div style="display: flex; align-items: center; margin-right: 1em; overflow: hidden; width: 100%">

    <div style="margin-right: 1rem; max-width: 100px; max-height: 100px; margin-left: 3rem; margin-right: 3rem">
    <img src="/img/DeviceImage.png" alt="Device Image" style="width: 100%; height: 100%;">  </div>

    <div style="flex-grow: 1; padding-left: 2em;">
      <h3 style="margin-bottom: 0.5rem; max-width: 500px; padding-top: 0.5em;">Firewall: {item.id.split(':')[1]}</h3>
      <p style="overflow: hidden; font-style: italic;">
        {item.version['product-version']}<br>
        {item.version['os-kernel-version']}<br>
        {item.version['os-edition']}
      </p>
      <p style="font-size: 0.8rem; color: gray;">ID: {item.id}</p>
    </div>

    <div style="display: flex; flex-direction: column; align-items: flex-end; margin-left: auto; padding-right: 3em">
      <button on:click={() => redirectToPage('/edit/' + item.id.split(':')[1])} class="buttonfancy" style="margin-bottom: 1rem; margin-top: 0.5rem">Edit</button>
      <button on:click={() => redirectToPage('/status/' + item.id.split(':')[1])} class="buttonfancy">Status</button>
    </div>

  </div>




    </li>
  {/each}
      </ul>
    </div>
  {:else}
    <p class="data-p">X - No data available.</p>
  {/if}
<style>

  .data-p {
    color: #6737e1;
    font-size: 2rem;
    padding-left: 3em;
  }

  /* Style the main content area */
    main {
        margin-left: 68px;
        /* Set the margin to match the width of the navbar */
        padding: 1rem;
        padding-left:0em;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .terminal-text {
        font-size: 3rem;
        /* adjust font-size as needed */
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        font-family: monospace;
        padding: 0.5rem 1rem;
        display: inline-block;
        position: relative;
        padding-left: 0em;
        padding-top: 0.5em;
        padding-bottom: 1em;
    }

    .terminal-text:before {
        content: "$ ~❯";
        color: #6737e1;
        margin-right: 0.5rem;
        font-weight: bold;
    }

    .terminal-text:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 20px #4c4cff;
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
        z-index: -1;
    }

    .terminal-text:hover:after {
        opacity: 0.3;
    }

    .blinking-underscore {
        animation: blink 1s infinite;
    }

    
    @keyframes blink {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

  .popup-container {
    position: fixed;
    top: 0;
    left: -1.5vw; /* Enlarge the left side by the width of the viewport */
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    overflow: hidden;
    transition: left 0.3s ease-in-out; /* Add transition for smooth animation */
  }

  .popup-content {
    /* Styles for the popup content */
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Add a shadow effect */
  }

  .popup-input {
    /* Styles for the input field */
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
  }

  .popup-buttons {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

  .submit-button,
  .cancel-button {
    padding: 0.5rem 1rem;
    background-color: #1e4b82;
    border: none;
    border-radius: 0.25rem;
    color: white;
    cursor: pointer;
    flex: 1; /* Distribute available space equally */
    margin: 0 0.5rem; /* Add margin between the buttons */
  }

  .plus-button {
    position: fixed;
    bottom: 20px; /* Adjust the value as per your requirement */
    right: 20px; /* Adjust the value as per your requirement */
    width: 40px; /* Adjust the value as per your requirement */
    height: 40px; /* Adjust the value as per your requirement */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    background-color: #272e3c; /* Light-Dark Blue */
    color: white;
    border-radius: 50%;
    z-index: 10; /* Adjust the z-index as needed to ensure the button appears above other elements */
    transition: box-shadow 0.3s ease-in-out; /* Add transition for the glowing effect */
  }

  .plus-button:hover {
    box-shadow: 0 0 10px 3px rgba(30, 75, 130, 0.8); /* Glowing effect on hover */
  }

  /* Existing styles */

  .buttonfancy {
    background-color: #4caf50;
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    border-radius: 0.25rem;
    width: 100px;
    padding: 0.5rem 1rem;
    background-color: #333333;
    color: white;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
  }
  .loading-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .loading-spinner {
    border: 8px solid #ffffff;
    border-top: 8px solid #333333;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>