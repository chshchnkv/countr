/**
* Наследует объект от другого
* @param {Function} child - child of parent
* @param {Function} parent - parent of child
*/
export default function(child, parent) {
//  for (var key in parent) {
//    if (Object.prototype.hasOwnProperty.call(parent, key)) {
//      child[key] = parent[key];
//    }
//  }

  function EmptyCtor() {}
  EmptyCtor.prototype = parent.prototype;
  child.prototype = new EmptyCtor();

  child.__super__ = parent.prototype;
}
