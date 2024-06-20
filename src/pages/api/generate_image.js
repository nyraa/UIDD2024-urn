export default async function handler(req, res)
{
    const { prompt } = req.body;

    try {
        const response = await fetch("https://api.craiyon.com/v3", {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "application/json",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Linux\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site"
            },
            "referrerPolicy": "same-origin",
            "body": JSON.stringify({
                "prompt": prompt,
                "version": "c4ue22fb7kb6wlac",
                "token": null,
                "model": "none",
                "negative_prompt": ""
            }),
            "method": "POST"
        });
        console.log(response);
        if(response.status !== 200)
        {
            res.status(500).json({ error: "Failed to generate image", response: response.text() });
            return;
        }
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}