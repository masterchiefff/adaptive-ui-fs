import arg from 'arg'; // allows us to process arguments into options
import inquirer from 'inquirer'; // questions

// this function takes the argument and processing them into options
function parseArgumentsIntoOptions(rawArgs){
    const args= arg({
            '--yes': Boolean, // skip all the prompts and use defaults
            '-y': '--yes' 
        },
        {
            argv: rawArgs.slice(2), // all the arguments will start at position number 3 eg create-component dsv1.0 --yes [component-name]
        }
    );
    return {
        // coresponding the options with the args
        skipPromts: args['--yes'] || false,
        command: args._[0],
        template: args._[1]
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

    const defaultTemplate = 'dsv1.0';
    if(options.skipPromts){
        return {
            ...options, 
            command: options.template || defaultTemplate,
        }
    }

    const questions = [];
    if (!options.command){
        questions.push({
            type: 'list',
            name: 'command',
            message: 'Please choose project\'s command to use',
            choices: ['create-component', 'delete-component', 'rename-component', 'create-template', 'delete-template'],
            default: defaultCommand,
        })
    }

    if (!options.template){
        questions.push({
            type: 'list',
            name: 'template',
            message: 'Please choose which project theme to use',
            choices: ['bulkit', 'dsv1.0', 'dsv2.0'],
            default: defaultTemplate,
        })
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        command: options.command || answers.command,
        template: options.template || answers.template,
    }
}

export async function cli(args){
    let options = parseArgumentsIntoOptions(args)
    options = await promptForMissingOptions(options)
    await.createProject(options)
}