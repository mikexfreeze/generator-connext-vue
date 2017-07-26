/**
 * Created by Micheal Xiao on 2017/7/25.
 */
let Generator = require('yeoman-generator');
let yosay = require('yosay');
let chalk = require('chalk');
let _ = require('lodash');


module.exports = class extends Generator{
    prompting () {
        // let that = this;
        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the slick ' + chalk.red('connext front-end') + ' generator!'
        ));

        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, {
            type    : 'confirm',
            name    : 'cool',
            message : 'Would you like to enable the Cool feature?'
        }]).then((props) => {
            this.props = props
            this.props.slug = _.kebabCase(props.name);
        });
    }

    writing() {
        let props = this.props
        let copyTpl = this.fs.copyTpl.bind(this.fs);
        let tPath = this.templatePath.bind(this);
        let dPath = this.destinationPath.bind(this);


        copyTpl(tPath('_package.json'), dPath('package.json'), props);
        copyTpl(tPath('src'), dPath('src'), props);
    }
}

// module.exports = class extends Generator {
//
//     // The name `constructor` is important here
//     constructor(args, opts) {
//         // Calling the super constructor is important so our generator is correctly set up
//         super(args, opts);
//
//         // Next, add your custom code
//         this.option('babel'); // This method adds support for a `--babel` flag
//
//         // This makes `appname` a required argument.
//         this.argument('appname', { type: String, required: true });
//
//         // And you can then access it later; e.g.
//         this.log(this.options.appname);
//
//     }
// };