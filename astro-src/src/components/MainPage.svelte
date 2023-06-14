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
                <a href="/listing"><i class="fas fa-cog"/></a>
            </li>
            <li>
                <a href="/settings"><i class="fas fa-key"/></a>
            </li>
        </ul>
    </div>
</body>

<style>


        .left-nav ul li a i {
            font-size: 1rem; /* Adjust the size of the icons as needed */
            transition: all 0.3s ease-in-out;
        }

        .left-nav ul li a:hover i {
            font-size: 1.5rem; /* Increase the size of the icons on hover */
            color: #6737e1; /* Change the color to the desired glowing effect */
            text-shadow: 0 0 10px #333333; /* Add a shadow effect */
        }

    .left-nav {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 60px;
        background-color: #272e3c;
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
        background-color: #333333;
    }

    .left-nav ul ul {
        position: absolute;
        top: 0;
        left: 100%;
        display: none;
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
        background-color: #1a202d;
        height: 100%;
    }

    body {
        min-height: 100vh;
        background-color: #1a202d;
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
        padding-top: 1em;
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

    .left-nav ul ul {
        position: absolute;
        top: 0;
        left: 100%;
        display: none;
    }



</style>