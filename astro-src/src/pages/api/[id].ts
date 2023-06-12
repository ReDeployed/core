// endpoints
const GET_ENDPOINTS = ["version", "status", "listApp"]
const POST_ENDPOINTS = ["auth"]

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

export async function post({params, request}) {
    const ID = params.id;
    let MESSAGE: any;
    let DATA: any;

    try {
        DATA = await request.json();
    } catch {
        return new Response(null, { status: 402 });
    }

    if (DATA.key !== "test") {
        return new Response(null, { status: 401 });
    }

    if (POST_ENDPOINTS.includes(ID)) {
        switch (ID) {
            case "auth":
                MESSAGE = generateUUID();
                ACCESS_TOKENS[DATA.user] = MESSAGE;
                break;

            default:
                break;
        }
        return new Response(JSON.stringify({
            type: ID,
            msg: ACCESS_TOKENS[DATA.user]
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        })
    } else {
        return new Response(JSON.stringify({message: "Endpoint not found!"}), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export async function get({params, request}) {
    const ID = params.id;
    let ACC_TOKEN = ""
    let MESSAGE = "";

    try {
        ACC_TOKEN = request
        .headers
        .get("Authorization").toString();
    } catch {
        return new Response(null, { status: 401 });
    }

    for (const key in ACCESS_TOKENS) {
        if (ACCESS_TOKENS[key] === ACC_TOKEN) {
            AUTHORIZED = true;
            break;
        }
    }

    if (GET_ENDPOINTS.includes(ID) && AUTHORIZED) {
        switch (ID) {
            case "status":
                MESSAGE = "online"
                break;

            case "version":
                MESSAGE = "v0.0.1-beta"
                break;

            case "listApp":
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
        if (AUTHORIZED) {
            return new Response(JSON.stringify({message: "Endpoint not found!"}), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } else return new Response(null, { status: 401 });
    }
}
