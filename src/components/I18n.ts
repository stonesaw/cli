// Vue3 にアップデートしたが、Composition AIP を反映させるのが面倒なので、
// とりあえず、多言語対応のみの簡単な i18n を作成

type JSONType = {
  [key: string]: JSONType | string | string[]
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

  static t(key: string, args?: Record<string, string>) {
    let temp = this._searchMessage(key);
    if (Array.isArray(temp)) { temp = temp.join("\n"); }
    for (const [key, value] of Object.entries(args || {})) {
      if (RegExp(`{${key}}`).test(temp)) {
        temp = temp.replace(`{${key}}`, value || "");
      } else {
        throw new Error(`i18n.t() unknown format '${key}'\n  local: ${this.locale}`)
      }
    }
    return temp;
  }

  static _searchMessage(key: string) {
    if (this.locale in messages) {
      const message = messages[this.locale];
      const list = key.split(".").filter(s => s !== "");
      let search = message;
      for (let i = 0; i < list.length; i++) {
        const a = search[list[i]];
        if (typeof a === "string" || Array.isArray(a)) {
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
