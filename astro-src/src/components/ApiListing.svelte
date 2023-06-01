<script>
  import { onMount } from "svelte";

  let isLoading = true;
  let data = [];

  onMount(async () => {
    try {
      const res = await fetch("https://localhost:8080/listApp", {
        mode: "cors",
        method: "GET",
      });
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

  function redirectToPage(pageUrl) {
    window.location.href = pageUrl;
  }
</script>

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
        <li
          style="margin-bottom: 1rem; border-bottom: 1px solid black; display: flex;"
          key={item.id}
        >
          <div
            style="display: flex; flex-direction: column; align-items: center; margin-right: 1rem; margin-top: 3rem; width: 220px;"
          >
            <button
              on:click={() => redirectToPage("/edit/" + item.id.split(":")[1])}
              class="buttonfancy"
              style="margin-bottom: 0.5rem;">Edit</button
            >
            <button
              on:click={() => redirectToPage("/status/" + item.id.split(":")[1])}
              class="buttonfancy">Status</button
            >
          </div>
          <div>
            <h3 style="margin-bottom: 0.5rem; max-width: 500px;">
              {item.id.split(":")[1]}
            </h3>
            <p style="overflow: hidden; font-style: italic;">
                {item.version["product-version"]}<br>
                {item.version["os-kernel-version"]}<br>
                {item.version["os-edition"]}
            </p>
            <p style="font-size: 0.8rem; color: gray;">
              ID: {item.id}
            </p>
          </div>
        </li>
      {/each}
    </ul>
  </div>
{:else}
  <p>No data available.</p>
{/if}

<style>
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
