// Данный модуль отвечает за запросы к API и подготовку объектов для передачи в модуль display.

import { Anilibria } from "anilibria-api-wrapper";
import { all } from "axios";

const anilibriaApi = new Anilibria();

async function get_latest_titles() {
    // получаем список обновлений тайтлов в хронологическом порядке, исключая обновления на youtube
    await anilibriaApi.getFeed({
        remove: 'youtube',
        limit: 10
    }).then(response => {
        let data = response.data;
        let titles = [];
        data.forEach(element => {

            console.log(element['title']['posters']['medium']['url']); 
            // ссылка подставляется к домену анилибрии, который заблокирован в РФ,
            // поэтому картинку будем вытаскивать из зеркала https://vk.anilib.top/
        });
    });
}

get_latest_titles();

export { get_latest_titles };