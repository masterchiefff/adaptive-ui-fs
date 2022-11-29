import fs from 'fs';
import path from 'path';
import ncp from 'ncp';
import { promisify } from 'util';

const access = promisify(fs.access);
const copy = promisify(ncp);

function isDirSync(aPath) {
    try {
        return fs.statSync(aPath).isDirectory();
    } catch (e) {
        if (e.code === 'ENONET') {
            return false;
        } else {
            throw e
        }
    }
}

async function copyThemeFiles(options){
    let dir;
    const targetCwd = options.targetDirectory;

    try {
       if(isDirSync(path.resolve(path.join('./', '/src/themes/', options.theme)))){
        return copy(options.themeDirectory, options.targetDirectory, {
            clobber: false
        })
       }
    } catch (err){
        console.log('Component can\'t be created in the current directory, Please Make sure you are in adaptive-ui-web-master directory')
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
    console.log('project is ready');

    return true;
}