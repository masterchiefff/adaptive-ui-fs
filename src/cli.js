import arg from 'arg'; // allows us to process arguments into options
import inquirer from 'inquirer'; // questions
import { adaptiveFs } from './app';

// this function takes the argument and processing them into options
function parseArgumentsIntoOptions(rawArgs){
    const args= arg({
            '--yes': Boolean, // skip all the prompts and use defaults
            '--copy': Boolean,
            '-y': '--yes' ,
            '-c': '--copy'
        },
        {
            argv: rawArgs.slice(2), // all the arguments will start at position number 3 eg create-component dsv1.0 --yes [component-name]
        }
    );
    return {
        // coresponding the options with the args
        skipPromts: args['--yes'] || false,
        copy: args['--copy'] || false,
        command: args._[0],
        name: args._[1],
        theme: args._[2]
    }
}

// handling missing options
async function promptForMissingOptions(options){
    const defaultCommand = 'create-component';
    if(options.skipPromts){
        return {
            ...options, 
            command: options.command || defaultCommand,
        }
    }

    if(options.skipPromts){
        return {
            ...options, 
            name: options.name,
        }
    }

    const defaultTheme = 'dsv1.0';
    if(options.skipPromts){
        return {
            ...options, 
            command: options.theme || defaultTheme,
        }
    }

    const questions = [];
    if (!options.command){
        questions.push({
            type: 'list',
            name: 'command',
            message: 'Please choose project\'s command to use',
            choices: ['create-component', 'delete-component', 'rename-component', 'create-theme', 'delete-theme'],
            default: defaultCommand,
        })
    }

    if (!options.name){
        questions.push({
            type: 'input',
            name: 'file_name',
            message: 'Enter file name:',
        })
    }


    if (!options.theme){
        questions.push({
            type: 'list',
            name: 'theme',
            message: 'Please choose which project theme to use',
            choices: ['bulkit', 'dsv1.0', 'dsv2.0'],
            default: defaultTheme,
        })
    }

    if (!options.copy) {
        questions.push({
            type: 'confirm', 
            name: 'copy',
            message: 'Copy file content?',
            default: false
        })
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        command: options.command || answers.command,
        theme: options.theme || answers.theme,
        copy: options.copy || answers.copy,
        name: options.file_name || answers.file_name,
    }
}

export async function cli(args){
    let options = parseArgumentsIntoOptions(args)
    options = await promptForMissingOptions(options)
    await adaptiveFs(options);
}