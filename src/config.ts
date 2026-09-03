// 站点全局配置：品牌、分类中枢、导航（对标 4webwall 7 分类，精简为核心三+辅助）
export const SITE = {
  name: 'قوالب عربية',
  nameEn: 'Arab Templates',
  tagline: 'قوالب قانونية وإدارية، مقارنات تأمين، ودروس الذكاء الاصطناعي بالعربية',
  url: 'https://qawaeb.snapvil.com',
  description:
    'منصة عربية لتحميل وطباعة القوالب القانونية والإدارية، مقارنات تأمين، ودروس عملية في الذكاء الاصطناعي.',
  locale: 'ar',
  dir: 'rtl',
  email: 'hello@qawaeb-arabic.pages.dev',
};

export interface Hub {
  key: string;
  slug: string; // URL 段
  navPt: string; // 导航/入口 标题
  name: string; // 中枢标题
  desc: string;
  icon: string;
}

// 内容中枢（对标 7 分类，凝练为 3 大 hub + 辅助）
export const HUBS: Hub[] = [
  {
    key: 'legal',
    slug: 'القوالب-القانونية',
    navPt: 'قوالب قانونية',
    name: 'القوالب القانونية',
    desc: 'عقود ونماذج جاهزة للتحميل والطباعة: إيجار، عمل، وكالة، إقرار، خطابات رسمية.',
    icon: '⚖️',
  },
  {
    key: 'insurance',
    slug: 'التأمين',
    navPt: 'التأمين',
    name: 'دليل التأمين',
    desc: 'مقارنات شركات وتأمينات السيارات والصحي، وشروحات عملية لاختيار ورفع المطالبات.',
    icon: '🛡️',
  },
  {
    key: 'ai',
    slug: 'الذكاء-الاصطناعي',
    navPt: 'ذكاء اصطناعي',
    name: 'دروس الذكاء الاصطناعي',
    desc: 'شروحات عملية خطوة بخطوة لاستخدام ChatGPT وMidjourney وأدوات إنتاج المحتوى.',
    icon: '🤖',
  },
];

export const NAV = [...HUBS];

export const getHubByKey = (key: string) => HUBS.find((h) => h.key === key);
export const getHubBySlug = (slug: string) => HUBS.find((h) => h.slug === slug);

export const SOURCES = {
  disclaimer:
    'المحتوى على هذا الموقع لأغراض إعلامية وإرشادية فقط، ولا يُعدّ استشارة قانونية أو مالية أو تأمينية، ولا يشكّل تعويضاً عن رأي محامٍ أو مختص مرخّص. تحقق دائماً من الأنظمة والقوانين المطبّقة في بلدك.',
};