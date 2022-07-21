// Vue3 にアップデートしたが、Composition AIP を反映させるのが面倒なので、
// とりあえず、多言語対応のみの簡単な i18n を作成

type JSONType = {
  [key: string]: JSONType | string
}

const en: JSONType = require("./../locales/en.json")
const ja: JSONType = require("./../locales/ja.json")

const messages = {
  en: en,
  ja: ja
}

const locales = ["en", "ja"] as const;
type AllowedLocales = typeof locales[number];

class I18n {
  static locale: AllowedLocales = "en";

  static isAllowedLocale(local: string): local is AllowedLocales {
    return (local === "en" || local === "ja");
  }

  static setLocale(locale: string) {
    if (this.isAllowedLocale(locale)) {
      this.locale = locale;
    } else {
      throw new Error(`don't know locale '${locale}'`)
    }
  }

  // example t("message.hello")
  static t(key: string) {
    if (this.locale in messages) {
      const message = messages[this.locale];
      const list = key.split(".").filter(s => s !== "");
      let search = message;
      for (let i = 0; i < list.length; i++) {
        const a = search[list[i]];
        if (typeof a === "string") {
          if (i < list.length - 1) {
            // console.warn(`i18n.t() key '${key}' at '${list[i+1]}' is not found!.\n  local: ${this.locale}`);
            throw new Error(`i18n.t() key '${key}' at '${list[i+1]}' is not found!.\n  local: ${this.locale}`);
          }
          return a; // ok
        } else {
          search = a;
        }
      }
      throw new Error(`i18n.t() key '${key}' is not found!\n  local: ${this.locale}`);
    } else {
      throw new Error(`i18n.t() local '${this.locale}' is not found!`);
    }
  }
}

export default I18n;
