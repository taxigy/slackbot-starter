// FIXME: instead of relying on message text itself, you can use an NLP lib to extract
// intent and entities from it.
export default function* greeting() {
  // Yielding the first message
  const responseToHello = yield 'Hello, how are you?';

  if (/good|great|awesome/.test(responseToHello.text)) {
    // The user responded with positive answer.
    const responseToPrompt = yield 'Nice! Do you want to loopback to "Hello, how are you?" with yield*?';

    if (/yes|sure/.test(responseToPrompt.text)) {
      // Doing yield* into itself; you may yield* another generator to switch to
      // another conversation branch on the fly.
      yield* greeting();
    } else {
      yield 'Okay, bye!';
    }
  }
}
