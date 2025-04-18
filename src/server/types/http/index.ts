type HttpMethods = 'get' | 'post' | 'put' | 'delete';

type ContentType =
    | 'application/json'
    | 'application/xml'
    | 'text/html'
    | 'text/plain'
    | 'image/jpeg'
    | 'image/png'
    | 'audio/mpeg'
    | 'video/mp4'
    | 'video/webm'
    | 'application/pdf'
    | 'application/zip';

type RouteDefinition = {
    method: HttpMethods,
    route: string,
    handler: Function;
}