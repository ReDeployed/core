<script>

import { onMount } from "svelte";

let isLoading = true;
let data = [];
export let astroProp;
const BASE_URL = "https://localhost:8080"

onMount(async () => {
    try {
        const res = await fetch(BASE_URL + "/listApp?id=" + astroProp);
        if (res.status == 200) {
            data = await res.json();
            data = data["message"];
        } else {
            console.error("Failed to fetch data from the API.");
        }
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
    }

    isLoading = false;
});

</script>

<style>
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


 .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 2rem;

  }

 .centered-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    border-radius: 1rem;
    border: 1px solid #ffffff;
    background-color: #1e4b82;
    padding: 1rem;
    margin-right: 5rem; /* Add margin-right to push the div 3rem to the right */
  }

  .centered-div input {
    width: 80%;
    max-width: 300px;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    color: #666;
    box-sizing: border-box;
  }

  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }

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
    background-color: #333333;
    color: white;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }

</style>
<div class="container">
  <div class="centered-div">
    {#if isLoading}
      <div class="loading-circle">
        <div class="loading-spinner"></div>
      </div>
    {:else if data}
      <h1>Edit: {data.id.split(":")[1]}</h1>
      <label for="host-In">Hostname</label><input id="host-In" value={data.id.split(":")[1]} class="input-field"><br>
      <label for="ip-In">IPAddress</label><input id="ip-In" value={data.interfaces.objects[0]["ipv4-address"]} class="input-field"><br>
      <label for="sub-In">SubnetMask</label><input id="sub-In" value={data.interfaces.objects[0]["ipv4-mask-length"]} class="input-field"><br>

      <div class="button-container">
        <button class="buttonfancy">Update</button>
    
        <button class="buttonfancy" onclick="window.location.href = '/listing';">Cancel</button>
        
      </div>
    {:else}
      <p>No data available.</p>
    {/if}
  </div>
</div>


