[![TypeScript](https://img.shields.io/badge/TypeScript-Next-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![SCSS](https://img.shields.io/badge/SCSS-Styles-orange?style=flat-square&logo=sass)](https://sass-lang.com/)
[![React](https://img.shields.io/badge/React-Library-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=flat-square&logo=ant-design)](https://ant.design/)
[![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux)](https://redux.js.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat-square&logo=redux)](https://redux-toolkit.js.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/8743b257-27fb-443c-969a-6555395e4f5c/deploy-status)](https://app.netlify.com/sites/re-tweet/deploys)
### [Visit re-tweet](https://re-tweet.netlify.app/) 🌐

### 1 уровень
- [x] Реализованы Требования к функциональности
- [x] Используются функциональные компоненты c хуками 
- [x] Есть разделение на умные и глупые компоненты
- [x] [Есть рендеринг списков](https://github.com/jesus-cyclist/re-tweet/blob/main/src/widgets/news-list/ui/news-list.tsx)
- [x] [Реализована хотя бы одна форма](https://github.com/jesus-cyclist/re-tweet/blob/main/src/features/authentication/ui/signup-form/signup-form.tsx)
- [x] Есть применение Контекст API
- [x] Есть применение предохранителя
- [x] Есть хотя бы один кастомный хук
- [x] Хотя бы несколько компонентов используют PropTypes
- [x] Поиск не должен триггерить много запросов к серверу (debounce) 
- [x] [Есть применение lazy + Suspense](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/router/app-router.tsx)
- [x] [Используем Modern Redux with Redux Toolkit](https://github.com/jesus-cyclist/re-tweet/blob/main/src/app/store.ts) 
- [x] [Используем слайсы](https://github.com/jesus-cyclist/re-tweet/blob/main/src/features/authentication/model/store.ts)
- [ ] Есть хотя бы одна кастомная мидлвара
- [x] [Используется RTK Query](https://github.com/jesus-cyclist/re-tweet/blob/main/src/shared/api/space-flight/api.ts) 
- [x] Используется Transforming Responses

### 2 уровень
- [x] Использование TypeScript
- [ ] Подключен storybook и созданы два, три сториса с knobs, которые показывают разные состояния компонента
- [x] Использование Firebase для учетных записей пользователей и их Избранного и Истории поиска
- [ ] Низкая связанность клиентского кода
- [x] Настроен CI/CD
- [x] Реализована виртуализация списков
- [x] Используются мемоизированные селекторы
- [ ] Используется нормализованная структура стейта
- [ ] Проведена оптимизация приложения
- [ ] Feature Flags
- [x] Тесты
- [ ] Связь UI и бизнес-логики построена через события.
- [ ] Project Console API
