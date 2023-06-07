// Данный модуль отвечает за отображение данных, принятых из модуля data_handler
// при нажатии различных кнопок, чекбоксов и т.п.

import { get_latest_titles, search_titles } from "./data_handler.mjs"

// Начальные элементы приветственной страницы
const hello_container = document.getElementById('hello_container')
const bgVideo = document.getElementById('bgVideo');
const main_container = document.getElementById('main_container');
const hello_textfield = document.getElementById('hello_textfield');
const next_btn = document.getElementById('next_btn');

// --------------------------БЛОК ПРИВЕТСТВЕННОЙ СТРАНИЦЫ-----------------------
// При нажатии на next_btn, мы проверяем ввод имени и если имя введено, то скрываем стартовые
// элементы и запускаем страницу с отображенными тайтлами.
next_btn.addEventListener('click', async (event) => {
    event.preventDefault();
    if (hello_textfield.value !== '') {
        //Приветственное сообщение
        const hello_header = document.createElement('h3');
        hello_header.id = 'hello_header';
        hello_header.textContent = `Привет, ${hello_textfield.value}!`;
        main_container.appendChild(hello_header);

        // загружаем тайтлы
        hello_container.remove();
        const div = document.createElement('div');
        div.id = 'loading_container';
        div.innerHTML = `<image src="./media/loading.png" width=25% height=25% id='loading_image'></image>`
        main_container.appendChild(div);
        bgVideo.style.opacity = '60%';
        const titles = await get_latest_titles();
        display_titles(titles);
        div.remove();
    }
    else input_err.hidden = false;
});

// Добавляем подтверждение имени на кнопку Enter
hello_textfield.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        next_btn.click();
    }
});

// --------------------------БЛОК ОСНОВНОЙ СТРАНИЦЫ-----------------------
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

    // Добавляем список тайтлов
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

    search_btn.addEventListener('click', async () => {
        // здесь мы начинаем поиск по запросу query и отображаем список найденных тайтлов
        if (!document.querySelector(".result_container")) {
            const query = search_input.value;
            const titles = await search_titles(query);
            show_search_list(titles, query)
        }
        else {
            document.querySelector(".result_container").remove();
            search_btn.click();
        }
    });

    search_input.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            if (!document.querySelector(".result_container")) {
                const query = search_input.value;
                const titles = await search_titles(query);
                show_search_list(titles, query)
            }
            else {
                document.querySelector(".result_container").remove();
                search_btn.click();
            }
        }
    });
}

// функция, отображающая список найденных тайтлов при поиске, 
// предоставляет возможность выбрать из списка тайтл для подробной информации
function show_search_list(titles, query) {
    // отображаем сообщение, если тайтлы не найдены и выходим из функции
    if (!document.querySelector(".not_found_container") && titles.length === 0) {
        show_search_not_found(query);
        return;
    }
    else if (document.querySelector(".not_found_container") && titles.length === 0){
        document.querySelector(".not_found_container").remove();
        show_search_not_found(query);
        return;
    }

    else if (document.querySelector(".not_found_container") && titles.length > 0)
        document.querySelector(".not_found_container").remove();

    // создаем блок со списком
    const result_container = document.createElement('div');
    result_container.classList.add('result_container');
    main_container.insertBefore(result_container, title_container)


    titles.forEach(title => {
        const title_div = document.createElement('div');
        title_div.classList.add('s_title_div');
        result_container.appendChild(title_div);

        const poster_img = document.createElement('img');
        poster_img.src = title.poster;
        poster_img.alt = `${title.name} poster`;
        poster_img.classList.add('s_poster_img');
        title_div.appendChild(poster_img);

        const s_info = document.createElement('div');
        s_info.classList.add('s_info');
        title_div.appendChild(s_info);

        const name_p = document.createElement('p');
        name_p.classList.add('name_p');
        name_p.textContent = title.name;
        s_info.appendChild(name_p);

        const genres = document.createElement('p');
        genres.textContent = title.genres;
        genres.classList.add('genres');
        s_info.appendChild(genres);

        title_div.addEventListener('click', () => {
            // удаляем блок со списком найденных тайтлов
            result_container.remove();

            // скрываем блок с интересными обновлениями
            document.querySelector("#title_container").style.display = 'none';

            // очищаем поле поиска
            document.getElementsByClassName('search_input')[0].value = '';

            // делаем поиск не активным, пока открыто окно
            let search_textfield = document.querySelector('.search_input');
            let search_btn = document.querySelector('.search_btn');
            search_textfield.disabled = true;
            search_btn.disabled = true;


            // Создаем блок с подробной информацией о выбранном тайтле
            const detail_container = document.createElement('div');
            detail_container.classList.add('detail_container');
            main_container.appendChild(detail_container);

            //постер
            const poster_img = document.createElement('img');
            poster_img.src = title.poster;
            poster_img.alt = `${title.name} poster`;
            poster_img.classList.add('poster_img');
            detail_container.appendChild(poster_img);

            // подблок под информацию
            const info_block = document.createElement('div');
            info_block.classList.add('info_block');
            detail_container.appendChild(info_block);


            //название
            const name_h3 = document.createElement('h3');
            name_h3.textContent = title.name;
            info_block.appendChild(name_h3);
            //описание
            const desc_p = document.createElement('p');
            desc_p.textContent = title.description;
            info_block.appendChild(desc_p);
            //количество серий
            const series_count_p = document.createElement('p');
            series_count_p.textContent = `Количество серий: ${title.series_count}`;
            info_block.appendChild(series_count_p);
            //жанры
            const genres_p = document.createElement('p');
            genres_p.textContent = `Жанры: ${title.genres}`;
            info_block.appendChild(genres_p);

            //добавляем кнопку, которая закроет окно и вернет страницу в исходное состояние
            const close_btn = document.createElement('button')
            close_btn.textContent = 'X';
            close_btn.classList.add('close_btn');
            detail_container.appendChild(close_btn);

            close_btn.addEventListener('click', () => {
                detail_container.remove();
                search_textfield.disabled = false;
                search_btn.disabled = false;
                document.querySelector("#title_container").style.display = '';
            });
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') {
                    close_btn.click();
                }
            });
        });
    });
}

function show_search_not_found(query) {
    const not_found_container = document.createElement('div');
    not_found_container.classList.add('not_found_container');

    const not_found_mes = document.createElement('p');
    not_found_mes.textContent = `По запросу "${query}" ничего не найдено...`;
    not_found_container.appendChild(not_found_mes);
    main_container.insertBefore(not_found_container, title_container);
}