module.exports = {
  block: 'page',
  content: [
    {
      block: 'header',
    },
    {
      block: 'body',
      content: 'Hello, wanderer!',
    },
    {
      block: 'footer',
      mods: {
        sticky: 'yes',
      },
    },
  ],
};
