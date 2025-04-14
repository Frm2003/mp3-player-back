import { FastifyReply, FastifyRequest } from "fastify";

import Controller from "../../server/decorators/http/controller.decorator";
import { RequestMapping } from "../../server/decorators/http/requestmapping.decorator";

import TesteService from "../service/teste.service";

const testeService = new TesteService();

@Controller('/teste')
export default class TesteController {

    @RequestMapping({ method: "post" })
    public async getById(req: FastifyRequest, res: FastifyReply) {
        const { url } = req.body as { url: string };

        const result = await testeService.baixarVideo(url);

        res
            .header('Content-Type', 'audio/mp4')
            .header('Content-Disposition', 'attachment; filename="audio.mp4"');

        return res.status(200).send(result);
    };

}