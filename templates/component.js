const toCamelCase = require('../formating');
const styles = require('./styles');

export async function componentFile(fileName, theme){
    const isFormatting = () =>{
        if(fileName.includes('-')){
            return fileName;
        }else{
            return fileName + "-element";
        }
    }
    const template = `
    import {html, css} from 'lit-element';
    import {${toCamelCase(fileName)}Styles} from './${isFormatting()}-css';
    import {${toCamelCase(fileName)}Base} from '../../../../../elements/base/${isFormatting()}'
    class ${toCamelCase(fileName)} extends ${toCamelCase(fileName)}Base{
        static get styles(){
            return [
                ${toCamelCase(fileName)}Styles,
                css \` 
                :host{
                    disply: block;
                }
                \`
            ]
        }
        render(){
            return html \`${toCamelCase(fileName)} is working fine\`
        }
    }
    customElements.define(${toCamelCase(fileName)}.is, ${toCamelCase(fileName)});
    
    `;
    return await template;
}