const toCamelCase = require('../formating');

export async function baseFile(fileName, theme){
    const isFormatting = () =>{
        if(fileName.includes('-')){
            return fileName;
        }else{
            return fileName + "-element";
        }
    }
    const template = `
    import {dataSourceMixin} from '../../core/mixins/datasource-mixin'
    import {BaseElement} from '../../core/base-element';
    import {utilsMixin} from '../../core/mixins/utils-mixin';
    import {LitElement} from 'lit-element';
    export const ${toCamelCase(fileName)}Base = class extends LitElement {
        constructor() {
            super();
        }
        static get is() {
            return '${isFormatting()}';
        }
        init(pElement, loader) {
            super.init(pElement, loader);
            var self = this;
        }
    }
    `

    return await template;
}