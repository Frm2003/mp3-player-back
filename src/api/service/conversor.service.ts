import ytdl from '@distube/ytdl-core';
import { Readable } from 'stream';

export default class conversorService {
    public async baixarVideo(url: string): Promise<Readable | void> {
        if (!ytdl.validateURL(url)) {
            console.log('URL inválida!');
            return;
        }

        const info = await ytdl.getInfo(url);

        const format = ytdl.chooseFormat(info.formats, {
            quality: 'highestaudio',
            filter: 'audioonly',
        });

        return ytdl.downloadFromInfo(info, { format });
    }
}