function EventDispatcher() {
  this.subscribers = [];
}

EventDispatcher.prototype.addSubscriber = function(obj) {
  this.subscribers.push(obj);
};

EventDispatcher.prototype._fireEvent = function(eventName, data) {
  let handler = `_on${eventName}`;

  this.subscribers.forEach((item) => {
    if ((handler in item) && (typeof item[handler] === 'function')) {
      item[handler](data);
    }
  });
};

export default EventDispatcher;
