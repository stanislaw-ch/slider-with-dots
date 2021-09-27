'use strict';

// за основу взят пример реализации слайдера, найденого на гитхабе: https://github.com/itchief/ui-components/blob/master/chiefSlider-1/chiefslider-with-looping.html

const getSlider = (selector) => {
  if (selector) {
    const mainElement = document.querySelector(selector); // основный элемент блока
    const sliderList = mainElement.querySelector(`.slider__list`); // обертка для .slider-item
    const sliderItems = mainElement.querySelectorAll(`.slider__item`); // элементы (.slider-item)

    const wrapperWidth = sliderList.clientWidth; // ширина обёртки
    const itemWidth = sliderItems[0].clientWidth; // ширина одного элемента

    const prev = mainElement.querySelector(`.slider__button--prev`); // элемент кнопки previous
    const next = mainElement.querySelector(`.slider__button--next`); // элемент кнопки next

    let positionLeftItem = 0; // позиция левого активного элемента
    let transform = 0; // значение транфсофрмации .slider_wrapper
    const step = itemWidth / wrapperWidth * 100; // величина шага (для трансформации)
    const items = []; // массив элементов

    const amountOfSlides = sliderItems.length; // кол-во слайдов в DOM-дереве

    const position = {
      "getItemMin": function () {
        let indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      "getItemMax": function () {
        let indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      "getMin": function () {
        return items[position.getItemMin()].position;
      },
      "getMax": function () {
        return items[position.getItemMax()].position;
      }
    };

    const createDots = (count) => {
      let dotList = document.createElement(`div`);
      dotList.classList.add(`slider__dots`);

      for (let i = 1; i <= count; i++) {
        let dot = document.createElement(`button`);
        dot.classList.add(`slider__dot`);
        dotList.appendChild(dot);
        mainElement.appendChild(dotList);
      }
    };

    createDots(amountOfSlides);
    const dotItems = mainElement.querySelectorAll(`.slider__dot`);
    dotItems[0].classList.add(`slider__dot--active`);

    const transformItem = function (direction) {
      let nextItem = null;
      if (direction === `right`) {
        positionLeftItem++;
        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = `translateX(` + items[nextItem].transform + `%)`;
        }
        transform -= step;
      }
      if (direction === `left`) {
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = `translateX(` + items[nextItem].transform + `%)`;
        }
        transform += step;
      }
      sliderList.style.transform = `translateX(` + transform + `%)`;
      dotItems.forEach((dot) => dot.classList.remove(`slider__dot--active`));

      const currentIndex = items.findIndex((x) => x.position === positionLeftItem);
      dotItems[items[currentIndex].dotIndex].classList.add(`slider__dot--active`);
    };

    let xDown = null; // значение по оси х
    let yDown = null; // значение по оси у

    const handleTouchStart = (evt) => {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    };

    const handleTouchMove = (evt) => {
      if (!xDown || !yDown) {
        return;
      }

      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          transformItem(`right`);
        } else {
          transformItem(`left`);
        }
      }
      xDown = null;
      yDown = null;
    };

    // наполнение массива items
    sliderItems.forEach(function (item, index) {
      items.push({item, position: index, transform: 0, dotIndex: index});
    });

    dotItems.forEach((item) => item.addEventListener(`click`, async (evt) => {
      const onClickIndex = [...dotItems].indexOf(evt.target);
      const previousIndex = items[items.findIndex((x) => x.position === positionLeftItem)].dotIndex;
      if (onClickIndex === previousIndex) {
        return;
      }
      if (onClickIndex > previousIndex) {
        for (let i = previousIndex; i < onClickIndex; i++) {
          transformItem(`right`);
        }
      }
      if (onClickIndex < previousIndex) {
        for (let i = previousIndex; i > onClickIndex; i--) {
          transformItem(`left`);
        }
      }
    }));

    next.addEventListener(`click`, () => {
      transformItem(`right`);
    });

    prev.addEventListener(`click`, () => {
      transformItem(`left`);
    });

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `ArrowRight`) {
        transformItem(`right`);
      }
      if (evt.key === `ArrowLeft`) {
        transformItem(`left`);
      }
    });

    sliderList.addEventListener(`touchstart`, handleTouchStart);
    sliderList.addEventListener(`touchmove`, handleTouchMove);
  }
};

getSlider(`.slider`);
