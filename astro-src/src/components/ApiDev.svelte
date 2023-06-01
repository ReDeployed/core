<script>
import { onMount } from "svelte";

let isLoading = true;
let data = [];
export let astroProp;
let new_data

onMount(async () => {
    try {
        const res = await fetch("https://localhost:8080/listApp?id=" + astroProp, {
            mode: "cors",
            method: "GET",
        });
        if (res.status == 200) {
            data = await res.json();
        } else {
            console.error("Failed to fetch data from the API.");
        }
        data = data["message"];
    } catch (error) {
        console.error("Error occurred while fetching data:", error);
    }

    isLoading = false; // Set isLoading to false regardless of API call success or failure
});

console.log(data)

</script>

{#if isLoading}
  <div class="loading-circle">
    <div class="loading-spinner" />
  </div>
{:else if data}
    {data.id}
{:else}
  <p>No data available.</p>
{/if}

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