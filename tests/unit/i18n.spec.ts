import i18n from "@/components/I18n";

describe("functions", () => {
  test("default local is en", () => {
    expect(i18n.locale).toBe("en");
  })

  test('i18n.t()', () => {
    i18n.locale = "en";
    expect(i18n.t("test.hello")).toBe("hello world");
    i18n.locale = "ja";
    expect(i18n.t("test.hello")).toBe("こんにちは、世界");
  })

  test("i18n.t() throw error", () => {
    i18n.locale = "en";
    expect(() => i18n.t("test.hello.any")).toThrow(new Error("i18n.t() key 'test.hello.any' at 'any' is not found!.\n  local: en"));
    expect(() => i18n.t("test")).toThrow(new Error("i18n.t() key 'test' is not found!\n  local: en"));
    expect(() => i18n.t("")).toThrow(new Error("i18n.t() key '' is not found!\n  local: en"));
    expect(() => i18n.t("test.")).toThrow(new Error("i18n.t() key 'test.' is not found!\n  local: en"));
  })

  test('i18n.t() use format', () => {
    i18n.locale = "en";
    expect(i18n.t("test.format")).toBe("Hi, {name}!");
    expect(i18n.t("test.format", {name: "Nick"})).toBe("Hi, Nick!");
    expect(i18n.t("test.format", {name: "Nick"})).toBe("Hi, Nick!");
    expect(() => i18n.t("test.format", {foo: "Nick"})).toThrow(new Error("i18n.t() unknown format 'foo'\n  local: en"));
    i18n.locale = "ja";
    expect(i18n.t("test.format", {name: "ニック"})).toBe("こんにちは！ニック！");
  })

  test('i18n.t() use multiline', () => {
    i18n.locale = "en";
    expect(i18n.t("test.multiline")).toBe("multiline with array\nline: {one}\nline: {two}");
    expect(i18n.t("test.multiline", {one: "1", two: "2"})).toBe("multiline with array\nline: 1\nline: 2");
    i18n.locale = "ja";
    expect(i18n.t("test.multiline", {one: "1", two: "2"})).toBe("配列を使うと複数行の文字を表示できます\n1行目\n2行目");
  })
})
