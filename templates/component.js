import { toCamelCase } from "../src/file-formatting";
// const styles = require('./styles');

export default function componentFile(fileName){
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
    return template;
}