import { FileDataTablePage } from './page-objects/file-data-table.po';
import { browser, by, element, protractor } from 'protractor';
import { RegistrosDataTablePage } from './page-objects/registros-data-table.po';
import { ModalEditPage } from './page-objects/modal-edit.po';
import { HistoricoCalculoPage } from './page-objects/historico-calculo.po';
import { DetalhamentoHistoricoCalculoPage } from './page-objects/detalhamento-historico-calculo.po';

describe('cordapp-demo-fronend App', () => {
  let fileDataTablePage: FileDataTablePage;
  let registrosDataTablePage: RegistrosDataTablePage;
  let modalEditPage: ModalEditPage;
  let historicoCalculoPage: HistoricoCalculoPage;
  let detalhamentoHistoricoCalculoPage: DetalhamentoHistoricoCalculoPage;

  beforeEach(() => {
    fileDataTablePage = new FileDataTablePage();
  });

  it('deve mostrar a página com o componente criado', () => {
    fileDataTablePage.navigateTo();
    fileDataTablePage.expectRowCount(2);

    const path = require('path');
    const absolutePath = path.resolve(__dirname, 'arquivo.xlsx');

    fileDataTablePage.getFileInput().sendKeys(absolutePath);
    fileDataTablePage.getBtnEnviar().click();
    fileDataTablePage.expectRowCount(3);

    registrosDataTablePage = fileDataTablePage.clickDetalhes(1);
    registrosDataTablePage.expectRow(1, [
      '', '300.01', '1', 'Inclusão', 'Anual', '20/1/2017', '20/1/2018', 'ABC1234', '192318BH3H123891H8213H821312H89', 'NAO_VALIDADO', ''
    ]);

    modalEditPage = registrosDataTablePage.clickEditar(0);
    modalEditPage.clickCancelar();
    registrosDataTablePage.expectRow(1, [
      '', '300.01', '1', 'Inclusão', 'Anual', '20/1/2017', '20/1/2018', 'ABC1234', '192318BH3H123891H8213H821312H89', 'NAO_VALIDADO', ''
    ]);

    modalEditPage = registrosDataTablePage.clickEditar(0);
    modalEditPage.typePlaca('ABC6666');
    modalEditPage.clickSalvar();
    registrosDataTablePage.expectRow(1, [
      '', '300.01', '1', 'Inclusão', 'Anual', '20/1/2017', '20/1/2018', 'ABC6666', '192318BH3H123891H8213H821312H89', 'NAO_VALIDADO', ''
    ]);

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.and(EC.invisibilityOf(modalEditPage.getHeaderModalSalvaRegistro()),
      EC.elementToBeClickable(registrosDataTablePage.getBtnHistoricoCalculo())), 5000);

    historicoCalculoPage = registrosDataTablePage.clickHistoricoDeCalculos();
    historicoCalculoPage.expectRow(1, ['003126841684004654', 'R$ 358,12', 'Joãozinho', '23/03/2018', '']);
    historicoCalculoPage.expectRow(2, ['003126841684004654', 'R$ 415,29', 'Zézinho', '22/03/2018', '']);

    detalhamentoHistoricoCalculoPage = historicoCalculoPage.clickDetalhes(0);
    detalhamentoHistoricoCalculoPage.expectRow(1, ['1', 'ABC1234', 'Anual', 'R$ 351,47']);
    detalhamentoHistoricoCalculoPage.expectRow(2, ['2', 'ABC4321', 'Pró-rata', 'R$ 351,47']);
  });
});
