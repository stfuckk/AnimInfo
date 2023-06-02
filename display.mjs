// Данный модуль отвечает за отображение данных, принятых из модуля data_handler
// при нажатии различных кнопок, чекбоксов и т.п.

import {get_latest_titles} from "./data_handler.mjs"

// Начальные элементы приветственной страницы
const hello_container = document.getElementById('hello_container')
const bgVideo = document.getElementById('bgVideo');
const main_container = document.getElementById('main_container');


// При нажатии на next_btn, мы проверяем ввод имени и если имя введено, то скрываем стартовые
// элементы и запускаем страницу с отображенными тайтлами.
next_btn.addEventListener('click', async () => {
    if (hello_textfield.value !== '') {
        await display_latest_titles().then(console.log('latest_titles_success'));
        hello_container.remove();
    }
    else input_err.hidden = false;
});

async function display_latest_titles() {
    const div = document.createElement('div');
    div.id = 'loading_container';
    div.innerHTML = `<image src="./media/loading.png" width=25% height=25% id='loading_image'></image>`
    main_container.appendChild(div);
    bgVideo.style.opacity = '50%';
}