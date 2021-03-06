import Botkit from 'botkit';
import BeepBoop from 'beepboop-botkit';
import respond from './respond';

const {
  DEBUG = false,
} = process.env;

function init() {
  const controller = Botkit.slackbot();
  const beepboop = BeepBoop.start(controller, {
    debug: DEBUG,
  });

  // FIXME: do something with add_resource message
  beepboop.on('add_resource', (message) => {
    console.log(message);
  });

  // FIXME: do something with update_resource message
  beepboop.on('update_resource', (message) => {
    console.log(message);
  });

  // FIXME: do something with remove_resource message
  beepboop.on('remove_resource', (message) => {
    console.log(message);
  });

  // The controller has been successfully instantiated and connected to a Slack team
  controller.on('hello', (bot) => {
    // Collect team information
    bot.api.team.info({}, (error, { ok, team } = {}) => {
      if (!error && ok && team) {
        // FIXME: store team info somewhere, at least team.id
      }
    });

    // Collect the list of users on the team.
    bot.api.users.list({}, (error, { ok, members } = {}) => {
      if (ok && members) {
        // FIXME: store users somewhere, at least member's id and team_id
      }
    });

    // List all the channels
    bot.api.im.list({}, (error, { ok, ims } = {}) => {
      if (ok && ims) {
        // FIXME: store channels somewhere as they are necessary to send messages to users
      }
    });
  });

  // If the bot hears anything, init a new conversation.
  // This function is executed per every message sent by every user.
  // The events listened to are file upload, direct message to bot and
  // direct mention (message starts with bot's username).
  controller.hears('.*', ['file_share', 'direct_message', 'direct_mention'], async (bot, message) => {
    respond(bot, message);
  });
}

// Launch it.
init();
