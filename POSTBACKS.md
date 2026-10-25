# Независимые события Game Select

## Сайт

`POST /api/track` принимает только действия сайта и отправляет их через `TELEGRAM_BOT2_TOKEN` / `TELEGRAM_BOT2_CHAT_ID`. Карточка показывает источник (метка, referrer или приложение), страну по заголовку Vercel IP GEO, просмотры, кнопки, выбранные игры и язык. Если источник скрыт браузером и меток нет, показывается Direct. Никаких регистраций или депозитов в карточке сайта нет.

Ссылки обычные, прямые, без добавленных параметров. Отправка аналитики асинхронная, переход не ждёт ответа. Встроенные браузеры показывают обычный сайт без обязательного экрана выхода в другой браузер.

## Партнёрка

`GET` или `POST /api/postback/1win` (также `/postback/partner`) принимает `type` или `event_type`: registration, first_deposit, redeposit, all_deposits, withdrawal. Существующие отдельные пути `/api/postback/1win/registration`, `/first-deposit`, `/redeposit`, `/all-deposits`, `/withdrawal` задают тип сами. Последние короткие имена здесь относятся к общей базе `/api/postback/1win`.

Авторизация: прежний `POSTBACK_SECRET` в параметре `secret` либо заголовке `x-postback-secret`. Обязателен заполненный `user_id`. Опционально: transaction_id, event_id, date, amount, currency, country, source_id, source_name, hash_id, hash_name. Значения шаблонов вида `{user_id}` не считаются заполненными. `sub1`, click ID и посещение сайта не требуются, не используются и не сохраняются.

События отправляются только через `TELEGRAM_BOT1_TOKEN` / `TELEGRAM_BOT1_CHAT_ID`. Нет пересылки другим сайтам и обращения к карточкам посетителей. All-deposits отправляется сразу без ожидания первого депозита. При одинаковом transaction_id поздний first_deposit/redeposit уточняет уже отправленное сообщение.

Повторы с transaction_id дедуплицируются по игроку и операции. Без него дедуплицируется одинаковый набор полей события; два разных депозита с полностью одинаковыми полями различить невозможно. Поэтому передача уникального ID партнёркой полезна, но не обязательна. Ошибка доставки возвращает 503 для повтора партнёркой; отдельного фонового повторителя нет. При потере ответа Telegram повтор может создать дубликат.

`test=1` явно помечает техническое событие и использует отдельные ключи, не влияя на реальные события. Тест не является регистрацией или финансовой операцией в партнёрке.

## Хранилище и проверка

Сайт и партнёрка используют разные семейства ключей (`site:*`, `partner:*`, `partner-test:*`) в существующем Redis. Учётных связей между ними нет. Общая недоступность Redis может временно затронуть оба обработчика, но прямые ссылки остаются доступны.

`npm test` проверяет независимость ботов, прямые URL, ошибки доставки, дубли, авторизацию, встроенные браузеры и существующий интерфейс/переводы. Настройки и секреты production сохранены. Секреты нельзя помещать в клиентский JS или публичный репозиторий.


## Обновление 26.10.2026 — полные названия источников

Уведомление содержит тип события, ID игрока, страну с флагом, полное название источника и сумму.
Источники взяты из assets/catalog.js: tt1 — TikTok · Brasil; tt2 — TikTok · Chile; ig1 — Instagram · falling.pickaxe1; fb1 — Matias Gonzales.
Все три прямые партнёрские ссылки получают sub2=<код>. Базовые адреса игр сохранены.
Для каждого постбэка 1win добавьте &sub2={sub2}. Существующий POSTBACK_SECRET проекта tsuku остаётся прежним.
Не используйте неподдерживаемый макрос {currency}; без валюты сумма показывается без символа валюты.
Известный источник сохраняется по user_id среди партнёрских записей для следующих депозитов. Посещения сайта для этого не используются.
Проверено: 43 автоматических теста. Реальное событие 1win → Telegram и возврат sub2 партнёркой требуют отдельной проверки.

### registration

https://falling-pickaxe-1win.vercel.app/api/postback/1win/registration?secret=YOUR_SECRET&event_id={event_id}&date={date}&user_id={user_id}&country={country}&source_name={source_name}&sub2={sub2}

### first-deposit

https://falling-pickaxe-1win.vercel.app/api/postback/1win/first-deposit?secret=YOUR_SECRET&event_id={event_id}&date={date}&user_id={user_id}&country={country}&amount={amount}&source_name={source_name}&sub2={sub2}

### redeposit

https://falling-pickaxe-1win.vercel.app/api/postback/1win/redeposit?secret=YOUR_SECRET&event_id={event_id}&date={date}&user_id={user_id}&country={country}&amount={amount}&source_name={source_name}&sub2={sub2}

### all-deposits

https://falling-pickaxe-1win.vercel.app/api/postback/1win/all-deposits?secret=YOUR_SECRET&event_id={event_id}&date={date}&user_id={user_id}&country={country}&amount={amount}&source_name={source_name}&sub2={sub2}

### withdrawal

https://falling-pickaxe-1win.vercel.app/api/postback/1win/withdrawal?secret=YOUR_SECRET&event_id={event_id}&date={date}&user_id={user_id}&country={country}&amount={amount}&source_name={source_name}&sub2={sub2}
