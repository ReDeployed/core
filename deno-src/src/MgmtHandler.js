class MgmtHandler {

    async getMgmtSID(
        ip, user, pass
    ) {
        try {
            let chkpSid = await fetch(`https://${ip}:443/web_api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: user,
                password: pass
            })
            })


            chkpSid = chkpSid.body;
            
            //await new Promise(resolve => setTimeout(resolve, 5000));

            //console.log(chkpSid['sid']);
            //return chkpSid['sid'];
            return chkpSid;


        } catch (error) {
            console.log('Error:', error);
            return null;
        }
    }

}

// ------ export MgmtHandler ------

export default MgmtHandler;