const express = require("express");
const ytdl = require('ytdl-core')
const cors = require('cors')
const app = express();

app.use(express.json())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'X-PINGOTHER']
}));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post('/teste', async (req, res) => {
    try {
        const { videoUrl } = req.body;

        const options = { quality: 'highestaudio', filter: 'audioonly' };
        const info = await ytdl.getInfo(videoUrl);
        const fileName = `${info.videoDetails.title}.mp3`;

        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'audio/mpeg');

        const videoStream = ytdl(videoUrl, options);

        req.socket.setTimeout(10 * 60 * 1000);

        res.once('finish', () => {
            videoStream.destroy(); 
        });

        const passThrough = new PassThrough();
        videoStream.pipe(passThrough).pipe(res);

        videoStream.on('error', (err) => {
            console.error('Erro durante o download:', err);
            res.status(500).send('Erro durante o download do vídeo.');
        });

    } catch (error) {
        console.error('Erro durante o download:', error);
        res.status(500).send('Erro durante o download do vídeo.');
    }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;