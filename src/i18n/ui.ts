import type { Locale } from '~/consts';

export const ui = {
  en: {
    'meta.title': 'Backend Developer',
    'meta.description':
      'Junior backend developer - NestJS, TypeScript, PostgreSQL. Building typed, tested and secure APIs.',

    'nav.wordmark': 'Resume',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close menu',
    'nav.skipToContent': 'Skip to content',
    'nav.langLabel': 'Change language',
    'nav.themeLabel': 'Switch theme',

    'hero.greeting': "Hey, I'm",
    'hero.available': 'IT STEP University student',
    'hero.cta': 'Get in touch',

    'section.about.index': '01',
    'section.about.title': 'About',
    'section.skills.index': '02',
    'section.skills.title': 'Skills',
    'section.experience.index': '03',
    'section.experience.title': 'Experience',
    'section.projects.index': '04',
    'section.projects.title': 'Projects',
    'section.contact.index': '05',
    'section.contact.title': 'Contact',

    'skills.learning': 'Currently learning',
    'experience.education': 'Education',
    'experience.certificates': 'Certificates',
    'projects.viewCode': 'Source',
    'projects.viewLive': 'Live',
    'projects.highlights': 'Highlights',

    'contact.heading': "Let's build something",
    'contact.body':
      'Open to junior backend roles and to security work of any kind - AppSec, pentesting, SOC or an adjacent role. I read every message and reply within a day.',
    'contact.emailLabel': 'Email',
    'contact.copy': 'Copy',
    'contact.copied': 'Copied',

    '404.title': 'Page not found',
    '404.body': 'That route does not exist. The 404 handler works, at least.',
    '404.home': 'Back home',
  },

  uk: {
    'meta.title': 'Backend-розробник',
    'meta.description':
      'Junior backend-розробник - NestJS, TypeScript, PostgreSQL. Типізовані, протестовані та захищені API.',

    'nav.wordmark': 'Резюме',
    'nav.about': 'Про мене',
    'nav.skills': 'Навички',
    'nav.experience': 'Досвід',
    'nav.projects': 'Проєкти',
    'nav.contact': 'Контакти',
    'nav.menu': 'Меню',
    'nav.close': 'Закрити меню',
    'nav.skipToContent': 'Перейти до вмісту',
    'nav.langLabel': 'Змінити мову',
    'nav.themeLabel': 'Змінити тему',

    'hero.greeting': 'Привіт, я',
    'hero.available': 'Студент IT STEP University',
    'hero.cta': 'Написати мені',

    'section.about.index': '01',
    'section.about.title': 'Про мене',
    'section.skills.index': '02',
    'section.skills.title': 'Навички',
    'section.experience.index': '03',
    'section.experience.title': 'Досвід',
    'section.projects.index': '04',
    'section.projects.title': 'Проєкти',
    'section.contact.index': '05',
    'section.contact.title': 'Контакти',

    'skills.learning': 'Вивчаю зараз',
    'experience.education': 'Освіта',
    'experience.certificates': 'Сертифікати',
    'projects.viewCode': 'Код',
    'projects.viewLive': 'Демо',
    'projects.highlights': 'Ключове',

    'contact.heading': 'Давайте щось побудуємо',
    'contact.body':
      'Відкритий до позицій junior backend і до будь-якої роботи в безпеці - AppSec, пентест, SOC або суміжна роль. Читаю кожне повідомлення й відповідаю протягом дня.',
    'contact.emailLabel': 'Email',
    'contact.copy': 'Копіювати',
    'contact.copied': 'Скопійовано',

    '404.title': 'Сторінку не знайдено',
    '404.body': 'Такого маршруту немає. Принаймні обробник 404 працює.',
    '404.home': 'На головну',
  },
} as const satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];
