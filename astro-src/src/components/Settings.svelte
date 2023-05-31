<script>
    import { onMount } from 'svelte';
  
    let token = '';
    let showToken = false;
  
    function copyToken() {
      console.log("Saving Token");
      console.log(token);
      navigator.clipboard.writeText(token);
    }
  
    function regenerateToken() {
      // Implement your logic to regenerate the token
      // and update the `token` variable with the new value
    }
  
    // Example onMount hook to fetch initial token value
    onMount(async () => {
      // Make your initial API request here to get the token
      // and assign it to the `token` variable
    });
  
    function updateToken(event) {
      token = event.target.value;
    }
  </script>
  <style>
    .button-container {
      display: flex;
      justify-content: center; /* Center the buttons horizontally */
      margin-top: 3rem;
    }
  
    .token-container {
      background-color: #1e4b82;
      color: white;
      padding: 1rem;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      margin-bottom: 1rem;
      margin-left: 20%;
      margin-right: 20%;
      height: 10em;
    }
  
    .token-label {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  
    .token-input {
      width: 95%;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 16px;
      margin-left: 1.5%;
    }
  
    .button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }
  
    .button-primary {
      background-color: #ccc;
      margin-right: 2em;
      margin-left: 2em;
      color: white;
    }
  
    .button-secondary {
      background-color: #ccc;
      color: black;
    }

    .selected .token-text {
        text-decoration: line-through;
        text-decoration-thickness: 2px;
    }


  </style>

<div class="token-container">
    <div class="token-label">Token:</div>
    <div class="input-container">
      <input
        class="token-input"
        type={showToken ? "text" : "password"}
        id="tokenInput"
        value={token}
        on:input={updateToken}
        readonly
      />
  
      <div class="button-container">
        <button class="button button-secondary" on:click={copyToken}>Copy Token</button>
        <button class="button button-primary" class:selected={showToken} on:click={() => (showToken = !showToken)}>
          <span class="token-text">{showToken ? "Show Token" : "Show Token"}</span>
        </button>
        <button class="button button-secondary" on:click={regenerateToken}>Regenerate Token</button>
      </div>
    </div>
  </div>