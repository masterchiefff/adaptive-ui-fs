import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import { promisify } from 'util';
import { isDirSync } from './syncdir';
import { bold, red, blue, green } from 'kleur';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
// const copy = promisify(ncp);

async function createThemeFiles(options){
    const targetWorkingDirectory = options.targetDirectory;
    const componentPath = path.resolve(path.join(targetWorkingDirectory, `/src/theme/${options.theme}/components/elements`))
    const fileDir = path.resolve(path.join(targetWorkingDirectory, `/src/themes/${options.theme}/components/elements/${formatted}/${fileName}`));
    const cssDIr = path.resolve(path.join(targetWorkingDirectory, `/src/themes/${option.theme}/components/elements/${formatted}/${cssFile}`));
    const baseDir = path.resolve(path.join(targetWorkingDirectory, `/src/elements/base/${baseName}`));

    try {
       if(isDirSync(path.resolve(path.join(targetWorkingDirectory, '/src/themes/', options.theme)))){
        // return copy(options.themeDirectory, options.targetDirectory, {
        //     clobber: false
        // })

        console.log('Creating component...')
       }

    } catch (err){
        console.log(`${bold().red('ERROR')} Component can\'t be created in the current directory, Please Make sure you are in ${blue().bold().underline('adaptive-ui-web-master')} directory`)
        process.exit(1)
    }
}

async function copyFilesContent(){
    console.log('')
}

export async function createComponent(options){
    options = {
        ...options, 
        targetDirectory: options.targetDirectory || process.cwd(),
    }

    const currentURL = import.meta.url;
    const themeDir = path.resolve(
        new URL(currentURL).pathname, 
        '../../templates',
        options.theme.toLowerCase()
    );

    options.themeDirectory = themeDir;

    try{
        await access(themeDir, fs.constants.R_OK);
    }catch(err){
        console.log('invalid theme name');
        process.exit(1);
    }

    const tasks = new Listr ([
        {
            title: 'Creating files',
            task: () => createThemeFiles(options)
        },
        {
            title: 'Copying file\s content',
            task: () => copyFilesContent(),
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