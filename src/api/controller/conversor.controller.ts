import Controller from "../../server/decorators/http/controller.decorator";
import { RequestMapping } from "../../server/decorators/http/requestmapping.decorator";
import { Body } from "../../server/decorators/http/body.decorator";

import TesteService from "../service/conversor.service";

const testeService = new TesteService();

interface iBody {
    url: string
}

@Controller('/conversor')
export default class ConversorController {

    @RequestMapping({ method: 'get' })
    public teste() {
        return 'teste';
    }

    @RequestMapping({ method: "post", contentType: 'audio/mpeg' })
    public async getById(@Body() body: iBody) {
        return await testeService.baixarVideo(body.url);
    };

}