import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Smartphone from '../domain/Smartphone';

test('новая пустая корзина', () => {
  const cart = new Cart();
  expect(cart.items.length).toBe(0);
});

test('добавление в корзину', () => {
  const cart = new Cart();
  cart.add(new Movie(
    1001,
    'Мстители',
    100,
    2012,
    'США',
    'Avengers Assemble!',
    [
      'фантастика',
      'боевик',
      'фэнтези',
      'приключения',
    ],
    '137 мин. / 02:17',
  ));
  const expected = [{
    id: 1001,
    name: 'Мстители',
    price: 100,
    year: 2012,
    country: 'США',
    tagline: 'Avengers Assemble!',
    genre: [
      'фантастика',
      'боевик',
      'фэнтези',
      'приключения',
    ],
    timers: '137 мин. / 02:17',
}];

  expect(cart.items).toEqual(expected);
});

test('суммарная стоимость (без учёта скидки) и со скидкой 50%', () => {
  const cart = new Cart();
  cart.add(new Movie(
    1001,
    'Мстители',
    100,
    2012,
    'США',
    'Avengers Assemble!',
    [
      'фантастика',
      'боевик',
      'фэнтези',
      'приключения',
    ],
    '137 мин. / 02:17',
  ));
  cart.add(new Movie(
    1002,
    'Мстители: Эра Альтрона',
    105,
    2015,
    'США',
    'A new age begins',
    [
      'фантастика',
      'боевик',
      'приключения',
    ],
    '141 мин. / 02:21',
  ));
  cart.add(new Movie(
    1003,
    'Мстители: Финал',
    95,
    2019,
    'США',
    'Avenge the fallen',
    [
      'фантастика',
      'боевик',
      'драма',
      'приключения',
    ],
    '181 мин. / 03:01',
  ));

  expect(cart.amountPrice()).toBe(300);
  expect(cart.amountPrice(0.5)).toBe(150);
});

test('удаление уже добавленный в корзину объект', () => {
  const cart = new Cart();
  cart.add(new Movie(
    1001,
    'Мстители',
    100,
    2012,
    'США',
    'Avengers Assemble!',
    [
      'фантастика',
      'боевик',
      'фэнтези',
      'приключения',
    ],
    '137 мин. / 02:17',
  ));
  cart.add(new Movie(
    1002,
    'Мстители: Эра Альтрона',
    105,
    2015,
    'США',
    'A new age begins',
    [
      'фантастика',
      'боевик',
      'приключения',
    ],
    '141 мин. / 02:21',
  ));
  cart.add(new Movie(
    1003,
    'Мстители: Финал',
    95,

    2019,
    'США',
    'Avenge the fallen',
    [
      'фантастика',
      'боевик',
      'драма',
      'приключения',
    ],
    '181 мин. / 03:01',
  ));
  cart.delItem(1002);
  expect(cart.items.length).toBe(2);
});

test('удаление уже не существующего', () => {
  const cart = new Cart();
  cart.add(new Movie(
    1001,
    'Мстители',
    100,
    2012,
    'США',
    'Avengers Assemble!',
    [
      'фантастика',
      'боевик',
      'фэнтези',
      'приключения',
    ],
    '137 мин. / 02:17',
  ));
  cart.add(new Movie(
    1002,
    'Мстители: Эра Альтрона',
    105,
    2015,
    'США',
    'A new age begins',
    [
      'фантастика',
      'боевик',
      'приключения',
    ],
    '141 мин. / 02:21',
  ));
  cart.add(new Movie(
    1003,
    'Мстители: Финал',
    95,
    2019,
    'США',
    'Avenge the fallen',
    [
      'фантастика',
      'боевик',
      'драма',
      'приключения',
    ],
    '181 мин. / 03:01',
  ));
   expect(() => {
    cart.delItem(1005);
   }).toThrow();
});

test('Общая стоимость смартфонов - один добавлен дважды', () => {
  const cart = new Cart();
  cart.add(new Smartphone(
    1004,
    'Redmi Note 8',
    1000,
    1,
    'Android 8',
    'Xiaomi',
  ));
  cart.add(new Smartphone(
    1005,
    'Redmi Note 7',
    1500,
    1,
    'Android 7',
    'Xiaomi',
  ));
  cart.add(new Smartphone(
    1005,
    'Redmi Note 7',
    1500,
    1,
    'Android 7',
    'Xiaomi',
  ));

  expect(cart.amountPrice()).toBe(4000);
  expect(cart.amountPrice(0.5)).toBe(2000);
});

test('Проверка на уменьшение количества товаров', () => {
  const cart = new Cart();
  cart.add(new Smartphone(
    1004,
    'Redmi Note 8',
    1000,
    1,
    'Android 8',
    'Xiaomi',
  ));
  cart.add(new Smartphone(
    1005,
    'Redmi Note 7',
    1500,
    1,
    'Android 7',
    'Xiaomi',
  ));
  cart.add(new Smartphone(
    1005,
    'Redmi Note 7',
    1500,
    1,
    'Android 7',
    'Xiaomi',
  ));
  cart.minusProduct(1005)
  const expected = cart.items.find(item => item.id === 1005);
  
  expect(expected?.amount).toBe(1);
});

test('Проверка на уменьшение количества товаров', () => {
  const cart = new Cart();
  cart.add(new Smartphone(
    1004,
    'Redmi Note 8',
    1000,
    1,
    'Android 8',
    'Xiaomi',
  ));
  cart.add(new Smartphone(
    1005,
    'Redmi Note 7',
    1500,
    1,
    'Android 7',
    'Xiaomi',
  ));
  cart.add(new Smartphone(
    1005,
    'Redmi Note 7',
    1500,
    1,
    'Android 7',
    'Xiaomi',
  ));
  cart.minusProduct(1005)
  cart.minusProduct(1005)
  const expected = cart.items.find(item => item.id === 1005);
  
  expect(expected).toBe(undefined);
});