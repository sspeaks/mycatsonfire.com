import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import axios from 'axios';

const client_id = process.env["twitch_client_id"];
const client_secret = process.env["twitch_client_secret"];

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const isLive = await getIsStreamerOnline(req.query.streamer);

    context.res = { body: { isLive } };
    context.done();
};


const getIsStreamerOnline = async (streamer: string) => {
    const auth_token: string = await getAuthToken();

    return await axios.get(`https://api.twitch.tv/helix/search/channels?query=${streamer}`, {
        headers: {
            'Authorization': `Bearer ${auth_token}`,
            'Client-Id': client_id
        }
    })
        .then(response => response.data.data[0].is_live);
};

// TODO: Add logic that returns the old token if it's not expired yet
const getAuthToken = async () => await axios.post('https://id.twitch.tv/oauth2/token' +
    `?client_id=${client_id}` +
    `&client_secret=${client_secret}` +
    `&grant_type=client_credentials`)
    .then(resp => resp.data)
    .then((data: TwitchAuthResponse) => data.access_token);

interface TwitchAuthResponse {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    scope: string[];
    token_type: "bearer";
}

export default httpTrigger;