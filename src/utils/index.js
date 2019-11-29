const { CURRENCIES } = require('../constants');
const currencies = Object.keys(CURRENCIES);

module.exports.validateGoods = (goods) => {
  if (!goods || !Array.isArray(goods) || goods.length === 0) {
    return false;
  }
  goods.forEach((good) => {
    if (!good) {
      return false;
    }
    if (!good.currency || !currencies.includes(good.currency)){
      return false;
    }
    if (!good.name){
      return false;
    }
    if (!good.quantity) {
      return false;
    }
    if (!good.price) {
      return false;
    }
  });
  return true;
};

module.exports.roundMoney = sum => (Math.round( sum * 100) / 100);
