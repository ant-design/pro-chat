import emojiRegex from 'emoji-regex';

export const getEmoji = (emoji: string): string | undefined => {
  const regex = emojiRegex();
  return emoji.match(regex)?.[0];
};
