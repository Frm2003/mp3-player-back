export default function Service(token?: string): ClassDecorator {
    return (target: Function) => {
        target.prototype.name = token ? token : target.name;
        target.prototype.type = 'service'
    };  
}
