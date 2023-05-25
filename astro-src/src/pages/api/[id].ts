import {APIRoute} from 'astro';

// API PSK
// @TODO: Fetch this from database
const PSK = 'testkey';
const GET_ENDPOINTS = ["version", "status"]

const ACCESS_TOKENS: {
    [key: string]: string
} = {};

const POST_ENDPOINTS = ["auth"]

function generateAuthToken(fetched_psk : string): string | null {
    const TIMESTAMP = Math.floor(Date.now() / 1000);

    if (fetched_psk !== PSK) {
        return null;
    }

    let token = `${PSK}${TIMESTAMP}`;
    token = btoa(token);
    return token;
}

export const post: APIRoute = async ({params, request}) => {
    const DATA = await request.json();
    const ID = params.id;
    let MESSAGE = "";
    if (POST_ENDPOINTS.includes(ID)) {
        switch (ID) {
            case "auth":
                MESSAGE = generateAuthToken(DATA.key).toString();
                ACCESS_TOKENS["key"] = MESSAGE;
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
        return new Response(JSON.stringify({message: "Endpoint not found!"}), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export const get: APIRoute = async ({params, request}) => {
    let AUTHORIZED = false;
    const ID = params.id;
    let MESSAGE = "";
    const ACC_TOKEN = request
        .headers
        .get("Authorization").toString();

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
        } else return new Response(null, { status: 403 });
    }
}
