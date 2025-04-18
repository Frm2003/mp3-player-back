import Controller from "../../server/decorators/http/controller.decorator";
import { RequestMapping } from "../../server/decorators/http/requestmapping.decorator";

@Controller('/health')
export default class HealthController {

    @RequestMapping({ method: "get", contentType: 'text/plain' })
    public isAlive() {
        return 'server está ok';
    }
}