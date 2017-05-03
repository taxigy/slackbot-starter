import greeting from './greeting';

// Add more conversation branches here.
const branches = { greeting };

// A new conversation is ininiated here. Every time a past conversation between user
// and bot has exhausted, it's necessary to init a new conversation.
export default function* initConversation(message) {
  // Match the intent with a conversation branch.
  if (/hello|hi/.test(message.text)) {
    // Move to a conversation branch that corresponds to user intent.
    yield* branches[greeting](message);
  } else {
    // FIXME: put a proper text the bot will respond with then the message from user is unclear.
    yield 'Sorry, I don\'t know how to respond to this.';
  }
}
