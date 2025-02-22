/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
module.exports = {
  experimentalTernaries: true,
  bracketSameLine: false,
  singleQuote: false,
  trailingComma: "all",
  semi: false,
  quoteProps: "consistent",
  printWidth: 120,
  plugins: ["@trivago/prettier-plugin-sort-imports"], // ACHTUNG! эта штука умеет удалять куски кода когда этого делать не надо => перезагрузи редактор и попробуй еще раз
  importOrder: [
    "^react$",
    "^react-router$",
    "^@tanstack/(.*)$",
    "^@/features/(.*)$",
    "^@/shared/theme/(.*)$",
    "^@/shared/ui/(.*)$",
    "^@radix-ui/(.*)$",
    "^react-i18next$",
    "^lucide-react$",
    "<THIRD_PARTY_MODULES>",
    "^[./]",
    ".*",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
