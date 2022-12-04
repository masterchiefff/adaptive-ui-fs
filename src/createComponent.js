import fs from 'fs';
import path from 'path';
import { bold, red, blue, green, yellow } from 'kleur';
import Listr from 'listr';

import strArr from './file-formatting';
import { isDirSync } from './syncdir';
import { baseFile } from '../templates/base';
import component from '../templates/component';

async function createThemeFiles(options, copy){
    const targetWorkingDirectory = options.targetDirectory;
    const fileFormated = strArr(options.name);

    const baseName = `${fileFormated}.js`;
    const fileName = `${fileFormated}.js`;
    const baseDir = path.resolve(path.join(targetWorkingDirectory, `/src/elements/base/${baseName}`));
    const fileDir = path.resolve(path.join(targetWorkingDirectory, `/src/themes/${options.theme}/components/elements/${fileName}`));
    
    if (targetWorkingDirectory != path.resolve(path.join(targetWorkingDirectory, '../adaptive-ui-web'))) {
        console.log(`${bold().red('LOCATION ERROR')} Please navigate to adaptive-ui-web folder`)
        process.exit(1)
    }else{
        // Creating component files
        if ( !fs.existsSync(fileDir) ) {
            if ( options.name.split('-').length > 4 ) {
                console.log('Naming error');
                process.exit(1);
            }else{
                if( copy ) {
                    fs.createWriteStream( fileDir );
                    fs.writeFile(fileDir, component(options.name), function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log(`${bold().green('DONE COPYING')} ${fileName} component file content copied`);
                    }); 
                }
                fs.createWriteStream(fileDir);
            }
        } else {
            console.log(`${bold().yellow("Warning")}- the file exists`);
            process.exit(1);
        }

        // Creating basefile
        if ( !fs.existsSync(baseDir) ) { 
            if(copy){
                fs.createWriteStream(baseDir);
                fs.writeFile(baseDir, baseFile(options.name, options.theme), function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log(`${bold().green('DONE COPYING')} ${baseName} base file content copied`);
                }); 
            }
            fs.createWriteStream(baseDir);
        } else{ 
            console.log(`${bold().yellow("Warning")}- base file exists`);
            process.exit(1);
        }
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
        },
        {
            title: 'install dependancies',
            task: () => projectInstall({
                cwd: options.targetDirectory,
            }),
            skip: () => !options.runInstall ? 'Dependancies installation skipped' : undefined
        }
    ])

    await tasks.run();

    console.log(`${bold().green('DONE')} ${options.name} component has been created successfully`)

    return true;
}
