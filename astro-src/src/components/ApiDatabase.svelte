<script>
    import { onMount } from 'svelte';
  
    let data = [];
  
    const fetchData = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-chkp-sid': '25311697613662149136'
        },
        body: JSON.stringify({})
      };
  
      const res = await fetch('https://10.1.1.101:443/gaia_api/v1.5/show-interfaces', requestOptions);
      const jsonData = await res.json();
      data = jsonData.objects.map(obj => ({
        'ipv4-mask-length': obj['ipv4-mask-length'],
        'ipv4-address': obj['ipv4-address'],
        'name': obj['name']
      }));
    };
  
    onMount(() => {
      fetchData();
    });
  </script>
  
  <div style="padding-left: 2rem;">
    <ul style="list-style-type: none; padding: 0; max-width: 100%; overflow-x: hidden;">
      {#each data as item (item.ipv4-address)}
        <li style="margin-bottom: 1rem; border-bottom: 1px solid black; display: flex;" key={item.ipv4-address}>
          <div style="display: flex; flex-direction: column; align-items: center; margin-right: 1rem; margin-top: 3rem; width: 220px;">
            <button style="width: 100px; padding: 0.5rem 1rem; background-color: #333333; color: white; border: none; border-radius: 0.25rem; font-size: 1rem; margin-bottom: 0.5rem;">Edit</button>
            <button style="width: 100px; padding: 0.5rem 1rem; background-color: #333333; color: white; border: none; border-radius: 0.25rem; font-size: 1rem;">Delete</button>
          </div>
          <div>
            <h3 style="margin-bottom: 0.5rem; max-width: 500px;">{item.name}</h3>
            <p style="margin-bottom: 0.5rem; max-width: 500px; height: 100px; overflow: hidden;">IPv4 Address: {item['ipv4-address']}<br>IPv4 Mask Length: {item['ipv4-mask-length']}</p>
          </div>
        </li>
      {/each}
    </ul>
  </div>
  