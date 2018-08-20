// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrlChannel1: 'http://localhost:10010/api',
  apiUrlChannel2: 'http://localhost:10013/api',
  apiUrlInsurer: 'http://localhost:10015/api',
  languages: ['en-US', 'pt-BR'],
  language: 'pt-BR'
};

