// endpoints
const GET_ENDPOINTS = ["version", "status", "listApp"]
const POST_ENDPOINTS = ["auth", "addApp", "viewApp"]

// in mem tokens
let ACCESS_TOKENS: {
    [key: string]: string
} = {};

// auth bool
let AUTHORIZED = false;

// API Token
function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// check if user is authorized
function checkAuth(req): boolean {
    let TOKEN: string;
    try {
        TOKEN = req
        .headers
        .get("Authorization").toString();
    } catch {
        return false;
    }

    for (const key in ACCESS_TOKENS) {
        if (ACCESS_TOKENS[key] === TOKEN) {
            return true;
        }
    }
}

export async function post({params, request}) {
    const ID = params.id;
    let MESSAGE: string;
    let DATA: any;

    try {
        DATA = await request.json();
    } catch {
        return new Response(null, { status: 402 });
    }

    if (POST_ENDPOINTS.includes(ID)) {
        switch (ID) {
            case "auth":
                if (DATA.key !== "test") {
                    return new Response(null, { status: 401 });
                }
                try {
                MESSAGE = generateUUID();
                ACCESS_TOKENS[DATA.user] = MESSAGE;
                } catch {
                    MESSAGE = "null";
                }
                break;

            case "addApp":
                if ( checkAuth(request) !== true ) {
                    return new Response(null, { status: 401 });
                }
                try {
                    let destIP = DATA.ip
                    const response = await fetch("https://proxy:8080/startManage?ip=" + destIP);
                    if (response.status == 200) {
                        MESSAGE = "Success"
                    } else {
                        MESSAGE = "Failed"
                    }
                } catch {
                    MESSAGE = "[]";
                }
                break;

            case "viewApp":
                if ( checkAuth(request) !== true ) {
                    return new Response(null, { status: 401 });
                }
                try {
                    let devID = DATA.id
                    const response = await fetch("https://proxy:8080/listApp?id=" + devID);
                    if (response.status == 200) {
                        MESSAGE = await response.json();
                        MESSAGE = MESSAGE['message'];
                    } else {
                        MESSAGE = "[]"
                    }
                } catch {
                    MESSAGE = "[]";
                }
                break;

            default:
                break;
        }
        return new Response(JSON.stringify({
            type: ID,
            msg: MESSAGE
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } else {
        return new Response(JSON.stringify({
            type: ID,
            msg: "Endpoint not found!"
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export async function get({params, request}) {
    const ID = params.id;
    let MESSAGE = "";

    if (GET_ENDPOINTS.includes(ID)) {
        switch (ID) {
            case "status":
                if ( checkAuth(request) !== true ) {
                    return new Response(null, { status: 401 });
                }
                MESSAGE = "online"
                break;

            case "version":
                if ( checkAuth(request) !== true ) {
                    return new Response(null, { status: 401 });
                }
                MESSAGE = "v0.0.1-beta"
                break;

            case "listApp":
                if ( checkAuth(request) !== true ) {
                    return new Response(null, { status: 401 });
                }
                try {
                    const response = await fetch("https://proxy:8080/listApp");
                    MESSAGE = await response.json();
                    MESSAGE = MESSAGE['message'];
                } catch {
                    MESSAGE = "[]";
                }

            default:
                break;
        }
        return new Response(JSON.stringify({
            type: ID,
            msg: MESSAGE
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } else {
        return new Response(JSON.stringify({
            type: ID,
            msg: "Endpoint not found!"
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
