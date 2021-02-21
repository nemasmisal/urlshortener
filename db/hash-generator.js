module.exports = {
  hashGenerator() {
    const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array(8)
      .join()
      .split(',')
      .map(function () {
        return allowedChars.charAt(
          Math.floor(Math.random() * allowedChars.length)
        );
      })
      .join('');
  },
};
