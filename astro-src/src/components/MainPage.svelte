<script>
    let isConfigHovered = false;
    let isAddHovered = false;

    function toggleConfigHover() {
        isConfigHovered = !isConfigHovered;
    }

    function toggleAddHover() {
        isAddHovered = !isAddHovered;
    }
</script>

<body>
    <head>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    </head>

    <div class="left-nav" style="position: fixed; height: 100%;">
        <ul>
            <li>
                <a href="/"><i class="fas fa-home"/></a>
            </li>
            <li>
                <a
                    href="/listing"
                    on:mouseenter={toggleConfigHover}
                    on:mouseleave={toggleConfigHover}>
                    <i class="fas fa-cog" class:darkened={isConfigHovered || isAddHovered}/>
                </a>
                <ul
                    class="add_optionbackground"
                    class:visible={isConfigHovered || isAddHovered}
                    on:mouseenter={toggleAddHover}
                    on:mouseleave={toggleAddHover}>
                    <li>
                        <a href="/listing"><i class="fas fa-plus"/></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/deploy"><i class="fas fa-code"/></a>
            </li>
            <li>
                <a href="/settings"><i class="fas fa-key"/></a>
            </li>
        </ul>
    </div>
    <h1 class="font-bold terminal-text">
        Welcome to Re:Deploy Firewall Manager<span class="blinking-underscore">_</span >
    </h1>
</body>

<style>
    .left-nav {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 60px;
        background-color: #1e4b82;
        color: #fff;
        z-index: 1;
    }

    .left-nav ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .left-nav li {
        position: relative;
    }

    .left-nav a {
        display: block;
        padding: 12px;
        text-decoration: none;
    }

    .left-nav a:hover {
        background-color: #1e1e1e;
    }

    .left-nav ul ul {
        position: absolute;
        top: 0;
        left: 100%;
        display: none;
    }

    .left-nav li:hover > ul {
        display: block;
    }

    .left-nav li a i {
        display: block;
        text-align: center;
        margin: 0 auto;
    }

    .left-nav a i {
        color: #fff;
    }

    .left-nav li a::before {
        font-family: "Font Awesome 5 Free";
        font-weight: 900;
        font-size: 16px;
        display: inline-block;
        margin-right: 10px;
    }

    .left-nav li ul li a::before {
        display: none;
    }

    /* Style the main content area */
    body {
        margin: 0;
        padding: 0;
        background-color: #3b689f;
        height: 100%;
    }

    body {
        min-height: 100vh;
        background-color: #3b689f;
        display: flex;
        flex-direction: column;
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
        padding-left: 3em;
    }

    .terminal-text:before {
        content: "$ ~❯";
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

    .add_optionbackground {
        background-color: #34495e;
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

    .left-nav ul ul {
        position: absolute;
        top: 0;
        left: 100%;
        display: none;
    }

    .add_optionbackground {
        background-color: #34495e;
    }

    .left-nav li:nth-child(2).visible a i.fas.fa-cog,
    .left-nav li:nth-child(2).visible a i.fas.fa-cog,
    .left-nav li:nth-child(2).visible ul.add_optionbackground,
    .left-nav li:nth-child(2).visible ul.add_optionbackground:hover,
    .left-nav li:nth-child(2):hover a i.fas.fa-cog,
    .left-nav li:nth-child(2):hover ul.add_optionbackground {
        color: #fff;
    }
</style>