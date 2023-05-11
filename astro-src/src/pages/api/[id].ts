import { APIRoute, AstroCookies } from 'astro';

const GET_ENDPOINTS = [
    "version",
]

const POST_ENDPOINTS = [
    "info"
]

export const post: APIRoute = async ({ params, request }) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const id = params.id;
        if ( POST_ENDPOINTS.includes(id) ) {
            return new Response(JSON.stringify({
                endpoint: id,
                message: id
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
