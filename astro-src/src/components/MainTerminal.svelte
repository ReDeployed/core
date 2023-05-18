<script>
  </script>
  <style>
/* Style the main content area */

	main {
		margin-left: 100px; /* Set the margin to match the width of the navbar */
		padding: 1rem;
		height: 100%;
		display: flex;
  		flex-direction: column;
  		flex: 1;
	}


	.terminal {
    display: flex;
    flex-direction: column;
    width: 97%;
	height: 70vh;
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
			height: auto;
		}

		.terminal-line {
		line-height: 1.5;
		}

		.terminal-line::before {
		content: '$ ~ ❯ ';
		color: #8bc34a;
		}



.text-terminal-line {
	margin-bottom: 0;
	margin: 0;
  	margin-right: 0.5rem;
	margin-left: 0.5em;
	
}

.text-terminal-line:before {
  content: attr(data-terminal-line) " ";
  color: #444444;
}


.loading-text {
  color: #8bc34a;
  text-shadow: 0 0 5px #8bc34a;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    opacity: 0.2;
    text-shadow: 0 0 5px #8bc34a;
  }
  20% {
    opacity: 1;
    text-shadow: none;
  }
  80% {
    opacity: 1;
    text-shadow: none;
  }
  100% {
    opacity: 0.2;
    text-shadow: 0 0 5px #8bc34a;
  }
}


  </style>
  <main>
	<head>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
	</head>
	
	<div class="terminal">
		<div class="terminal-header">
		  <div class="terminal-button red"></div>
		  <div class="terminal-button yellow"></div>
		  <div class="terminal-button green"></div>
		</div>
		<div class="terminal-body">
		  <div class="terminal-line">ls -la</div>
		  <p class="text-terminal-line" data-terminal-line=" ">-> Introductiosn.txt  /  Exploit.txt  /  .credentials.bin</p>
		  <p></p>
		  <div class="terminal-line">cat Introductions.txt</div>
		  <p class="text-terminal-line" data-terminal-line="01">What is the Re:Deploy FireWall Manager?</p>
		  <p class="text-terminal-line" data-terminal-line="02"></p>
		  <p class="text-terminal-line" data-terminal-line="03"> - Re:Deploy is a Firewall Manager that primarily targets CheckPoint Appliances. </p>
		  <p class="text-terminal-line" data-terminal-line="04"> - We strive to build it using modern tools and frameworks like:</p>
		  <p class="text-terminal-line" data-terminal-line="05">&nbsp;&nbsp; - Astro</p>
		  <p class="text-terminal-line" data-terminal-line="06">&nbsp;&nbsp; - Svelte</p>
		  <p class="text-terminal-line" data-terminal-line="07">&nbsp;&nbsp; - SurrealDB.</p>
		  <p class="text-terminal-line" data-terminal-line="08"></p>
		  <p class="text-terminal-line" data-terminal-line="09"> - Most of the configuration will be handled by Ansible or Python scripts.</p>
		  <p class="text-terminal-line" data-terminal-line="10"> - Whilste doind that we try to keep the network traffic and API calls at a minimal level</p> 
		  <p class="text-terminal-line" data-terminal-line="11"> - Features include:</p>
		  <p class="text-terminal-line" data-terminal-line="12">&nbsp;&nbsp - Bulk Config</p>
		  <p class="text-terminal-line" data-terminal-line="13">&nbsp;&nbsp - Deployment and Monitoring</p>
		  <p class="text-terminal-line" data-terminal-line="14">&nbsp;&nbsp - Optional Wazuh Integration for basic SIEM features.</p>
		  <p></p>
		  <div class="terminal-line">reboot</div>
		  <p class="terminal-line loading-text">. . .</p>

		</div>
	  </div>
	  
  </main>	