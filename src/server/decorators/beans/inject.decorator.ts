interface Inject {
    dependencies: string[];
}

export default function Inject(dependencies: string[]): ClassDecorator {
    return (target: Function) => {
        target.prototype.dependencies = dependencies;
    };
}