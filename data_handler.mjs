// Данный модуль отвечает за запросы к API и подготовку объектов для передачи в модуль display.

const anilibriaApiURL = 'https://api.anilibria.tv/v2/';


// данная функция используется при открытии главного окна страницы
async function get_latest_titles() {
    let json
    // получаем список последних обновлений в хронологическом порядке, исключая обновления на youtube
    let response = await fetch(anilibriaApiURL + 'getFeed?limit=10')
    if (response.ok) {
        json = await response.json();
    }
    else {
        alert('Ошибка HTTP: ' + response.status);
    }


    let titles = [];

    // создаем объект по каждому тайтлу и добавляем в список titles
    json.forEach(element => {
        if (element['title']) {
            let title = {
                'id': element['title']['id'],
                'name': element['title']['names']['ru'],
                'poster': 'https://vk.anilib.top' + element['title']['posters']['original']['url'], // https://static-libria.weekstorm.one https://vk.anilib.top https://dl-20230603-6.anilib.one
                'description': (element['title']['description']).split('\n\n')[0]
            };
            titles.push(title);
        }
    });
    return titles;
}

export { get_latest_titles };