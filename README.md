# Проект: Место

### Обзор

Данная страница разработана в процессе работы над 4-8 проектами программы ЯндексПрактикума - Веб-разработчик.
Студент - Николай Шикалено
Страница веб-приложения Mesto - которое помогает организовывать фотографии за авторством и ставить им лайки.

**Pages**

* [https://wolfox18.github.io/mesto/](https://wolfox18.github.io/mesto/)

**Исползованные технологии**

* HTML
* CSS
* Флекс-боксы
* Адаптивная верстка
* Плавные открытия попапов
* Медиа-запросы и относительные размеры
* JS
* Работа с DOM
* Обработчик событий
* Работа с шаблонами - создание элементов из шаблонов
* Безопасное добавление элементов в документ
* Валидация форм
* ООП и классы
* Модульное программирование
* API и промизы
* Общение между классами на колбеках

**Текущая функциональность**

* Можно изменить имя пользователя и его описание. Открыть блок редактирования, нажав на иконку редактирования в профиле.
* Можно добавлять новые карточки и удалять их.
* Можно ставить лайк и снимать лайк, виодно количество лайков
* Можно открыть изображение в отдельном попапе.
* Можно редактировать аватар пользователя
* Вводимые пользователем данные валидируются.
* Все попапы закрываются по клавише Esc и по клику вне попапа.
* Все изменения сохраняются на сервере

Попапы сверстаны сразу и скрыты с помощью visability: hidden. Отображение реализовано через добавления класса модификатора.

Добавление карточек реализовано посредством ООП - элемент карточки - это экземпляр класса Card. Все слушатели событий и работа с разметкой реализована в приватных методах. Карточка создавается из шаблона.

Валидация происходит не при помощи стандартных сообщений браузеров, а предустановленными сообщениями, и, также, реализованная средствами ООП. Кнопка отправки формы неактивна, пока поля не валидны.


**Дальнейшие планы**

Что я бы сделал
* Пользоватльеское кадрирование новых изображений
* На превью карточки данные о ее владельце