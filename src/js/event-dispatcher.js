/**
 * Обработчик событий на объектах
 */
function EventDispatcher() {
  this.subscribers = [];
}

/**
 * Добавить слушателя события
 * @param {object} obj - объект, который будет уведомлен о наступлении события
 */
EventDispatcher.prototype.addSubscriber = function(obj) {
  this.subscribers.push(obj);
};

/**
 * Запуск события и оповещение всех подписчиков о нём
 * Подписчик события должен содержать в себе функцию-обработчик, имя которой составляется следующим образом: _on{eventName}, например, для события changevalue обработчик должен называться _onchangevalue
 * @param {string} eventName - наименование события
 * @param {object} data      - данные, которые будут переданы подписчикам в связи со сработавшим событием
 */
EventDispatcher.prototype._fireEvent = function(eventName, data) {
  let handler = `_on${eventName}`;

  this.subscribers.forEach((item) => {
    if ((handler in item) && (typeof item[handler] === 'function')) {
      item[handler](data);
    }
  });
};

export default EventDispatcher;
