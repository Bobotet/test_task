1) переименовать .env.example в .env

## Запуск локально

1) Ставим бд: docker-compose up mysql
2) npm i
3) Заливаем миграции: npm run migration:run
4) npm run build
4) Запускаем сервер: npm run start


## Запуск внутри докера

1) Делаем контейнер приложения и бд (нужно отключить локально, тк они используют один порт): docker-compose up

ссылка на swagger: http://localhost:3000/api/swagger#/
логи лежать в папке logs в корне
