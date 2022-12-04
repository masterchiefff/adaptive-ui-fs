const toCamelCase = require('../formating');

export async function StyleComponentFile(fileName){
    const templates = `
    /**
    @license
    Copyright (c) 2020 InterIntel Technologies. All rights reserved.
    */
    import {css} from 'lit-element';
    export const ${toCamelCase(fileName)}Styles = css\`
    \`;
    
    `;
    return await templates;
}