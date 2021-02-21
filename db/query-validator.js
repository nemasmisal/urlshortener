module.exports = {
  invalidUrl(url) {
    const sqlCommandsPattern = new RegExp(
      /(?=.*SELECT.*FROM)(?!.*(?:CREATE|DROP|UPDATE|INSERT|ALTER|DELETE|ATTACH|DETACH)).*$/,
      'gi'
    );
    const metaCharactersPattern = new RegExp(/^' |' |^OR|--|' # --/, 'gi');
    if (
      sqlCommandsPattern.test(url) ||
      metaCharactersPattern.test(url) ||
      url.length > 999
    ) {
      return true;
    }
    return false;
  },
  invalidHash(hash) {
    const hashPattern = new RegExp(/^[A-Z0-9]{8}$/);
    return !hashPattern.test(hash.toUpperCase());
  },
};
