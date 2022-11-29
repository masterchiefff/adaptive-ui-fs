import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import { promisify } from 'util';
import { isDirSync } from './syncdir';
import { bold, red, blue } from 'kleur';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyThemeFiles(options){
    const targetWorkingDirectory = options.targetDirectory;
    const componentPath = path.resolve(path.join(targetWorkingDirectory, `/src/theme/${options.theme}/components/elements`))

    try {
       if(isDirSync(path.resolve(path.join(targetWorkingDirectory, '/src/themes/', options.theme)))){
        // return copy(options.themeDirectory, options.targetDirectory, {
        //     clobber: false
        // })
       }

    } catch (err){
        console.log(`${bold().red('ERROR')} Component can\'t be created in the current directory, Please Make sure you are in ${blue().bold().underline('adaptive-ui-web-master')} directory`)
        process.exit(1)
    }
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

    await copyThemeFiles(options);

    return true;
}