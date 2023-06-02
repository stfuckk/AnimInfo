// Данный модуль отвечает за отображение данных, принятых из модуля data_handler
// при нажатии различных кнопок, чекбоксов и т.п.

// Элементы приветственной страницы
const hello_container = document.getElementById('hello_container')
const bgVideo = document.getElementById('bgVideo');
const main_container = document.getElementById('main_container');


// При нажатии на next_btn, мы проверяем ввод имени и если имя введено, то скрываем стартовые
// элементы и запускаем страницу с отображенными тайтлами.
next_btn.addEventListener('click', async () => {
    if (hello_textfield.value !== '')
        hello_container.remove();
    else input_err.hidden = false;
    
    display_latest_titles();
});

async function display_latest_titles() {
    const titles = await get_latest_titles();
    alert(titles);
    let div = document.createElement('div');
    div.innerHTML = '';
    main_container.append(div);
}