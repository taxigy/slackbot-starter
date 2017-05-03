import initConversation from './conversations';

const conversations = {};

function getConversationKey(message = {}) {
  const { channel, user, team } = message;

  return `conversation-${channel}-${user}-${team}`;
}

function setConversation(message, conversation) {
  conversations[getConversationKey(message)] = conversation;

  return conversation;
}

function getConversation(message) {
  const key = getConversationKey(message);
  const conversation = conversations[key];

  if (!conversation) {
    conversations[key] = setConversation(message, initConversation(message));
  }

  return conversations[key];
}

function getNextResponse(message) {
  const currentConversation = getConversation(message);
  const { done, value } = currentConversation.next();

  if (!done) {
    return value;
  }

  const newConversation = setConversation(message, initConversation(message));

  return newConversation.next().value;
}

// The main function that is executed per every message every user sends to the bot.
// It's not really async by default, but you might as well do some async/await stuff in it.
export default async function respond(bot, message) {
  bot.startTyping();

  try {
    // FIXME: retrieve data from a DB, hit NLP API, etc.
    // Then pull out the conversation with current user or init a new one,
    // extract a response, and send it to the user.
    bot.reply(message, getNextResponse(message));
  } catch (error) {
    // FIXME: replace the message bot sends to user in case of an exception more meaningful.
    bot.reply(message, 'Sorry, I don\'t understand.');
  }
}
