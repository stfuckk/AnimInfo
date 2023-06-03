// Данный модуль отвечает за отображение данных, принятых из модуля data_handler
// при нажатии различных кнопок, чекбоксов и т.п.

import { get_latest_titles } from "./data_handler.mjs"

// Начальные элементы приветственной страницы
const hello_container = document.getElementById('hello_container')
const bgVideo = document.getElementById('bgVideo');
const main_container = document.getElementById('main_container');


// При нажатии на next_btn, мы проверяем ввод имени и если имя введено, то скрываем стартовые
// элементы и запускаем страницу с отображенными тайтлами.
next_btn.addEventListener('click', async () => {
    if (hello_textfield.value !== '') {
        hello_container.remove();
        const div = document.createElement('div');
        div.id = 'loading_container';
        div.innerHTML = `<image src="./media/loading.png" width=25% height=25% id='loading_image'></image>`
        main_container.appendChild(div);
        bgVideo.style.opacity = '50%';
        const titles = await get_latest_titles();
        //bgVideo.remove();
        display_titles(titles);
        div.remove();
    }
    else input_err.hidden = false;
});


// Отображает информацию на основной странице, а также создает дополнительные элементы управления 
function display_titles(titles) {

    // Создаем блок с последними обновлениями Anilibria
    const header = document.createElement('h3');
    header.id = 'main_header';
    header.textContent = 'Интересные обновления:'
    const title_container = document.createElement('div');
    title_container.appendChild(header);
    title_container.id = 'title_container';
    main_container.appendChild(title_container);

    for (const title of titles) {
        const title_div = document.createElement('div');
        title_div.classList.add('title_div');
        title_container.appendChild(title_div);

        const poster_img = document.createElement('img');
        poster_img.src = title.poster;
        poster_img.alt = `${title.name} poster`;
        poster_img.classList.add('poster_img');
        title_div.appendChild(poster_img);

        const info_div = document.createElement('div');
        info_div.classList.add('info_div');
        title_div.appendChild(info_div);

        const name_h3 = document.createElement('h3');
        name_h3.textContent = title.name;
        info_div.appendChild(name_h3);

        const desc_p = document.createElement('p');
        desc_p.textContent = title.description;
        info_div.appendChild(desc_p);
    }

    // Создаем блок для поиска аниме.
    const search_container = document.createElement('div');
    search_container.classList.add('search_container');
    main_container.insertBefore(search_container, title_container);

    const search_input = document.createElement('input');
    search_input.type = 'text';
    search_input.placeholder = 'Введите название аниме...';
    search_input.classList.add('search_input');
    search_input.maxLength = '90'
    search_container.appendChild(search_input);

    const search_btn = document.createElement('button');
    search_btn.textContent = 'Найти';
    search_btn.classList.add('search_btn');
    search_container.appendChild(search_btn);

    search_btn.addEventListener('click', () => {
        const query = search_input.value;
        //searchTitle(query);
    });
}