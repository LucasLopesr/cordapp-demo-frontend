// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const urlRetailer1 = '/cordapp-demo-backend/varejista1/api';
const urlRetailer2 = '/cordapp-demo-backend/varejista2/api';
const urlInsurer = '/cordapp-demo-backend/seguradora/api';

export const environment = {
  production: false,
  apiUrlRetailer1: urlRetailer1,
  apiUrlVarejista2: urlRetailer2,
  apiUrlInsurer: urlInsurer,
  languages: ['en-US', 'pt-BR'],
  language: 'pt-BR'
};
