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
        input.placeholder = 'введите название нового дела';
        buttonWrapper.classList.add('input-group-apend');
        button.classList.add('btn', 'btn-pramary');
        button.textContent = 'Создать дело';

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

    function createTodoItem(name) {
        let item = document.createElement('li');
        // кнопки помещаем в элемент который красиво покажет их в одной группе
        let buttonGroup = document.createElement('div');
        let doneBtn = document.createElement('button');
        let deleteBtn = document.createElement('button');

        // устанавливаем стили для элементов списка, 
        // а так же для элементов списка, 
        // в его правой части с помощью flex
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        item.textContent = name;

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

    function createTab(contaner, title = 'Список дел') {
        // let contaner = document.getElementById(`todo-app`);
        let todoAppTitle = createAppTitle(title);
        let todoItemForm = createTodoItemForm();
        let todoList = creteTodoList();

        contaner.append(todoAppTitle);
        contaner.append(todoItemForm.form);
        contaner.append(todoList);

        // браузер создаёт событие submit на форме после нажатия кнопки или энтер
        todoItemForm.form.addEventListener('submit', function (e) {
            // эта строчка необходима что бы предотвратить стандартную реакцию браузера,
            // в нашем случае перезагрузку страницы
            e.preventDefault();
            // проверяем на пустоту внутри формы
            if (!todoItemForm.input.value) {
                return;
            }
            // создаём и добавляем в список новое дело,
            // todoList.append(createTodoItem(todoItemForm.input.value).item);

            let todoItem = createTodoItem(todoItemForm.input.value)

            // добавляем обработчики событий на кнопки 
            todoItem.doneBtn.addEventListener('click', function () {
                todoItem.item.classList.toggle('list-group-item-success')
            });
            todoItem.deleteBtn.addEventListener('click', function () {
                if (confirm('вы уверены?')) {
                    todoItem.item.remove();
                }
            });
            // создаём и добавляем в лист новое дело
            todoList.append(todoItem.item);
            // обнуляем значение в поле ввода
            todoItemForm.input.value = "";
        })
    }
    window.createTab = createTab
})()

