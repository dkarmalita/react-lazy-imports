const useDev = false;
module.exports = useDev?require('./dev'):require('./prod/es5.min');

