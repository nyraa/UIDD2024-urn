export default async function handler(req, res) {
    const { path } = req.query;
    const imageUrl = `https://img.craiyon.com/${path}`;

    try {
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();
        res.setHeader("Content-Type", response.headers.get("Content-Type"));
        res.send(Buffer.from(imageBuffer));

        // res.send(imageBuffer);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).json({ error: "Failed to fetch image" });
    }
}