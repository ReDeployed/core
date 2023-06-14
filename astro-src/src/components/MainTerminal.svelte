<script>
</script>

<style>
/* Style the main content area */
main {
    margin-left: 100px;
    /* Set the margin to match the width of the navbar */
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
    background-color: #272e3c;
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
    color: #6737e1;
}

.text-terminal-line {
    margin: 0 0.5rem 0 0.5em;

}

.text-terminal-line:before {
    content: attr(data-terminal-line) " ";
    color: #c0c0c0;
}

.loading-text {
    color: #ffffff;
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

    .terminal-text {
        font-size: 3rem;
        /* adjust font-size as needed */
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        font-family: monospace;
        padding: 0.5rem 1rem;
        display: inline-block;
        position: relative;
        padding-left: 0em;
        padding-top: 0.5em;
        padding-bottom: 1em;
    }

    .terminal-text:before {
        content: "$ ~❯";
        color: #6737e1;
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
        box-shadow: 0 0 20px #4c4cff;
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

<main>
    <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    </head>

    <h1 class="font-bold terminal-text">
        Welcome to Re:Deploy Firewall Manager<span class="blinking-underscore">_</span >
    </h1>

    <div class="terminal">
        <div class="terminal-header">
            <div class="terminal-button red"></div>
            <div class="terminal-button yellow"></div>
            <div class="terminal-button green"></div>
            </div>
            <div class="terminal-body">
            <div class="terminal-line">ls -la</div>
            <p class="text-terminal-line" data-terminal-line=" ">-&gt; Introduction.txt</p>
            <br>
            <div class="terminal-line">cat Introduction.txt</div>
            <p class="text-terminal-line" data-terminal-line="01">What is the Re:Deploy FireWall Manager?</p>
            <p class="text-terminal-line" data-terminal-line="02"></p>
            <p class="text-terminal-line" data-terminal-line="03"> - ReDeploy is a Firewall Manager that primarily targets CheckPoint Appliances. </p>
            <p class="text-terminal-line" data-terminal-line="04"> - We strive to build it using modern tools and frameworks like:</p>
            <p class="text-terminal-line" data-terminal-line="05">&nbsp;&nbsp; - Astro</p>
            <p class="text-terminal-line" data-terminal-line="06">&nbsp;&nbsp; - Svelte</p>
            <p class="text-terminal-line" data-terminal-line="07">&nbsp;&nbsp; - SurrealDB.</p>
            <p class="text-terminal-line" data-terminal-line="08"></p>
            <p class="text-terminal-line" data-terminal-line="09"> - Whilste doing that we try to keep the network traffic and API calls minimal</p> 
            <p class="text-terminal-line" data-terminal-line="10"> - Features include:</p>
            <p class="text-terminal-line" data-terminal-line="11">&nbsp;&nbsp - Bulk Config</p>
            <p class="text-terminal-line" data-terminal-line="12">&nbsp;&nbsp - Deployment and Monitoring</p>
            <br>
            <div class="terminal-line">reboot</div>
            <p class="terminal-line loading-text">. . .</p>
        </div>
    </div>
</main>
