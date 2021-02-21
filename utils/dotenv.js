const fs = require('fs');
const dotenv = {};
const KEY_VALUE = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/;
const NEWLINES_MATCH = /\n|\r|\r\n/;
try {
  const rawData = fs.readFileSync('.ENV', 'utf8');
  rawData.split(NEWLINES_MATCH).forEach(line => {
       if(!line) { return; }
       const [_, key, value] = line.match(KEY_VALUE);
       dotenv[key] = value;
     })
} catch (error) { console.log(error); }
module.exports = dotenv;