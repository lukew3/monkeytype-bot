const fs = require('fs');
const simpleGit = require('simple-git');
const git = simpleGit('../monkeytype');

module.exports.run = async (bot, message, args, db, guild) => {
    console.log(`Running command ${this.cmd.name}`);
  
    let statusmsg;
    try {

      statusmsg = await message.channel.send(
        `:thinking: Please wait...`
      );
        
      statusmsg `:thinking: Pulling latest changes from upstream...`;
      await git.pull('upstream', 'master');
      statusmsg = `:thinking: Staging files...`;
      await git.add([`.`]);
      statusmsg = `:thinking: Committing...`;
      await git.commit(`Added quotes from Discord`);
      statusmsg = `:thinking: Pushing to origin...`;
      await git.push('origin', 'master');

      return {
        status: true,
        message: ":white_check_mark: Pushed..."
      }
    } catch (e) {
      statusmsg.delete();
      return {
        status: false,
        message: ":x: Could not push: " + e.message,
      };
    }
  };
  
  module.exports.cmd = {
    name: "quote_push",
    needMod: true,
  };
  