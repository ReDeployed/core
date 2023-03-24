<script>
	let menuItems = [
	  { name: 'Home', url: '#' },
	  { name: 'About', url: '#' },
	  { name: 'Deploy', url: '#' },
	  { name: 'Contact', url: '#' },
	];
  </script>
  
  <style>
	/* Style the navigation bar */
	.navbar {
    height: 100vh;
    background-color: #1e1e1e;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2rem;
    position: fixed;
    left: -200px; /* Move the navbar off-screen to the left */
    top: 0;
    width: 200px;
    animation: slide-in 0.5s forwards; /* Animate the navbar sliding in */
  }
  
	/* Style the menu items */
	.menu-item {
    padding: 1rem;
    text-decoration: none;
    color: #fff;
    font-size: 1.2rem;
    width: calc(100% - 2rem); /* Set the width to 100% minus the padding */
    box-sizing: border-box; /* Include the padding in the width calculation */
	border-radius: 20%;
	text-align: center;
  }
  
	.menu-item:hover {
	  background-color: #555;
	}
  
	/* Style the main content area */
	main {
	  margin-left: 250px; /* Set the margin to match the width of the navbar */
	  padding: 1rem;
	}

	@font-face {
    font-family: 'MyCustomFont';
    src: url('core\astro-src\public\fonts\CrampsRegular-OV7od.ttf') format('ttf');
  }

  h1 {
    font-family: 'MyCustomFont';
	font-size: 4em;
  }

	/* Define the animation */
	@keyframes slide-in {
		from {
		transform: translateX(-200px);
		}
		to {
		transform: translateX(+200px);
		}
	}

		.terminal {
		display: flex;
		flex-direction: column;
		width: 900px;
		height: 500px;
		border-radius: 10px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
		background-color: #1e1e1e;
		color: #fff;
		font-family: monospace;
		font-size: 16px;
		overflow: hidden;
		}

		.terminal-header {
		display: flex;
		align-items: center;
		height: 30px;
		background-color: #333;
		}

		.terminal-button {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		margin-right: 10px;
		}

		.red {
		margin-left: 1em;
		background-color: #f44336;
		}

		.yellow {
		background-color: #ffeb3b;
		}

		.green {
		background-color: #4caf50;
		}

		.terminal-body {
		flex: 1;
		padding: 20px;
		overflow: auto;
		}

		.terminal-line {
		line-height: 1.5;
		}

		.terminal-line::before {
		content: '$ ';
		color: #8bc34a;
		}

		.terminal-text {
  font-size: 3rem; /* adjust font-size as needed */
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-family: monospace;
  padding: 0.5rem 1rem;
  display: inline-block;
  position: relative;
}

.terminal-text:before {
  content: "$";
  color: #4c4cff;
  margin-right: 0.5rem;
  font-weight: bold;
}

.terminal-text:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 20px #4c4cff;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  z-index: -1;
}

.terminal-text:hover:after {
  opacity: 0.3;
}

.blinking-underscore {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}


  </style>
  
  <div class="navbar">
	{#each menuItems as item}
	  <a href="{item.url}" class="menu-item">{item.name}</a>
	{/each}
  </div>
  
  <main>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
	<h1 class="terminal-text">Welcome to ReDeploy Firewall Manager<span class="blinking-underscore">_</span></h1>
	<div class="terminal">
		<div class="terminal-header">
		  <div class="terminal-button red"></div>
		  <div class="terminal-button yellow"></div>
		  <div class="terminal-button green"></div>
		</div>
		<div class="terminal-body">
		  <div class="terminal-line">ReDeploy FireWall Manager</div>
		  <div class="terminal-line">ReDeploy FireWall Manager</div>
		  <div class="terminal-line">ReDeploy FireWall Manager</div>
		  <div class="terminal-line">ReDeploy FireWall Manager</div>
		  <div class="terminal-line">ReDeploy FireWall Manager</div>
		  <div class="terminal-line">ReDeploy FireWall Manager</div>
		</div>
	  </div>
	  
  </main>
  