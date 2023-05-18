<script>
    import {onMount} from 'svelte';

    let data = [];
    let picture = '/device-images.png'

    onMount(async () => {
        const headers = {
            'Authorization': 'Test',
            'Content-Type': 'application/json'
        };

        const options = {
            headers
        };

        const res = await fetch('https://api.sampleapis.com/coffee/hot', options);
        data = await res.json();
    });
</script>

<style>
    .button-container {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }

    .button {
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
    }

    .button:hover {
        background-color: #3e8e41;
    }
</style>

<div style="padding-left: 2rem;">
  <ul style="list-style-type: none; padding: 0; max-width: 100%; overflow-x: hidden;">
    {#each data as item (item.id)}
      <li style="margin-bottom: 1rem; border-bottom: 1px solid black; display: flex;" key={item.id}>
        <div style="display: flex; flex-direction: column; align-items: center; margin-right: 1rem; margin-top: 3rem; width: 220px;">
          <button style="width: 100px; padding: 0.5rem 1rem; background-color: #333333; color: white; border: none; border-radius: 0.25rem; font-size: 1rem; margin-bottom: 0.5rem;">Edit</button>
          <button style="width: 100px; padding: 0.5rem 1rem; background-color: #333333; color: white; border: none; border-radius: 0.25rem; font-size: 1rem;">Delete</button>
        </div>
        <div>
          <h3 style="margin-bottom: 0.5rem; max-width: 500px;">{item.title}</h3>
          <p style="margin-bottom: 0.5rem; max-width: 500px; height: 100px; overflow: hidden;">{item.description}</p>
          <p style="font-size: 0.8rem; color: gray;">ID: {item.id}</p>
        </div>
      </li>
    {/each}
  </ul>
</div>