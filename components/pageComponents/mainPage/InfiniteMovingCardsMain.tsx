import React from "react";
import { InfiniteMovingCards } from "./InfiniteMovingCards";

const items = [
  {
    quote:
      "Скидка 20% на все запчасти для автомобилей Toyota только до конца месяца!",
    name: "Акция месяца",
    title: "Спешите воспользоваться!",
  },
  {
    quote:
      "Купите комплект шин и получите бесплатную установку и балансировку!",
    name: "Специальное предложение",
    title: "Только до конца недели",
  },
  {
    quote: "Замена масла и фильтров со скидкой 15%! Успейте записаться!",
    name: "Скидка на услуги",
    title: "Акция ограничена",
  },
  {
    quote:
      "При покупке запчастей на сумму от 5000 рублей — бесплатная доставка по Сургуту!",
    name: "Бесплатная доставка",
    title: "Спешите воспользоваться",
  },
  {
    quote:
      "Сезонная распродажа автозапчастей: скидки до 50% на определенные позиции!",
    name: "Сезонная распродажа",
    title: "Только сейчас",
  },
];

const InfiniteMovingCardsMain = () => {
  return <InfiniteMovingCards items={items} className="mt-20" />;
};

export default InfiniteMovingCardsMain;
