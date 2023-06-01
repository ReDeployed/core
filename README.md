# core

This Repo contains the full core sourcecode for the ReDeploy Stack

```bash
astro-src/
  ├─ Main Astro WebApp
deno-src/
  ├─ Deno Fetching Container that interacts with and provides APIs
surreal-src/
  ├─ SurrealDB Database and Helpers
proxy/
  ├─ Nginx Reverse Proxy with Config and Certificates
```

## Installing

This Stack can be installed via a simple oneliner.
It will autogenerate self signed SSL certs, which can later be changed.

```bash
wget -O installer.sh https://raw.githubusercontent.com/ReDeployed/core/master/install.sh && bash installer.sh
```

## License

GPL-3.0
