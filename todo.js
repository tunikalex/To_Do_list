(function () {
  // создаём и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаём и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.id = 'input';
    input.type = 'text';
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Создать дело';
    // строчка ниже делает синюю кнопку визуально неактивной при запуске приложения
    button.classList.add('disabled');

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  };

  // создаём и возвращаем список элементов
  function creteTodoList() {
    let list = document.createElement(`ul`);
    list.classList.add(`list-group`);
    return list;
  };

  //создаём дело
  function createTodoItem(nameObj) {
    let item = document.createElement('li');
    // кнопки помещаем в элемент который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneBtn = document.createElement('button');
    let deleteBtn = document.createElement('button');

    // устанавливаем стили для элементов списка,
    // а так же для элементов списка в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = nameObj.name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneBtn.classList.add('btn', 'btn-success')
    doneBtn.textContent = 'Готово';
    deleteBtn.classList.add('btn', 'btn-danger')
    deleteBtn.textContent = "Удалить";

    // вкладывем кнопки в один элемент, что бы они объеденились в один блок
    buttonGroup.append(doneBtn);
    buttonGroup.append(deleteBtn);
    item.append(buttonGroup);

    // приложению нужен доступ как к списку так и каждой кнопке,
    // чтобы обрабатывать нажатие
    return {
      item,
      deleteBtn,
      doneBtn,
    };
  }

  // создаём id для элемента задачи, проверяем его на совпадения с уже существующими ID
  function createArrayId(nameObj) {
    let randomId = Math.round(Math.random() * 1000);

    if (todoArray.length !== 0) {
      for (let object of todoArray) {
        if (object.id == randomId) {
          createArrayElement(nameObj);
        }
      }
    }

    return randomId
  }

  //создаём список дел для конкретного пользователя в зависимости от контенера в HTML
  // сборочная функция
  function createTab(contaner, title = 'Список дел') {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = creteTodoList();

    contaner.append(todoAppTitle);
    contaner.append(todoItemForm.form);
    contaner.append(todoList);

    // находим в DOM синюю кноку, находим поле ввода,
    // если поле ввода не пустое, отменяем class='disablrd'
    let btnPrimary = document.body.getElementsByClassName('btn-primary');
    let inp = document.getElementById('input');
    inp.addEventListener('input', function () {
      if (inp.value == '') {
        btnPrimary[0].classList.add('disabled');
      } else {
        btnPrimary[0].classList.remove('disabled');
      }
    });

    // браузер создаёт событие submit на форме после нажатия кнопки или Enter
    todoItemForm.form.addEventListener('submit', function (e) {

      // эта строчка необходима что бы предотвратить стандартную реакцию браузера,
      // в нашем случае перезагрузку страницы
      e.preventDefault();
      // проверяем на пустоту внутри формы
      if (!todoItemForm.input.value) {
        return;
      }

      // создаём и добавляем в список новое дело,
      let taskDate = { 'name': todoItemForm.input.value, 'done': false };
      let todoItem = createTodoItem(taskDate);
      //генерируем id и добавляем данные в массив
      let id = createArrayId(nameObj = taskDate);
      todoArray.push({ 'id': id, 'name': todoItemForm.input.value, 'done': false });

       // добавляем обработчики событий на кнопки
      todoItem.doneBtn.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
        for (let object of todoArray) {
          if (object.id == id) {
            object.done = (object.done == false) ? true : false;
          }
        }
      });
      todoItem.deleteBtn.addEventListener('click', function () {
        if (confirm('вы уверены?')) {
          todoItem.item.remove();
          let count = 0;
          for (let object of todoArray) {
            if (object.id == id) {
              todoArray.splice(count, 1);
              console.log('удаление произошло');
            };
            count++;
          }
        }
      });
      // создаём и добавляем в лист новое дело
      todoList.append(todoItem.item);

      console.log('В списке дел находится:')
      for (let elArr of todoArray) {
        console.log(elArr);
      }

      // обнуляем значение в поле ввода
      todoItemForm.input.value = "";
      let btnPrimary = document.body.getElementsByClassName('btn-primary');
      btnPrimary[0].classList.add('disabled');
    })
  }

  let todoArray = []
  window.createTab = createTab
})()
