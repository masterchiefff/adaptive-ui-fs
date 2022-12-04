import { bold, yellow } from 'kleur';
import inquirer from 'inquirer'; 

import { createComponent } from "./createComponent";
import { deleteComponent } from "./deleteComponent";
import { renameComponent } from './rename-component';

export async function adaptiveFs(options){
    switch (options.command) {
        case 'create-component':
            await createComponent(options)
            break;
        case 'delete-component':
            await deleteComponent(options)
            break;
        case 'rename-component':
            await renameComponent(options)
            break;
        default:
            console.log(`${bold().yellow('TO BE WORKED ON')} - ${bold(options.command)} is not avilable at the moment. Please create an issue if you want this to be implemented.`)
            break;
    }
}