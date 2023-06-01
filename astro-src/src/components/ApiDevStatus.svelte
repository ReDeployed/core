<script>
import { onMount } from "svelte";

let isLoading = true;
let data = [];
export let astroProp = ""

onMount(async () => {
    try {
    const res = await fetch("https://10.10.7.121:8080/listApp?id=" + astroProp.split(":")[1], {
        mode: "cors",
        method: "GET",
    });
    if (res.status == 200) {
        data = await res.json()
    } else {
        console.error("Failed to fetch data from the API.");
    }
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
    }

    isLoading = false; // Set isLoading to false regardless of API call success or failure
});
</script>

<div>
  {#if isLoading}
    <p>Loading...</p>
  {:else if data.length > 0}
    <img src='../public/img/DeviceImage.png' alt="Image" style="float: left; margin-right: 10px;" />
    <p><u>Information:</u></p>
    <p>IP-Address: {data.ipAddress}</p>
    <p>SubnetMask: {data.subnetMask}</p>
    <p>Gateway: {data.gateway}</p>
    <p>Hostname: {data.hostname}</p>
  {:else}
    <p>No data available.</p>
  {/if}
</div>