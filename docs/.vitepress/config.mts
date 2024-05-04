import {DefaultTheme, defineConfig, LocaleConfig, UserConfig} from 'vitepress'

const languages: LocaleConfig = {
  en: {
    label: "English",
    lang: "en"
  },
  id: {
    label: "Bahasa Indonesia",
    lang: "id"
  }
};

const baseCfg: UserConfig = {
  title: "Venity Network Support",
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/VenityNetwork/support-page/edit/master/docs/:path'
    }
  }
};

const perLangCfg: any = {
  id: {
    editLink: {
      text: "Sunting halaman ini",
      pattern: "https://github.com/VenityNetwork/support-page/edit/master/docs/:path"
    },
    docFooter: {
      prev: "Sebelumnya",
      next: "Selanjutnya"
    },
    outline: {
      label: "Halaman iniz"
    },
    lastUpdated: {
      text: "Diperbarui",
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    langMenuLabel: "Ganti bahasa",
    returnToTopLabel: "Kembali ke atas",
    darkModeSwitchLabel: "Tema",
    lightModeSwitchTitle: "Ubah ke mode terang",
    darkModeSwitchTitle: "Ubah ke mode gelap",
  },
  en: {} // use defaults
}

const sidebarItems: SidebarItemWrapper[] = [
  {
    title: {
      id: "Kebijakan",
      en: "Policies"
    },
    items: [
      {
        text: {
          id: "Ketentuan Layanan",
          en: "Terms of Service"
        },
        link: "/terms-of-service"
      }
    ]
  },
  {
    title: {
      id: "Untuk Penulis",
      en: "For Writer",
    },
    items: [
      {
        text: {
          id: "Contoh Markdown",
          en: "Markdown Examples"
        },
        link: "/markdown-examples"
      },
      {
        text: {
          id: "Contoh API Runtime",
          en: "Runtime API Examples"
        },
        link: "/api-examples"
      }
    ]
  },
];

const navbarItems: NavItem[] = [
  {
    text: {
      id: "Beranda",
      en: "Home",
    },
    link: "https://www.venitymc.com"
  },
  {
    text: {
      id: "Discord",
      en: "Discord",
    },
    link: "https://discord.gg/HTPg36hRU6"
  },
  {
    text: {
      id: "Store",
      en: "Store",
    },
    link: "https://store.venitymc.com"
  }
];

interface LocaleItem<T> {
  id: T;
  en: T;
}

interface SidebarItemWrapper {
  title: LocaleItem<string>,
  items: SidebarItem[];
}

interface SidebarItem {
  text: LocaleItem<string>,
  link: string
}

interface NavItem {
  text: LocaleItem<string>,
  link: string
}

const buildConfig = () => {
  const ret = baseCfg;
  ret.locales = {};
  Object.keys(languages).forEach((langKey) => {
    const langId = languages[langKey].lang;
    ret.locales[langKey] = languages[langKey];
    ret.locales[langKey].themeConfig = perLangCfg[langKey];
    ret.locales[langKey].themeConfig.sidebar = [];
    ret.locales[langKey].themeConfig.nav = [];

    navbarItems.forEach((item) => {
      ret.locales[langKey].themeConfig.nav.push({
        text: item.text[langId],
        link: item.link,
      });
    })

    sidebarItems.forEach((item) => {
      ret.locales[langKey].themeConfig.sidebar.push({
        text: item.title[langId],
        items: item.items.map(si => {
          return {
            text: si.text[langId],
            link: langKey === "root" ? si.link : "/" + langKey + si.link
          }
        })
      });
    });
  });

  return ret;
}

export default defineConfig(buildConfig());
