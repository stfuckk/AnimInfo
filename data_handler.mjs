// Данный модуль отвечает за запросы к API и подготовку объектов для передачи в модуль display.

import { Anilibria } from "anilibria-api-wrapper";

const anilibriaApi = new Anilibria();


// данная функция используется при открытии главного окна страницы
async function get_latest_titles() {

    // получаем список последних обновлений в хронологическом порядке, исключая обновления на youtube
    await anilibriaApi.getFeed({
        limit: 10, description_type: 'no_view_order'
    }).then(response => {
        let data = response.data;
        let titles = [];

        // создаем объект по каждому тайтлу и добавляем в список titles
        data.forEach(element => {
            if (element['title']) {
                let title = {
                    'id': element['title']['id'],
                    'name': element['title']['names']['ru'],
                    'poster': 'https://vk.anilib.top' + element['title']['posters']['small']['url'],
                    'description': (element['title']['description']).split('\n\n')[0]
                };
                titles.push(title);
            }
        });
        return titles;
    });
}

export { get_latest_titles };