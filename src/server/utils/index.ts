import fs from 'fs';
import path from 'path';

type Contructor<T> = new (...args: any[]) => T;

export async function readFiles(directory: string, files: string[] = []): Promise<string[]> {
    const itens = fs.readdirSync(directory);

    for (const item of itens) {
        const caminhoAbsoluto = path.join(directory, item);
        const stats = fs.statSync(caminhoAbsoluto);

        if (stats.isDirectory()) {
            await readFiles(caminhoAbsoluto, files);
        } else if (/\.(ts|js)$/.test(item) && !item.endsWith('.d.ts')) {
            files.push(caminhoAbsoluto);
        }
    }

    return files;
}

export function filterAndInstantiateClasses<T>(
    files: string[],
    classType: string,
): Map<string, T> {
    const map = new Map<string, T>();

    for (const arqPath of files) {
        const importedModule = require(arqPath);
        const classes = Object.values(importedModule);

        for (const cls of classes) {
            if (typeof cls === 'function') {
                const maybeClass = cls as Contructor<T>;

                if (maybeClass.prototype?.type === classType) {
                    const instance = new maybeClass();
                    const key = maybeClass.prototype.name || maybeClass.name;
                    map.set(key, instance);
                }
            }
        }
    }

    return map;
}

export function filterAndInstantiateControllers<T>(
    files: string[],
    classType: string,
    servicesMap: Map<string, any>
): Map<string, T> {
    const map = new Map<string, T>();

    for (const arqPath of files) {
        const importedModule = require(arqPath);
        const classes = Object.values(importedModule);

        for (const cls of classes) {
            if (typeof cls === 'function') {
                const maybeClass = cls as new (...args: any[]) => T;

                if (maybeClass.prototype?.type === classType) {
                    const dependencies: string[] = maybeClass.prototype.dependencies || [];

                    // Resolvendo as dependências
                    const resolvedDependencies = dependencies.map(dep => {
                        const instance = servicesMap.get(dep);
                        if (!instance) {
                            throw new Error(`Dependência "${dep}" não encontrada no servicesMap.`);
                        }
                        return instance;
                    });

                    // Passando as dependências para o construtor, individualmente
                    const instance = new maybeClass(...resolvedDependencies);

                    const key = maybeClass.prototype.name || maybeClass.name;
                    map.set(key, instance);
                }
            }
        }
    }

    return map;
}

