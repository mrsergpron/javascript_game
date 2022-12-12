// var button = document.querySelector('button');

// button.addEventListener('click', function () {
//   var value = document.querySelector('input').value;
//   console.log(typeof value);

//   //хранение данных
//   localStorage.setItem('headerText', value);
// });

// //загрузка всего дом дерева
// document.addEventListener('DOMContentLoaded', function () {
//   var text = localStorage.getItem('headerText');
//   document.querySelector('h1').textContent = text;
// });

//сохранение объекта
var button = document.querySelector('button');

button.addEventListener('click', function () {
  var value = document.querySelector('input').value;

  var obj = {
    name: value,
  };

  //хранение данных
  localStorage.setItem('headerText', JSON.stringify(obj));
});

//загрузка всего дом дерева
document.addEventListener('DOMContentLoaded', function () {
  var obj = JSON.parse(localStorage.getItem('headerText'));
  document.querySelector('h1').textContent = obj.name;
});
