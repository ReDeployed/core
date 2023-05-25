import { APIRoute } from 'astro';

// API PSK
// @TODO:
// Fetch this from database
const PSK = 'testkey';

const GET_ENDPOINTS = [
    "version",
]

const POST_ENDPOINTS = [
    "auth",
    "status"
]

function generateAuthToken(fetched_psk: string): string | null {
    const TIMESTAMP = Math.floor(Date.now() / 1000);

    if (fetched_psk !== PSK) {
      console.log('Invalid PSK');
      return null;
    }

    console.log('Valid PSK');

    let token = `${PSK}${TIMESTAMP}`;
    token = btoa(token);
    return token;
}

export const post: APIRoute = async ({ params, request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const DATA = await request.json();
        const ID = params.id;
        let MESSAGE = "";
        if ( POST_ENDPOINTS.includes(ID) ) {
            switch (ID) {
                case "auth":
                    MESSAGE = generateAuthToken(DATA.key).toString();
                    break;

                case "status":
                    break;

                default:
                    break;
            }
            return new Response(JSON.stringify({
                msg: MESSAGE
            }), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } else {
            return new Response(JSON.stringify({
                message: "Endpoint not found!"
            }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        }
    }
    return new Response(null, { status: 400 });
}

export const get: APIRoute = async ({ params }) => {
    const id = params.id;
    if ( GET_ENDPOINTS.includes(id) ) {
        return new Response(JSON.stringify({
            tag: "v0.0.1-alpha"
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });
    } else {
        return new Response(JSON.stringify({
            message: "Endpoint not found!"
        }), {
            status: 404,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
