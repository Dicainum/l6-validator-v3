## Задание

Ваша задача написать валидатор, в котором есть ряд методов и свойств и экспортировать его из файла *index.js*. Валидатор позволяет проверять аргументы на соответствие необходимым условиям, которые были заданы с помощью методов валидатора. Запуск валидатора происходит в конце задачи, с помощью метода `isValid()`.

Пример использования:

```javascript
// создаем экземпляр валидатора
const v = new Validator();
// определяем метод для валидации строк и связываем его с валидатором, обращаясь к нему через переменную.
const schema = v.string();

// проверяем данные на соответствие строковому типу, с помощью метода isValid()
schema.isValid(null); // false
schema.isValid(''); // true
schema.isValid(123); // false
```

### Примечания

Вы можете самостоятельно протестировать работу валидатора. В каталоге *src* разрешено использовать любые файлы, только с расширением **js** и создавать новые, если это делает вашу разработку более удобной.

Для тестирования валидатора, достаточно создать экземпляр валидатора, настроить валидацию с помощью методов и вызвать метод `validate()` с необходимым аргументом, после чего написать в терминале:

```bash
node index.js
```

## 1 задача

Вам необходимо создать валидатор, который способен принимать аргумент и проводить его проверку на соответствие определенным условиям. В данной задаче мы ограничиваемся валидацией чисел. Для этого в вашем валидаторе должен быть метод `number()`, который создает экземпляр валидатора чисел. Этот экземпляр обладает методом `isValid()`, который принимает данные на вход и возвращает значение true или false в зависимости от того, являются ли входные данные числом.

```javascript
const v = new Validator();
const schema = v.number();

schema.isValid(null); // false
schema.isValid(''); // false
schema.isValid(true); // false
schema.isValid(123); // true
schema.isValid(0); // true
schema.isValid(2); // true
schema.isValid(-3); // true
schema.isValid(4.1); // true
```

## 2 задача

Вам необходимо создать валидатор массивов, который будет возвращаться при вызове метода  `array()`. Этот экземпляр обладает методом `isValid()`, который принимает данные на вход и возвращает значение true или false, в том случае, если на вход нам пришел массив. Валидатор `array()` также должен иметь метод `allIntegers()`, который проверяет, что все элементы массива являются целыми числами.

```javascript
const v = new Validator();

const schema1 = v.array();
schema1.isValid([]); // true;
schema1.isValid([1,2]); // true;
schema1.isValid(12); // false;
schema1.isValid({}); // false;

const schema2 = v.array().allIntegers();
schema1.isValid([]); // true;
schema1.isValid([1,2]); // true;
schema1.isValid([12, 'b']); // false;
schema1.isValid({}); // false;
schema1.isValid([1.2, 1, 2]); // false;
schema1.isValid([122n, 0]); // true;
```

## 3 задача

Расширьте функционал валидатора массивов `array()`, добавив в него кастомную валидацию элементов массива. Это означает, что в экземпляр валидатора массивов можно добавить свой валидатор для каждого элемента массива с помощью метода `custom()`. Переданный валидатор должен проверять каждый элемент массива на соответствие определенному условию.

```javascript
const v = new Validator();
const schema1 = v.array().custom((element) => (element % 2) === 0);

schema1.isValid([1, 2]); // false;
schema1.isValid([2, 4, 8, 12]); // true;
schema1.isValid([1.2]); // false;
```

## 4 задача

Вам необходимо создать валидатор полей объекта, используя методы, представленные в предыдущих задачах. Для этого необходимо создать метод `object()`, который проверяет не сам объект, а данные внутри него на соответствие заданным валидаторам. Внутри объекта может быть еще один вложенный объект, таким образом должна быть реализована проверка на любой глубине вложенности. Метод `Validator.object()` должен содержать метод `shape()`, позволяющий задать поля, подлежащие валидации, для объекта. Метод `shape()` принимает объект, где ключи представляют поля, которые требуется проверить, а значения - экземпляры валидаторов.

**Методы**

- метод валидатора (экземпляр класса *Validator*) `object()`, который проверяет данные внутри объекта (поля объекта). Проверка должна выполнятся на любом уровне глубины.
- метод `shape()`, который вызывается у экземпляра `object()`. Он позволяет задать поля валидации для объекта

```javascript
const v = new Validator();

const schema = v.object().shape({
    num: v.number(),
    obj: v.object().shape({
      array: v.array().integer(),
      innerObj: v.object().shape({
        num: v.number(),
        deepestObj: v.object().shape({
          num: v.number(),
        }),
      }),
    }),
  });

schema.isValid({ 
  num: 54, 
  obj: { 
    array: [1, 2], 
    innerObj: { 
      num: 2, 
      deepestObj: { num: 5 }
    }
  } 
}); // true
```