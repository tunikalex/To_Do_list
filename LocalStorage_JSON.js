// Теория LocalStorage
localStorage.setItem('key', 'value');
localStorage.getItem('key');

// Теория JSON

//данный метод вернёт входящие данные в виде строки
function dataToJson(data) {
    return JSON.stringify(data);
}

//данный метод вернёт входящую строку в виде данных
function jsonToData(data) {
    return JSON.parse(data);
}

//данный метод вернёт данные из LocalStore
function getCartData() {
    return localStorage.getItem('key');
}

//данный метод запишет данные в LocalStore
function setCartData(data) {
    localStorage.setItem('key', data);
}


//------------------------------------------------------
//ПРИМЕР РАБОТЫ С КОРЗИНОЙ МАГАЗИНА 
//-----------------------------------------------------
function addToCart(product) {
    // получаем текущее состояние корзины
    let cart = getCartData();

    //в случае если данных по ключу LocalStorage нет, то карт будет содержать null
    // если cart имеет null - записываем туда пустой массив
    cart = cart ? jsonToData(cart) : [];

    //добавим продукт в корзину и запишем в localStore
    cart.push(product);
    setCartData(dataToJson(cart));
}

//метод удаляющий элемент из корзины
//в качестве параметра получает id товара
function removeFromCart(id) {
    //получим состояние корзины и преобразуем JSON в JavaSkript данные 
    let cart = jsonToData(getCartData());

    //создадим новый список корзины, в который перенесём все 
    //данные кроме удаляемых
    let newCart = [];
    for (let i=0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i])
        }
    }

    //преобразуем данные новой корзины d JSON и запишем в localStorage
    setCartData(dataToJson(newCart));
}