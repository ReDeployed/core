class ChkpHandler{

    // get Check Point Session-ID, simplifies future Gaia-API calls

    async getSID(
        ip, user, pass
    ) {
        try {
            const CHKP_SID = await fetch(`https://${ip}:443/gaia_api/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  user: user,
                  password: pass
                })
              })
                .then(response => response.json())
                .then(data => data.sid)
                .then(sid => sid.replace(/"/g, ''))
                .then(sid => console.log(sid));

            return CHKP_SID;

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

    // ------- addApp -------

    async addApp(
        hostname, version
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
            console.log(chkpSid['sid']);
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

}


// ------------- Export APIHandler Class ------------- // 

export default ChkpHandler;