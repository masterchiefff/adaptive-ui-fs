import fs from 'fs';
import path from 'path';
import Listr from 'listr';
import { bold, green } from 'kleur';

import strArr from './file-formatting';
import inquirer from 'inquirer';

async function renameThemeFiles ( options ) {
    const targetWorkingDirectory = options.targetDirectory;
    const fileFormated = strArr(options.name);
    const fileName = `${fileFormated}.js`;
    const baseDir = path.resolve(path.join(targetWorkingDirectory, `/src/elements/base/${fileName}`));
    const fileDir = path.resolve(path.join(targetWorkingDirectory, `/src/themes/${options.theme}/components/elements/${fileName}`));

    console.log(options)

    // if ( !fs.existsSync(baseDir) ) {
    //     fs.rename(options.newFile, baseDir, function(err) {
    //         if ( err ) console.log('ERROR: ' + err);
    //     });
    // }else {
    //     console.log('base file does not exist')
    //     process.exit(1)
    // }

    // if ( !fs.existsSync(fileDir) ) {
    //     fs.rename(options.newFile, fileDir, function(err) {
    //         if ( err ) console.log('ERROR: ' + err);
    //     });
    // }else {
    //     console.log('component file does not exist');
    //     process.exit(1)
    // }
}

export async function renameComponent (options) {
    options = {
        ...options, 
        targetDirectory: options.targetDirectory || process.cwd(),
    }

    const tasks = new Listr ([
        {
            title: 'Renaming files',
            task: () => renameThemeFiles(options)
        }
    ])

    await tasks.run();

    console.log(`${bold().green('DONE')} ${options.name} component has been Renamed successfully`)

    return true;
}