
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const download = require('download-git-repo');
const config = require('../../templates')

module.exports = () => {
 co(function *() {
    // 处理用户输入
      let tplName = yield prompt('Template name: ')
      let projectName = yield prompt('Project name: ')
      let gitUrl
 
    if (!config.tpl[tplName]) {
        console.log(chalk.red('\n × Template does not exit!'))
        process.exit()
    }
    gitUrl = config.tpl[tplName].url
 

    console.log(chalk.white('\n Start generating...'))
    let cmdStr = `cd ${projectName} && npm install`;
  
    download('github:cqq123/react-framework', projectName, (err) => {
      if (err) {
        console.log(err)
        process.exit()
      } else {
        console.log(chalk.green('Generation completed!!!!'))
        console.log(chalk.white('\n Start install packages...'))
        exec(cmdStr, (error) => {
          if (error) {
            console.log(error);
            console.log(`cd ${projectName} && npm install error`)
            process.exit();
          } else {
            console.log(`npm install success!!! && cd ${projectName} && please npm run dev`);
            console.log(`make sure has install norice, and then please npm install norice -g`);
            process.exit()
          }
        })
      }
    })
    // git命令，远程拉取项目并自定义项目名
    // let cmdStr = `git clone ${gitUrl} ${projectName} && cd ${projectName}`
 
    // console.log(chalk.white('\n Start generating...'))
 
    // exec(cmdStr, (error, stdout, stderr) => {
    //   if (error) {
    //     console.log(error)
    //     process.exit()
    //   }
    //   console.log(chalk.green('\n √ Generation completed!'))
    //   console.log(`\n cd ${projectName} && npm install \n`)
    //   process.exit()
    // })
  })
}