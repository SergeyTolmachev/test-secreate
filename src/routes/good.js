const express = require('express');
const axios = require('axios');
const router = express.Router();

const { roundMoney, validateGoods } = require('../utils');

router.post('/calculate', async (req, res) => {
  const { goods } = req.body;

  if (!validateGoods(goods)) {
    return res.status(404).json({ error: 'Структура goods не соответствует требуемой' });
  }

  const convert = {
    RUB: 1,
    USD: 0,
    EUR: 0,
  };

  try {
    const result = await axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
    const { Valute } = result.data;
    const { USD, EUR } = Valute;
    convert.USD = roundMoney(USD.Value / USD.Nominal);
    convert.EUR = roundMoney(EUR.Value / EUR.Nominal);
    if (!convert.USD || !convert.EUR) {
      throw new Error();
    }
  } catch (error) {
    return res.status(404).json({ error: 'Ошибка с доступом к API конвертации валют' });
  }

  const sum = {
    RUB: 0,
    USD: 0,
    EUR: 0,
  };

  goods.forEach( good => {
    const { currency, quantity, price } = good;
    Object.keys(sum).forEach(curr => {
      sum[curr] = roundMoney(sum[curr] + convert[currency]/convert[curr] * price * quantity);
    });
  });

  return res.status(200).json(sum);
});

module.exports = router;
