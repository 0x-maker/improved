// eslint-disable-next-line no-undef
module.exports = {
    extends: [
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'react/prop-types': 'off', // Turn off prop-types as we're using TypeScript
    },
  };