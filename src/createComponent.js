import fs from 'fs';
import path from 'path';
import { bold, red, blue, green } from 'kleur';
import Listr from 'listr';

import { toCamelCase } from './file-formatting';
import { isDirSync } from './syncdir';
import { baseFile } from '../templates/base';
import component from '../templates/component';

async function createThemeFiles(options, copy){
    const targetWorkingDirectory = options.targetDirectory;
    const fileFormated = toCamelCase(options.name);
    const baseName = `${fileFormated}.js`;
    const fileName = `${fileFormated}.js`;
    const baseDir = path.resolve(path.join(targetWorkingDirectory, `/src/elements/base/${baseName}`));
    const componentsPath = path.resolve(path.join(targetWorkingDirectory, `/src/theme/${options.theme}/components/elements/`))
    const fileDir = path.resolve(path.join(targetWorkingDirectory, `/src/themes/${options.theme}/components/elements/${fileName}`));
    
    // Creating basefile
    if(isDirSync(path.resolve(path.join(targetWorkingDirectory, '/src/elements/base/')))){
        fs.createWriteStream(baseDir);
    }else{
        console.log(false)
    }

    // Creating component files
    try {
        if (isDirSync(path.resolve(path.join(targetWorkingDirectory, `/src/themes/${options.theme}/components/elements/`)))){
            if (options.name.split('-').length > 4){
                console.log('Naming error');
                process.error(1)
            }else{
                if(copy){
                    fs.createWriteStream(fileDir);

                    fs.writeFile(fileDir, component(options.name), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    }); 

                }
                fs.createWriteStream(fileDir);
            }
        }else {
            console.log('the directory does not exist')
        }
    } catch (error) {
        console.log(error);
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
        },
        {
            title: 'Copying file\s content',
            task: () => createThemeFiles(options, options.copy),
            enabled: () => options.copy,
        }
    ])

    await tasks.run();

    console.log(`${bold().green('DONE')} ${options.name} component has been created successfully`)

    return true;
}
