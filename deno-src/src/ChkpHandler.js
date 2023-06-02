class ChkpHandler{

    // get Check Point Session-ID, simplifies future Gaia-API calls

    async getSID(
        ip, user, pass
    ) {
        try {
            let chkpSid = await fetch(`https://${ip}:443/gaia_api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                password: pass
            })
            })

            chkpSid = await chkpSid.json();
            //console.log(chkpSid['sid']);
            return chkpSid['sid'];


        } catch (error) {
            console.log('Error:', error);
            return null;
        }
    }


    // get version of appliance

    async getVer(
        sid, ip
    ) {       
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-version`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const VERSION = await RESPONSE.json();

            return VERSION;

        } catch (error) {
            console.log(error);
            return null;
        }
    }


    // get hostname of appliance

    async getHostname(
        sid, ip
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-hostname`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const HOSTNAME = await RESPONSE.json();

            return HOSTNAME;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }   
    }


    // get all interfaces from the appliance

    async getAllInterfaces(
        sid, ip
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-interfaces`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const ALL_INTERFACES = await RESPONSE.json();

            return ALL_INTERFACES;

        } catch (error) {
            console.log('Error:', error);
            return null;
        } 
    }

    // get a specific interface from the appliance

    async getInterface(
        sid, ip, int
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-interface`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": int //train of thought: either get int from getAllInterfaces() or put it in manually somehow
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const INTERFACE = await RESPONSE.json();

            return INTERFACE;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }        
    }


    // change a physical interface
    // intIp and intSub = ip and subnet for interface

    async setInterfaceIP(
        sid, ip, int, intIp, intSub
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/set-physical-interface`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": int,
                "ipv4-address": intIp,
                "ipv4-mask-length": intSub
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            } else {
                console.log(`Successfully updated ${int}!`);
            }

            const INTERFACE = await RESPONSE.json();

            return INTERFACE;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }        
    }

    async switchInterfaceOn(
        sid, ip, int
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/set-physical-interface`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": int,
                "enabled": true
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            } else {
                console.log(`${int}: state up`)
            }

            const INTERFACE = await RESPONSE.json();

            return INTERFACE;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }        
    }

    async switchInterfaceOff(
        sid, ip, int
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/set-physical-interface`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": int,
                "enabled": false
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            } else {
                console.log(`${int}: state down`)
            }

            const INTERFACE = await RESPONSE.json();

            return INTERFACE;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }        
    }

    // show all static routes

    async getStaticRoutes(
        sid, ip
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-static-routes`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const STATIC_ROUTES = await RESPONSE.json();

            return STATIC_ROUTES;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }        
    }

    // get version of appliance
    async getVer(
        sid, ip
    ) {       
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-version`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const VERSION = await RESPONSE.json();

            return VERSION;

        } catch (error) {
            console.log(error);
            return null;
        }
    }
    // add a static route

    /*
    net = Network-IP
    subnet = self explanatory
    type = either gateway/blackhole/reject
    gw = gateway, basically the next hop
    prio = static route priority from 1 - 8
    */

    async addStaticRoute(
        sid, ip, net, subnet, type, gw, prio
    ) {

        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/set-static-route`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "address": net,
                "mask-length": subnet,
                "next-hop": {
                    "gateway": gw,
                    "priority": prio
                },
                "type": type
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const ROUTE = await RESPONSE.json();

            return ROUTE;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }        
    }

    // get hostname of appliance
    async getHostname(
        sid, ip
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-hostname`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const HOSTNAME = await RESPONSE.json();

            return HOSTNAME;
        } catch (error) {
            console.log('Error:', error);
            return null;
        }
    }
    // delete a static route
    // net and subnet parameter same as addStaticRoute()

    async delStaticRoute(
        sid, ip, net, subnet
    ) {

        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/delete-static-route`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "address": net,
                "mask-length": subnet
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            } else {
                console.log("Success!");
            }

            const ROUTE = await RESPONSE.json();

            return ROUTE;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }   
    }

    // get all interfaces from the appliance
    async getAllInterfaces(
        sid, ip
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-interfaces`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const ALL_INTERFACES = await RESPONSE.json();

            return ALL_INTERFACES;
        } catch (error) {
            console.log('Error:', error);
            return null;
        }
    }
    // get Diagnostics
    // type = memory/disk/cpu

    async getDiagnostics(
        sid, ip, type
    ) {

        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-diagnostics`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "category": "os",
                "topic": type
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const DIAGOSTICS = await RESPONSE.json();
            //console.log(DIAGOSTICS);
            return DIAGOSTICS;

        } catch (error) {
            console.log('Error:', error);
            return null;
        } 
    }

    // get a specific interface from the appliance
    async getInterface(
        sid, ip, int
    ) {
        try {
            const RESPONSE = await fetch(`https://${ip}:443/gaia_api/v1.7/show-interface`, {
            method: 'POST',
            headers: {
                'X-chkp-sid': sid,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": int //train of thought: either get int from getAllInterfaces() or put it in manually somehow
            })
            });

            if (!RESPONSE.ok) {
            throw new Error('Request failed with status: ' + RESPONSE.status);
            }

            const INTERFACE = await RESPONSE.json();

            return INTERFACE;

        } catch (error) {
            console.log('Error:', error);
            return null;
        }        
    }

}        


// ------------- Export APIHandler Class ------------- // 

export default ChkpHandler;