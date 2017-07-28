/**
 * Created by Micheal Xiao on 2017/7/26.
 */
let path = require('path');
let Generator = require('yeoman-generator');
// let pluralize = require('pluralize');
let _ = require('lodash');
// let recast = require('recast');
// let reservedWords = require('reserved-words');

module.exports = class extends Generator {
    prompting() {
        let srcDir = this.config.get('srcDir') || 'src';
        let viewDir = this.config.get('apiDir') || 'views';

        let prompts = [{
            type: 'input',
            name: 'name',
            message: 'What\'s the API name?',
            default: 'some-view'
        }
        ]

        return this.prompt(prompts)
            .then((props)=>{
                this.props = props;
            })

    }

    writing() {
        let props = this.props
        let copyTpl = this.fs.copyTpl.bind(this.fs);
        let tPath = this.templatePath.bind(this);
        let dPath = this.destinationPath.bind(this);
        let filepath = function (filename) {
            return path.join('src/views', props.name, filename);
        };


        copyTpl(tPath('view-tmp.vue'), dPath(filepath(props.name+'.vue')), props);
        copyTpl(tPath('view-tmp.js'), dPath(filepath(props.name+'.js')), props);
        copyTpl(tPath('view-tmp.scss'), dPath(filepath(props.name+'.scss')), props);

    }


}