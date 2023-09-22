exports.getMailBody = () => {
  const birthdayWishes = [
    "On your special day, I want to take a moment to celebrate the incredible person you are. You bring so much joy, love, and laughter into the lives of those around you. May your birthday be filled with happiness, surrounded by your loved ones, and may the year ahead bring you endless opportunities and beautiful moments. Happy birthday!",
    "Today, we celebrate the day you came into this world and the amazing impact you've had on our lives. You are an extraordinary individual, and your kindness, generosity, and compassion never cease to inspire us. May this birthday be a reminder of how loved and appreciated you are. Here's to another year of adventures, growth, and unforgettable memories. Happy birthday!",
    "Birthdays are a time for reflection, gratitude, and anticipation. As you blow out the candles on your cake, remember how far you've come and all the incredible accomplishments you've achieved. May this new chapter in your life be filled with even greater success, happiness, and fulfillment. Cheers to another year of making dreams come true. Happy birthday!",
    "Today marks the beginning of another wonderful journey around the sun for you. It's a time to reflect on the past, embrace the present, and look forward to the future with hope and excitement. On this special day, I want you to know how cherished you are and how grateful I am to have you in my life. May this birthday bring you immense joy, love, and blessings. Happy birthday!",
    "Birthdays are not just about getting older; they're about celebrating the beautiful soul that you are. Your kindness, strength, and resilience inspire everyone around you. As you blow out the candles, remember that you have the power to make a difference and leave a lasting impact on the world. May this birthday be a reminder of your incredible potential and the limitless possibilities that lie ahead. Happy birthday!",
    "You are a true gift to everyone fortunate enough to know you. Your warm heart, genuine kindness, and infectious smile brighten the lives of those around you. On your birthday, I hope you're showered with love, surrounded by your loved ones, and blessed with unforgettable moments. May this new year of your life bring you nothing but pure happiness and endless opportunities. Happy birthday!",
    "As the sun rises on your birthday, a new chapter unfolds in your life. Embrace the beauty and magic that lie ahead, for you have the power to make it extraordinary. Your presence illuminates the lives of others, and your unwavering spirit inspires us all. Here's to a birthday filled with love, laughter, and dreams coming true. Happy birthday!",
    "Birthdays are a time to reflect on the precious moments, wonderful experiences, and meaningful connections that have shaped you into the remarkable person you are today. Your journey has been filled with triumphs, lessons, and growth. On this special day, I want you to know that your presence in the world makes it a better place. May this birthday be the beginning of an incredible new chapter filled with boundless joy, love, and success. Happy birthday!",
    "On this day, we celebrate the incredible human being that you are. Your compassion, strength, and unwavering determination inspire us all. You have touched countless lives and made a lasting impact with your kindness and generosity. As you blow out the candles, may your heart's desires be fulfilled, and may the coming year bring you immeasurable joy, love, and fulfillment. Happy birthday!",
    "Your birthday is not just a celebration of another year; it's a celebration of your remarkable journey through life. You have overcome challenges, pursued your dreams, and made a positive difference in the lives of others. On this special day, I want you to know that you are deeply loved and cherished. May this birthday bring you abundant blessings, laughter, and unforgettable memories. Happy birthday!"  
  ];

  const randomWish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
  return randomWish;
};
