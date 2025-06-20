# Rick and Morty Universe Explorer

Это интерактивное React-приложение с информацией вселенной Рика и Морти с использованием React Router, ContextAPI и JSON Server. Приложение позволяет просматривать персонажей, локации и эпизоды популярного мультсериала.

## Особенности

- Навигация между категориями: персонажи, локации, эпизоды

- Детальные страницы для каждого элемента

- Сортировка элементов по дате создания (ASC/DESC)

- Регистрация и авторизация пользователей

- Приватные страницы для авторизованных пользователей

- Отложенная(линивая) загрузка страниц

- Динамическая подгрузка списков категорий

- Отлавливание ошибок в run time(Error Boundary)

- Страница 404 для несуществующих роутов

## Установка и запуск

Клонируйте репозиторий:

```bash
git clone https://github.com/progeat/rick-and-morty-explorer.git
```

Перейдите в директорию проекта:

```bash
cd rick-and-morty-explorer
```

Установите зависимости:

```bash
npm install
```

Настройте файл окружения:

Для этого переименуйте файл .env.example в .env

Запустите JSON-Server в отдельном терминале:

```bash
json-server --watch db.json
```

Сервер будет доступен по адресу: http://localhost:3000

Запустите приложение:

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:5173

## Используемые технологии

- React 18

- React Router

- ContextAPI

- React Lazy

- Intersaction Observer API (Infinity Scroll)

- JSON Server

- CSS Modules для стилизации

- Vite

## Источники данных

Приложение использует JSON-Server c файлом базы для пользователей:

- _db.json_

Для категорий URL адреса:

- [Герои](https://rickandmortyapi.com/api/character)
- [Локации](https://rickandmortyapi.com/api/location)
- [Эпизоды](https://rickandmortyapi.com/api/episode)

## Функциональность

- Главная страница с приветствием

- Навигационная панель, доступная на всех страницах

- Страницы категорий с динамической подгрузкой списков элементов

- Детальные страницы с полной информацией

- Сортировка по дате создания (возрастание/убывание)

- Страницы авторизации и регистрации

- Приватные страницы для авторизованных пользователей

- Страница 404 для несуществующих маршрутов

## Лицензия

Этот проект лицензирован по лицензии MIT
