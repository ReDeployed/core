<script>

import { onMount } from "svelte";

let isLoading = true;
let data = [];
export let astroProp;

onMount(async () => {
    try {
        const res = await fetch("https://localhost:8080/listApp?id=" + astroProp, {
            mode: "cors",
            method: "GET",
        });
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
      <h1>Status of: {data.id.split(":")[1]}</h1>
      <label for="host-In">Hostname</label><input id="host-In" value={data.id.split(":")[1]} class="input-field" readonly><br>
      <label style="padding-top: 10px;" for="memfr-In">Memory Load</label><input id="memfr-In" value={data.diaMEM.objects[0]["free"]} class="input-field"  readonly><br>
      <label style="padding-top: 10px;" for="memus-In">Memory Used</label><input id="memus-In" value={data.diaMEM.objects[0]["used"]} class="input-field"  readonly><br>
      <label style="padding-top: 10px;" for="memtot-In">Memory Total</label><input id="memtot-In" value={data.diaMEM.objects[0]["total"]} class="input-field"  readonly><br>

      <h1>Interfaces:</h1>
      {#each data.interfaces.objects as inter}
      <div class="container" style="width: 80%;">
        <div class="centered-div" style="border: solid 2px white; margin: 0 auto;">
            <label for="name-In">Name</label><input id="name-In" value={inter["name"]} class="input-field"  readonly><br>
            <label style="padding-top: 10px;" for="type-In">Type</label><input id="type-In" value={inter["type"]} class="input-field"  readonly><br>
            <label style="padding-top: 10px;" for="ip-In">IP Address</label><input id="ip-In" value={inter["ipv4-address"]} class="input-field"  readonly><br>
            <label style="padding-top: 10px;" for="sub-In">Subnet Mask</label><input id="sub-In" value={inter["ipv4-mask-length"]} class="input-field"  readonly><br>
        </div>
      </div>
      {/each}

      <div class="button-container">
        <button class="buttonfancy" onclick="window.location.href = '/listing';">Return</button>
      </div>
    {:else}
      <p>No data available.</p>
    {/if}
  </div>
</div>


