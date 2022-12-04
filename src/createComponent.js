import fs from 'fs';
import path from 'path';
import { bold, red, blue, green } from 'kleur';
import Listr from 'listr';

import { toCamelCase } from './file-formatting';
import { isDirSync } from './syncdir';
import { baseFile } from '../templates/base';

async function createThemeFiles(options){
    const targetWorkingDirectory = options.targetDirectory;
    const fileFormated = toCamelCase(options.name);
    const baseName = `${fileFormated}.js`;
    const baseDir = path.resolve(path.join(targetWorkingDirectory, `/src/elements/base/${baseName}`));
    
    // Creating basefile
    if(isDirSync(path.resolve(path.join(targetWorkingDirectory, '/src/elements/base/')))){
        fs.createWriteStream(baseDir);
    }else{
        console.log(false)
    }
}

export async function createComponent(options) {
    options = {
        ...options, 
        targetDirectory: options.targetDirectory || process.cwd(),
    }

    const tasks = new Listr ([
        {
            title: 'Creating files',
            task: () => createThemeFiles(options)
        }
    ])

    await tasks.run();

    console.log(`${bold().green('DONE')} ${options.name} component has been created successfully`)

    return true;
}
