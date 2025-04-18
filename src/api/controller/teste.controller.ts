import Controller from "../../server/decorators/http/controller.decorator";
import { RequestMapping } from "../../server/decorators/http/requestmapping.decorator";
import { Body } from "../../server/decorators/http/body.decorator";

import TesteService from "../service/teste.service";

const testeService = new TesteService();

interface iBody {
    url: string
}

@Controller('/teste')
export default class TesteController {

    @RequestMapping({ method: "post", contentType: 'audio/mp3' })
    public async getById(@Body() body: iBody) {
        return await testeService.baixarVideo(body.url);
    };

}

/* 
    public async getById(req: FastifyRequest, res: FastifyReply) {
        const { url } = req.body as { url: string };

        const result = await testeService.baixarVideo(url);

        res
            .header('Content-Type', 'audio/mp4')
            .header('Content-Disposition', 'attachment; filename="audio.mp4"');

        return res.status(200).send(result);
    };
*/