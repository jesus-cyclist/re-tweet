[![TypeScript](https://img.shields.io/badge/TypeScript-Next-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-Styles-orange?style=flat-square&logo=sass)](https://sass-lang.com/)
[![React](https://img.shields.io/badge/React-Library-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=flat-square&logo=ant-design)](https://ant.design/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux)](https://redux.js.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/8743b257-27fb-443c-969a-6555395e4f5c/deploy-status)](https://app.netlify.com/sites/re-tweet/deploys)
### [Visit re-tweet](https://main--re-tweet.netlify.app/) 🌐

### 1 уровень
- [x] Реализованы Требования к функциональности
- [x] Используются функциональные компоненты c хуками 
- [x] Есть разделение на умные и глупые компоненты [1](https://github.com/jesus-cyclist/re-tweet/blob/main/src/enteties/news/ui/news-card/news-card.tsx) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/src/pages/main/ui/main-page.tsx)
- [x] [Есть рендеринг списков](https://github.com/jesus-cyclist/re-tweet/blob/main/src/widgets/news-list/ui/news-list/news-list.tsx)
- [x] [Реализована хотя бы одна форма](https://github.com/jesus-cyclist/re-tweet/blob/main/src/features/authentication/ui/signup-form/signup-form.tsx)
- [x] [Есть применение Контекст API](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/providers/with-theme.tsx)
- [x] [Есть применение предохранителя](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/providers/with-error-boundary.tsx)
- [x] [Есть хотя бы один кастомный хук](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/lib/hooks/use-click-outside.ts)
- [x] Хотя бы несколько компонентов используют PropTypes [1](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/UI/layout/layout.tsx) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/UI/link/link.tsx)
- [x] Поиск не должен триггерить много запросов к серверу (debounce)[1](https://github.com/jesus-cyclist/re-tweet/blob/main/src/widgets/search-list/ui/search-list/search-list.tsx) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/lib/hooks/use-debounce.ts)
- [x] [Есть применение lazy + Suspense](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/router/app-router.tsx)
- [x] [Используем Modern Redux with Redux Toolkit](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/store.ts) 
- [x] [Используем слайсы](https://github.com/jesus-cyclist/re-tweet/blob/main/src/features/authentication/model/store.ts)
- [x] [Есть хотя бы одна кастомная мидлвара](https://github.com/jesus-cyclist/re-tweet/blob/main/src/features/authentication/model/middleware.ts)
- [x] [Используется RTK Query](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/api/space-flight/api.ts) 
- [x] [Используется Transforming Responses](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/api/space-flight/api.ts) 

### 2 уровень
- [x] Использование TypeScript
- [x] Подключен storybook и созданы два, три сториса с knobs, которые показывают разные состояния компонента [1](https://github.com/jesus-cyclist/re-tweet/blob/main/src/stories/filter.stories.tsx) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/src/stories/loader.stories.tsx)
- [x] [Использование Firebase для учетных записей пользователей и их Избранного и Истории поиска](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/api/db/provider/firebase/config.ts)
- [x] [Низкая связанность клиентского кода](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/api/db/provider/provider-switcher.ts)
- [x] [Настроен CI/CD](https://github.com/jesus-cyclist/re-tweet/blob/main/.github/workflows/actions.yml)
- [x] [Реализована виртуализация списков](https://github.com/jesus-cyclist/re-tweet/blob/main/src/widgets/search-list/ui/list/list.tsx)
- [x] [Используются мемоизированные селекторы](https://github.com/jesus-cyclist/re-tweet/blob/main/src/widgets/footer/model/store.ts)
- [x] [Используется нормализованная структура стейта](https://github.com/jesus-cyclist/re-tweet/blob/main/src/widgets/footer/model/store.ts) 
  - возможно, тут не самый лучший пример работы с entityadapter - мне по сути приходят данные с FB и entityAdapter ожидает что я их предоставлю в виде сущности с полем id, поэтому я их собираю вручную, добавил также метод который отработает только при клике на карточке(только ради примера) 
- [x] Проведена оптимизация приложения
  - использование memo, useMemo, useCallback для мемоизации [1](https://github.com/jesus-cyclist/re-tweet/blob/main/src/pages/main/ui/main-page.tsx) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/src/features/header-menu/ui/header-menu/header-menu.tsx) [3](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/providers/with-theme.tsx)
  - [использование lazy подгрузки компонентов](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/router/app-router.tsx)
  - test performance на unlighthouse
- [x] Feature Flags [1](https://github.com/jesus-cyclist/re-tweet/blob/main/server/index.mjs) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/src/pages/main/api/api.ts)
- [x] Тесты [1](https://github.com/jesus-cyclist/re-tweet/blob/main/cypress/e2e/favourite-action.cy.ts) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/cypress/e2e/search-information.cy.ts) [3](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/lib/hooks/use-debounce.test.tsx) [4](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/api/space-flight/data-field-transformer.test.ts)
- [x] Связь UI и бизнес-логики построена через события. [1](https://github.com/jesus-cyclist/re-tweet/blob/main/src/features/authentication/ui/signin-form/signin-form.tsx) [2](https://github.com/jesus-cyclist/re-tweet/blob/main/src/widgets/search-list/ui/search-list/search-list.tsx)
  - SigninForm:
    - Обработчик onFinish вызывается при успешной отправке формы, что инициирует событие аутентификации пользователя.
    - Никаких прямых вызовов API или инфраструктуры в UI компонентах нет.
    - Взаимодействие с Redux через диспетчер dispatch позволяет обновлять состояние приложения после события.
  - SearchList:
    - Изменения значения поиска в поле ввода (handleSearchChange) порождают событие изменения, которое триггерит отправку запроса на сервер.
    - Запрос на сервер происходит с задержкой (debouncing), что уменьшает количество запросов и повышает производительность.
    - Загрузка следующей страницы результатов (loadNextPage) является результатом действия пользователя и не знает о последующих операциях.
- [x] [Project Console API](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/api/console/middleware.ts)


![unlighthouse](https://github.com/jesus-cyclist/re-tweet/assets/112469129/deea32de-c642-4b65-abae-946cd643aa14)
![consoleAPI](https://github.com/jesus-cyclist/re-tweet/assets/112469129/5784077d-ec0a-4402-b572-99f3f99a5f4b)

