## Учебный проект "AnimInfo" - фронтенд на JS с использованием API Anilibria V2
##### Реализованные функции, доступные при открытии страницы:
###### - Приветственная страница, где можно ввести имя пользователя:
![hello_page](https://github.com/stfuckk/AnimInfo/blob/main/screenshots/hello_page.png)
###### - Лента "интересных обновлений тайтлов":
![main_feed](https://github.com/stfuckk/AnimInfo/blob/main/screenshots/main_feed.png)
###### - Блок поиска тайтлов (поле ввода + кнопка):
![main_search](https://github.com/stfuckk/AnimInfo/blob/main/screenshots/main_search.png)
###### - Кнопка, отображающая информацию о случайном тайтле из базы:
![main_random_btn](https://github.com/stfuckk/AnimInfo/blob/main/screenshots/main_random_btn.png)

##### Описание модулей:
> - **data_handler.mjs** используется для работы с API и распаковки json ответов с последующей отправкой в модуль display.mjs.
> - **display.mjs** используется для обработки пользовательских действий и, соответственно, отображения нужных данных.

##### Запуск страницы на локальном хосте:
###### 1) Открыть проект в VS Code.
###### 2) Установить расширение Live Server.
###### 3) Открыть в редакторе файл index.html.
###### 4) В нижнем правом углу окна VS Code нажать "Go Live" или сочетание ALT+O+L.
