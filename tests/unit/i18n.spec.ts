import i18n from "@/components/I18n";

describe("functions", () => {
  test("default local is en", () => {
    expect(i18n.locale).toBe("en");
  })

  test('i18n.t()', () => {
    i18n.locale = "en";
    expect(i18n.t("message.hello")).toBe("hello world");
    i18n.locale = "ja";
    expect(i18n.t("message.hello")).toBe("こんにちは、世界");
  })

  test("i18n.t() throw error", () => {
    i18n.locale = "en";
    expect(() => i18n.t("message.hello.any")).toThrow(new Error("i18n.t() key 'message.hello.any' at 'any' is not found!.\n  local: en"));
    expect(() => i18n.t("message")).toThrow(new Error("i18n.t() key 'message' is not found!\n  local: en"));
    expect(() => i18n.t("")).toThrow(new Error("i18n.t() key '' is not found!\n  local: en"));
    expect(() => i18n.t("message.")).toThrow(new Error("i18n.t() key 'message.' is not found!\n  local: en"));
  })
})
