import path from 'path';
import { filterAndInstantiateClasses, readFiles } from '../utils';

interface ServiceClass {
    new(...args: any[]): any;
    prototype: {
        type: string;
        name: string;
    };
}

export let serviceMap: Map<string, ServiceClass> = new Map();

const raiz: string = path.resolve('./', 'src');

export const registerServices = async () => {
    const files: string[] = await readFiles(raiz);
    serviceMap = filterAndInstantiateClasses<ServiceClass>(files, 'service');
}