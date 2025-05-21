export default function Controller(path: string) {
    return function (target: Function) {
        target.prototype.name = target.name;
        target.prototype.path = path;
        target.prototype.type = 'controller';
    }
}