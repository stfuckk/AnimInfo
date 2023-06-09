// Данный модуль отвечает за запросы к API и подготовку объектов для передачи в модуль display.

const anilibriaApiURL = 'https://api.anilibria.tv/v2/';


// данная функция используется при открытии главного окна страницы
async function get_latest_titles() {
    let json;
    // получаем список последних обновлений в хронологическом порядке, исключая обновления на youtube
    let response = await fetch(anilibriaApiURL + 'getFeed?limit=20');
    if (response.ok) {
        json = await response.json();
    }
    else {
        alert('Ошибка HTTP: ' + response.status + '\nПосле исправления ошибки, обновите страницу.');
    }


    let titles = [];

    // создаем объект по каждому тайтлу и добавляем в список titles
    json.forEach(element => {
        if (element['title']) {
            let title = {
                'id': element.title.id,
                'name': element.title.names.ru,
                'poster': 'https://dl-20230603-6.anilib.one' + element.title.posters.original.url, // https://static-libria.weekstorm.one https://vk.anilib.top https://dl-20230603-6.anilib.one
                'description': (element.title.description).split('\n\n')[0],
                'year': element.title.season.year,
                'series_count': element.title.type.series,
                'genres': element.title.genres.join(', ')
            };
            titles.push(title);
        }
    });
    return titles;
}

// данная функция используется при запросе поиска
async function search_titles(title_name) {
    let json
    let response = await fetch(anilibriaApiURL + `searchTitles?search=${title_name}`);
    if (response.ok) {
        json = await response.json();
    }
    else {
        alert('Ошибка HTTP: ' + response.status + '\nПосле исправления ошибки, обновите страницу.');
    }

    let titles = [];

    // создаем объект по каждому тайтлу
    json.forEach(element => {
        if (element['id']) {
            let title = {
                'id': element.id,
                'name': element.names.ru,
                'poster': 'https://dl-20230603-6.anilib.one' + element.posters.original.url, // https://static-libria.weekstorm.one https://vk.anilib.top https://dl-20230603-6.anilib.one
                'description': (element.description).split('\n\n')[0],
                'year': element.season.year,
                'series_count': element.type.series,
                'genres': element.genres.join(', ')
            };
            titles.push(title);
        }
    });
    return titles;
}

// данная функция используется для получения рандомного тайтла из базы anilibria
async function get_random() {
    let is_good = false;
    let json;
    while (is_good === false) {
        let response = await fetch(anilibriaApiURL + 'getRandomTitle');
        if (response.ok) {
            json = await response.json();
        }
        else {
            alert('Ошибка HTTP: ' + response.status + '\nПосле исправления ошибки, обновите страницу.');
        }

        is_good = true;
        let bad_genres = ["Гарем", "Дзёсей", "Сёдзе-ай", "Сейнен", "Этти", "Романтика"];
        bad_genres.forEach(element => {
            if (json.genres.includes(element))
                is_good = false;
        });
    }

    if (json.description === null) {
        return get_random();
    }

    let title = {
        'id': json.id,
        'name': json.names.ru,
        'poster': 'https://dl-20230603-6.anilib.one' + json.posters.original.url,
        'description': (json.description).split('\n\n')[0],
        'year': json.season.year,
        'series_count': json.type.series,
        'genres': (json.genres).join(', ')
    }
    return title;
}

// неэкспортируемая функция, которая вернет набор жанров для последующей фильтрации по ним
async function get_genres() {
    let json;

    let response = await fetch(anilibriaApiURL + 'getGenres');
    if (response.ok) {
        json = await response.json();
    }
    else {
        alert('Ошибка HTTP: ' + response.status + '\nПосле исправления ошибки, обновите страницу.');
    }
    return json;
}

export { get_latest_titles, search_titles, get_random };