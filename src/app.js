import { createComponent } from "./createComponent";

export async function adaptiveFs(options){
    switch (options.command) {
        case 'create-component':
            await createComponent(options)
            break;
        case 'delete-component':
            console.log('deleting component')
            break;
        case 'rename-component':
            console.log('renaming component')
            break;
        default:
            console.log('To be worked on')
            break;
    }
}