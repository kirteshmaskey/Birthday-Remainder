exports.getMailSubject = (name) => {
  const subjects = [
    `Wishing you the happiest of birthday ${name}!`,
    `Warmest wishes for your birthday ${name}!`,
    `Sending Birthday Cheers Your Way!`,
    `Happy Birthday! May Your Day Be Bright and Beautiful!`,
    `Best Wishes for an Amazing Year Ahead ${name}!`,
    `Special Birthday Greetings Just for You!`,
    `Happy Birthday! Sending You Love, Laughter, and Best Wishes!`,
    `Wishing You a Wonderful Birthday ${name}!`,
    `Sending Birthday Happiness Your Way!`,
    `Warmest Birthday Greetings!`,
    `Wishing You a Day Filled with Joy and Celebrations`,
    `Happy Birthday to a great buddy!`,
    `Wishing you a birthday that sparkles and shines`
  ];

  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
  return randomSubject;
};
