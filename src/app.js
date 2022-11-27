import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'utils';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options){
    return copy(options.templateDirectory, options.targeDirectory, {
        clobber: false,
    });
}
export async function createProject(options){
    options = {
        ...optiions, 
        targeDirectory: options.targeDirectory || process.cwd();
    };

    const currentFileURL  = import.meta.url;
    const templateDir = path.resolve(
        nes.URL(currentFileURL).pathname,
        'path',
        options.template.toLowerCase()
    );
    options.templateDirectory = templateDir;

    try{
        await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error('%s Invalid template name', chalk.red.bold('ERROR'));
        process.exit(1);
    }

    console.log('Copy project files');
    await copyTemplateFiles(options);

    console.log('%s project ready', chalk.green.bold('DONE'));
}