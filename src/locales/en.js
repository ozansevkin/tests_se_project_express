export default {
  translation: {
    structure: "The {{ type }} `{{ name }}` is not found.",
    dependency: {
      required: "Add `{{ name }}` to `{{ type }}` in the package.json file.",
    },
    packageSettings:
      "The `{{ name }}` field is not filled in the package.json file.",
    eslint:
      "Run the command `npx eslint .` and fix the errors in the code: {{- errors }}",
    eslintrc: {
      extends:
        'Add `extends: "{{ name }}"` in the .eslintrc.js or .eslintrc.json file.',
      rules:
        'Add rule `{{ name }}: "{{- value }}"` in the .eslintrc.js or .eslintrc.json file.',
    },
  },
};
