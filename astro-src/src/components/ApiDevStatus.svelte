<script>

import { onMount } from "svelte";

let isLoading = true;
let data = [];
export let astroProp = ""

onMount(async () => {
    try {
        const res = await fetch("https://127.0.0.1:8080/listApp?id=" + astroProp, {
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

<div>
  {#if isLoading}
    <div class="loading-circle">
        <div class="loading-spinner" />
    </div>
  {:else if data}
    <div style="display: grid; width: 50%;">
        <p>Hostname: {data.id.split(":")[1]}</p>
        <p>IP-Address: {data.interfaces.objects[0]["ipv4-address"]}</p>
        <p>SubnetMask: {data.interfaces.objects[0]["ipv4-mask-length"]}</p>
    </div>
  {:else}
    <p>No data available.</p>
  {/if}
</div>
