//import {getDirectusClient } from '$lib/db/client';
import { Directus } from "@directus/sdk";

import 'dotenv/config';

export async function GET() {

    const directus = new Directus('https://d.facan.vip:8000')
    await directus.auth.static(process.env.STATIC_TOKEN);

    let response;
    try {
        response = await directus.items('navigator').readByQuery({
            fields: ['title','is_root','id'],
            sort: 'date_created'
        });
    } catch (error) {
        return {
            status: 404
        }
    }
    console.log(response);
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*',
        },
        body: {
            life: response.data
        }
    };
}