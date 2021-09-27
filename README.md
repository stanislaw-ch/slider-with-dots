# О слайдере
## это легкий адаптивный слайдер, написанный на чистом JavaScript без каких-либо зависимостей.
за основу взят принцип работы [**ChiefSlider**](https://github.com/itchief/ui-components/blob/master/chiefSlider-1/chiefslider-with-looping.html)

Особенности:
1.  Написан на чистом JavaScript.
2.  Бесконечная прокрутка.
3.  Поддержка перелистывания слайдов смахиванием (touch swipe) для устройств с сенсорным экраном;
4.  Зацикленность в отличие от других популярных слайдеров и каруселей реализована без клонирования элементов (слайдер не создаёт копию последнего элемента для вставки перед первым и первого для его размещения после последнего).
5.  Панель навигации в виде точек, для более быстрой прокрутки.

Основная HTML-структура слайдера выглядит так:
```
<div class="slider">
  <div class="slider__wrapper">
    <ul class="slider__list">
      <li class="slider__item slider__item--1">
          <!-- Контент 1 слайда -->
      </li>
      <li class="slider__item slider__item--2">
          <!-- Контент 2 слайда -->
      </li>
      <li class="slider__item slider__item--3">
          <!-- Контент 3 слайда -->
      </li>
    </ul>
  </div>
  <!-- Кнопки для перехода к предыдущему и следующему слайду -->
  <button  class="slider__button slider__button--prev"></button>
  <button  class="slider__button slider__button--next"></button>
  <!-- Панель навигации в виде точек, генерируется атоматически, относительно кол-ва слайдов -->
</div>
```
Слайдер настроен для показа одного активного элемента. 
