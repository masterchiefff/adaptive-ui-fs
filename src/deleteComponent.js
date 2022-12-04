import fs from 'fs';
import path from 'path';
import Listr from 'listr';
import file from 'fs-extra';
import { bold, green } from 'kleur';

import { isDirSync } from "./syncdir";

async function deleteThemeFiles(options){
    const targetWorkingDirectory = options.targetDirectory;
    const baseName = `${options.name}.js`;
    const baseDir = path.resolve(path.join(targetWorkingDirectory, `/src/elements/base/${baseName}`));

    if (!isDirSync(path.resolve(path.join(targetWorkingDirectory, `/src/themes/${options.theme}/components/elements/${options.name}.js`)))){
        console.log('The file does not exist');
        process.exit(1)
    }else{
        file.remove(path.resolve(path.join(targetWorkingDirectory, `/src/themes/${options.theme}/components/elements/${options.name}.js`)), function (err){
            if (err) return console.error("err");
            console.log(`${bold().green('SUCCESS')} component deleted successfully.`)
        });
    }

    if (baseDir) {
        fs.unlinkSync(baseDir, err => {
            if (err) console.log("err");
        })
    }
}

export async function deleteComponent(options){
    options = {
        ...options, 
        targetDirectory: options.targetDirectory || process.cwd(),
    }

    const tasks = new Listr ([
        {
            title: 'Deleting files',
            task: () => deleteThemeFiles(options)
        }
    ])

    await tasks.run();

    console.log(`${bold().green('DONE')} ${options.name} component has been Deleted successfully`)

    return true;
}