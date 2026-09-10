import type { Locale } from '~/consts';

export interface SkillGroup {
  title: string;

  index: string;
  items: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;

  url?: string;
  location?: string;
  bullets: string[];
  stack?: string[];
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;

  file: string;
}

export interface Project {
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  repo?: string;
  live?: string;

  status?: string;

  featured?: boolean;

  compact?: boolean;
}

export interface Fact {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  role: string;

  tagline: string;

  about: string[];
  facts: Fact[];
  skills: SkillGroup[];
  learning: string[];
  experience: TimelineEntry[];
  education: TimelineEntry[];
  certificates: Certificate[];
  projects: Project[];
}

const en: Profile = {
  name: 'Yehor Holotov',
  role: 'Backend Developer',
  tagline: 'Typed, tested APIs on NestJS - and a serious interest in application security.',

  about: [
    'Junior backend developer. I work with NestJS and TypeScript. My university background is in computer systems, networks and operating systems, so networks and protocols, the operating system and the runtime underneath an application are things I understand rather than treat as a black box.',
    'Security is the part I keep going deeper into: how applications get broken, the classes of attack behind it and the threat models they come from. Alongside junior backend roles I am open to security work of any kind - AppSec, pentesting, SOC or an adjacent role. Where I am short of what a specific position needs, I am ready to close the gap quickly: I learn fast and I put a lot of hours into it.',
    'I care about clean architecture and code that is easy to read, test and change. I aim to keep business logic independent of frameworks and infrastructure, with clear responsibilities and explicit dependencies. I use SOLID principles and design patterns where they solve a concrete problem, keeping the design as simple as the task allows.',
  ],

  facts: [
    { label: 'Focus', value: 'NestJS / TypeScript' },
    { label: 'Also written', value: 'C# / ASP.NET Core' },
    {
      label: 'Open to',
      value: 'Backend · AppSec · Pentest · SOC · any adjacent security role',
    },
    { label: 'Format', value: 'Remote' },
    { label: 'Languages', value: 'English — B2 · Ukrainian and Russian — native' },
    { label: 'Security', value: 'Web app security, OWASP' },
  ],

  skills: [
    {
      index: '01',
      title: 'Backend',
      items: [
        'NestJS - modules, DI, guards, interceptors, pipes, exception filters',
        'Node.js',
        'Asynchrony - event loop, promises, async/await, concurrency',
        'C# and ASP.NET Core Web API',
        'REST API design - controllers, services, DTOs, repositories',
        'Backend architecture - Clean Architecture, DDD, Onion, layer separation',
        'CRUD operations and API endpoints',
        'SOLID principles',
        'Algorithms and data structures',
      ],
    },
    {
      index: '02',
      title: 'Security & AppSec',
      items: [
        'Authentication, authorisation, identification',
        'JWT authentication and authorisation',
        'Access control vulnerabilities - IDOR, privilege escalation',
        'Authentication vulnerabilities',
        'SQL injection and XSS - exploitation and prevention',
        'Other attack classes - CSRF, SSRF, path traversal, brute force, MITM',
        'Malware types - viruses, worms, trojans, ransomware, rootkits',
        'Threat models and attacker motivation',
      ],
    },
    {
      index: '03',
      title: 'Data',
      items: [
        'PostgreSQL, SQL Server',
        'Entity Framework Core',
        'SQL - joins, transactions, migrations',
        'Redis basics',
      ],
    },
    {
      index: '04',
      title: 'Testing',
      items: ['Unit testing', 'Integration testing', 'End-to-end testing', 'Mocks and fixtures'],
    },
    {
      index: '05',
      title: 'Languages',
      items: [
        'TypeScript',
        'JavaScript',
        'C#',
        'C, C++ - systems programming basics',
        'Python (scripting)',
        'SQL',
      ],
    },
    {
      index: '06',
      title: 'Systems & networks',
      items: [
        'OSI and TCP/IP models',
        'TCP and UDP - handshake, ports, sockets',
        'HTTP, HTTPS, DNS, DHCP',
        'TLS/SSL',
        'Linux and Windows',
        'Operating systems - processes, threads, memory, scheduling',
        'Client-server architecture, computer systems',
      ],
    },
    {
      index: '07',
      title: 'Tooling',
      items: [
        'Git and GitHub - branching, rebase, conflict resolution, code review',
        'Docker containerisation basics',
        'AI-assisted development - Claude Code, Codex, MCP, subagents',
      ],
    },
  ],

  learning: [
    'OWASP Top 10 hands-on - Burp Suite, PortSwigger labs',
    'TypeScript in depth - conditional and mapped types, inference, type-level guarantees',
    'Redis in depth - data structures, eviction policies, pub/sub, distributed locks',
  ],

  experience: [
    {
      period: '2026 · 2 months',
      title: 'Fullstack Developer Intern',
      org: 'educaris.pro',
      url: 'https://educaris.pro/',
      location: 'Remote',
      bullets: [
        'Implemented a role-based access control (RBAC) system',
        'Built backend applications with NestJS and TypeScript',
        'Created REST APIs with controllers, services and DTOs',
        'Worked with PostgreSQL through TypeORM',
        'Implemented CRUD operations and API endpoints',
        'Used GitHub for version control',
        'Deepened my understanding of HTTP, REST, client-server architecture and database interaction',
      ],
      stack: ['NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL'],
    },
  ],

  education: [
    {
      period: 'Sep 2024 - Jun 2028',
      title: "Software Developer - Bachelor's degree",
      org: 'Odesa Technological University "STEP"',
      url: 'https://otu.edu.ua/',
      bullets: ['In progress - expected graduation June 2028.'],
    },
  ],

  certificates: [
    {
      name: 'IT Essentials 7',
      issuer: 'Cisco Networking Academy · Computer Academy STEP',
      date: 'Dec 2024',
      file: '/IT_Essentials_certificate.pdf',
    },
  ],

  projects: [
    {
      name: 'BuildVerdict',
      tagline: 'A forum for adventurous Dota 2 builds - vote, argue, publish.',
      description:
        'A forum for item builds in Dota 2, the MOBA game: not the most efficient purchase order, but the weird and risky sets that are worth arguing about. You get a random hero with a random build, look at the items and the 3D model, and give a verdict - like, situational or dislike. Voting needs no account; commenting and publishing do. Most of my time went into the auth layer - refresh-token families in Redis with reuse detection - and into serving anonymous and authenticated callers from the same endpoints without duplicating them.',
      stack: [
        'NestJS',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'Redis',
        'React 19',
        'three.js',
        'Docker',
      ],
      highlights: [
        'JWT access and refresh tokens with rotation: refresh secrets are hashed in Redis and grouped into families, and a reused token revokes the whole family',
        'Access control through composable guards - JWT, optional JWT for anonymous votes, roles, email-verified, not-muted',
        'Argon2 password hashing, per-endpoint rate limits and Cloudflare Turnstile on the auth forms',
        'Email verification and password reset over one-time tokens, with mailpit as the local mailbox',
        'Moderation built into the feed - hide a comment, mute an author for a period - instead of a separate admin panel',
        'Jest unit tests over the auth, token, builds, votes and mute services',
        'Frontend: React 19 server components on vinext/Vite, three.js hero models and GSAP animations, deployed to Cloudflare Workers',
      ],
      repo: 'https://github.com/shpvk/avanturist',
      status: 'In progress',
      featured: true,
    },
    {
      name: 'ChepuPizza - backend',
      tagline: 'REST API for a pizzeria with a custom pizza builder.',
      description:
        'A university team project. I worked on the backend: an ASP.NET Core Web API over Supabase PostgreSQL, split into three layers - API, business logic, data access - with dependency injection throughout.',
      stack: ['C#', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Supabase', 'JWT', 'Swagger'],
      highlights: [
        'JWT authentication with register and login endpoints',
        'Modules split by resource: Auth, Ingredients, Orders, Pizzas, Pizza Builder',
        'Pizza builder that prices a custom pizza without persisting it',
        'Supabase Storage for ingredient images, Swagger for the API contract',
      ],
      repo: 'https://github.com/shpvk/chepupizza/tree/main/backend',
    },
    {
      name: 'ESP32 Snake',
      tagline: 'Snake running on a microcontroller.',
      description:
        'A university project, and a break from web work: C++ on a bare ESP32, plus a Wokwi simulation so it can be played in a browser without the hardware.',
      stack: ['C++', 'ESP32'],
      highlights: [],
      repo: 'https://github.com/shpvk/esp32_snake_game',
      compact: true,
    },
    {
      name: 'Calories AI',
      tagline: 'Telegram bot for tracking calories and macros.',
      description:
        'A Python nutrition diary that turns free-text meal descriptions into calorie and macro estimates using the OpenAI API. Entries are saved only after user confirmation.',
      stack: ['Python', 'Aiogram 3', 'OpenAI API', 'SQLAlchemy', 'PostgreSQL', 'Alembic'],
      highlights: [
        'Draft review with options to save, edit or cancel',
        'Daily nutrition goals set manually or calculated from user parameters',
        'Daily, 7-day and 30-day summaries; editing and deleting the latest entry',
      ],
      repo: 'https://github.com/shpvk/Calories-AI',
    },
  ],
};

const uk: Profile = {
  name: 'Єгор Голотов',
  role: 'Backend-розробник',
  tagline: 'Типізовані, протестовані API на NestJS - і серйозний інтерес до безпеки застосунків.',

  about: [
    'Junior backend-розробник. Працюю з NestJS і TypeScript. Університетська база - комп’ютерні системи, мережі та операційні системи, тому мережі та протоколи, операційна система і середовище виконання під застосунком для мене не чорна скринька, а речі, які я розумію зсередини.',
    'Безпека - те, у що я закопуюсь найглибше: як застосунки ламають, які класи атак за цим стоять і з яких моделей загроз вони виростають. Паралельно з junior backend-позиціями відкритий до будь-якої роботи в безпеці - AppSec, пентест, SOC або суміжна роль. Якщо для конкретної позиції чогось не вистачає, готовий швидко це добрати: вчусь швидко і багато.',
    'Мені важливі чиста архітектура та код, який легко читати, тестувати й змінювати. Прагну відокремлювати бізнес-логіку від фреймворків та інфраструктури, чітко розділяти відповідальність і робити залежності явними. Застосовую принципи SOLID і патерни проєктування там, де вони розв’язують конкретну проблему, зберігаючи рішення настільки простим, наскільки дозволяє задача.',
  ],

  facts: [
    { label: 'Основне', value: 'NestJS / TypeScript' },
    { label: 'Також писав', value: 'C# / ASP.NET Core' },
    {
      label: 'Відкритий до',
      value: 'Backend · AppSec · Pentest · SOC · будь-яка суміжна роль у безпеці',
    },
    { label: 'Формат', value: 'Віддалено' },
    { label: 'Мови', value: 'Англійська — B2 · Українська та російська — рідні' },
    { label: 'Безпека', value: 'Web-безпека, OWASP' },
  ],

  skills: [
    {
      index: '01',
      title: 'Backend',
      items: [
        'NestJS - модулі, DI, guards, interceptors, pipes, exception filters',
        'Node.js',
        'Асинхронність - event loop, promises, async/await, конкурентність',
        'C# та ASP.NET Core Web API',
        'Розробка REST API - контролери, сервіси, DTO, репозиторії',
        'Побудова backend-архітектури - чиста архітектура, DDD, Onion, розділення шарів',
        'CRUD-операції та API endpoints',
        'Принципи SOLID',
        'Алгоритми та структури даних',
      ],
    },
    {
      index: '02',
      title: 'Безпека та AppSec',
      items: [
        'Аутентифікація, авторизація, ідентифікація',
        'JWT-аутентифікація та авторизація',
        'Access control vulnerabilities - IDOR, підвищення прав',
        'Authentication vulnerabilities',
        'SQL-ін’єкції та XSS - експлуатація і захист',
        'Інші класи атак - CSRF, SSRF, path traversal, brute force, MITM',
        'Типи шкідливого ПЗ - віруси, черви, трояни, ransomware, рутківти',
        'Моделі загроз і мотивація атакувальника',
      ],
    },
    {
      index: '03',
      title: 'Дані',
      items: [
        'PostgreSQL, SQL Server',
        'Entity Framework Core',
        'SQL - join-и, транзакції, міграції',
        'Основи Redis',
      ],
    },
    {
      index: '04',
      title: 'Тестування',
      items: ['Unit-тести', 'Інтеграційні тести', 'E2E-тести', 'Моки та фікстури'],
    },
    {
      index: '05',
      title: 'Мови',
      items: [
        'TypeScript',
        'JavaScript',
        'C#',
        'C, C++ - основи системного програмування',
        'Python (скриптинг)',
        'SQL',
      ],
    },
    {
      index: '06',
      title: 'Системи та мережі',
      items: [
        'Моделі OSI та TCP/IP',
        'TCP і UDP - рукостискання, порти, сокети',
        'HTTP, HTTPS, DNS, DHCP',
        'TLS/SSL',
        'Linux та Windows',
        'Операційні системи - процеси, потоки, пам’ять, планування',
        'Клієнт-серверна архітектура, комп’ютерні системи',
      ],
    },
    {
      index: '07',
      title: 'Інструменти',
      items: [
        'Git та GitHub - гілкування, rebase, розв’язання конфліктів, код-рев’ю',
        'Основи Docker-контейнеризації',
        'Розробка з AI-інструментами - Claude Code, Codex, MCP, субагенти',
      ],
    },
  ],

  learning: [
    'OWASP Top 10 на практиці - Burp Suite, PortSwigger labs',
    'TypeScript глибше - conditional і mapped types, виведення типів, типобезпека',
    'Redis глибше - структури даних, політики витіснення, pub/sub, розподілені блокування',
  ],

  experience: [
    {
      period: '2026 · 2 місяці',
      title: 'Стажер фулстек-розробник',
      org: 'educaris.pro',
      url: 'https://educaris.pro/',
      location: 'Віддалено',
      bullets: [
        'Реалізував систему контролю доступу на основі ролей (RBAC)',
        'Розробляв backend-застосунки з NestJS і TypeScript',
        'Створював REST API з контролерами, сервісами та DTO',
        'Працював із PostgreSQL через TypeORM',
        'Реалізовував CRUD-операції та API endpoints',
        'Використовував GitHub для контролю версій',
        'Покращив розуміння HTTP, REST, клієнт-серверної архітектури та взаємодії з базами даних',
      ],
      stack: ['NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL'],
    },
  ],

  education: [
    {
      period: 'вер. 2024 - чер. 2028',
      title: 'Розробник програмного забезпечення - бакалавр',
      org: 'Одеський технологічний університет «ШАГ»',
      url: 'https://otu.edu.ua/',
      bullets: ['Навчаюсь, очікуваний випуск - червень 2028.'],
    },
  ],

  certificates: [
    {
      name: 'IT Essentials 7',
      issuer: 'Cisco Networking Academy · Комп’ютерна академія «ШАГ»',
      date: 'груд. 2024',
      file: '/IT_Essentials_certificate.pdf',
    },
  ],

  projects: [
    {
      name: 'BuildVerdict',
      tagline: 'Форум авантюрних білдів у Dota 2 - оцінюй, сперечайся, публікуй.',
      description:
        'Форум збірок предметів у Dota 2, MOBA-грі: не найефективніший закуп, а дивні й ризиковані набори, про які варто посперечатися. Ти отримуєш випадкового героя з випадковим білдом, дивишся на предмети та 3D-модель і виносиш вердикт - «подобається», «ситуативно» або «не подобається». Голосувати можна без акаунта, коментувати й публікувати - ні. Найбільше часу пішло на шар аутентифікації - сім’ї refresh-токенів у Redis із виявленням повторного використання - і на те, щоб анонімні та авторизовані запити обслуговувались одними й тими самими ендпоінтами без дублювання.',
      stack: [
        'NestJS',
        'TypeScript',
        'Prisma',
        'PostgreSQL',
        'Redis',
        'React 19',
        'three.js',
        'Docker',
      ],
      highlights: [
        'JWT access- і refresh-токени з ротацією: секрети refresh хешуються в Redis і групуються у сім’ї, а повторно використаний токен відкликає всю сім’ю',
        'Контроль доступу через композицію guard-ів - JWT, optional JWT для анонімних голосів, ролі, підтверджений email, not-muted',
        'Хешування паролів Argon2, ліміти запитів на кожен ендпоінт і Cloudflare Turnstile на формах входу та реєстрації',
        'Підтвердження email і відновлення пароля через одноразові токени, локальна пошта - mailpit',
        'Модерація вбудована у стрічку - приховати коментар, замутити автора на час - замість окремої адмінки',
        'Unit-тести на Jest для сервісів auth, token, builds, votes і mute',
        'Фронтенд: серверні компоненти React 19 на vinext/Vite, 3D-моделі героїв на three.js та анімації GSAP, деплой на Cloudflare Workers',
      ],
      repo: 'https://github.com/shpvk/avanturist',
      status: 'У розробці',
      featured: true,
    },
    {
      name: 'ChepuPizza - бекенд',
      tagline: 'REST API для піцерії з конструктором піци.',
      description:
        'Командний проєкт в університеті. Я працював над бекендом: ASP.NET Core Web API над Supabase PostgreSQL, розділений на три шари - API, бізнес-логіка, доступ до даних - з dependency injection наскрізь.',
      stack: ['C#', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Supabase', 'JWT', 'Swagger'],
      highlights: [
        'JWT-аутентифікація з ендпоінтами реєстрації та входу',
        'Модулі за ресурсами: Auth, Ingredients, Orders, Pizzas, Pizza Builder',
        'Конструктор піци, що рахує ціну кастомної піци без збереження',
        'Supabase Storage для зображень інгредієнтів, Swagger для контракту API',
      ],
      repo: 'https://github.com/shpvk/chepupizza/tree/main/backend',
    },
    {
      name: 'ESP32 Snake',
      tagline: 'Змійка на мікроконтролері.',
      description:
        'Університетський проєкт і водночас відпочинок від вебу: C++ на «голому» ESP32, плюс симуляція у Wokwi - можна пограти в браузері без плати.',
      stack: ['C++', 'ESP32'],
      highlights: [],
      repo: 'https://github.com/shpvk/esp32_snake_game',
      compact: true,
    },
    {
      name: 'Calories AI',
      tagline: 'Telegram-бот для підрахунку калорій і БЖВ.',
      description:
        'Щоденник харчування на Python: перетворює довільний текстовий опис їжі на оцінку калорій і БЖВ через OpenAI API. Записи зберігаються лише після підтвердження користувачем.',
      stack: ['Python', 'Aiogram 3', 'OpenAI API', 'SQLAlchemy', 'PostgreSQL', 'Alembic'],
      highlights: [
        'Перегляд чернетки зі збереженням, редагуванням або скасуванням',
        'Добові цілі харчування вручну або за параметрами користувача',
        'Статистика за день, 7 і 30 днів; редагування та видалення останнього запису',
      ],
      repo: 'https://github.com/shpvk/Calories-AI',
    },
  ],
};

export const profiles: Record<Locale, Profile> = { en, uk };

export function getProfile(locale: Locale): Profile {
  return profiles[locale];
}
