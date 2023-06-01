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
</style>

{#if isLoading}
  <div class="loading-circle">
    <div class="loading-spinner" />
  </div>
{:else if data}
    <div style="display: grid; width: 50%;">
        <label for="host-In">Hostname</label><input id="host-In" value={data.id.split(":")[1]}><br>
        <label for="ip-In">IPAddress</label><input id="ip-In" value={data.interfaces.objects[0]["ipv4-address"]}><br>
        <label for="sub-In">SubnetMask</label><input id="sub-In" value={data.interfaces.objects[0]["ipv4-mask-length"]}><br>
    </div>
{:else}
  <p>No data available.</p>
{/if}
