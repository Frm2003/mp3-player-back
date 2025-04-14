export default function Controller(path: string) {
    return function (target: Function) {
        target.prototype.path = path;
    }
}