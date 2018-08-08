import { browser, by, element } from 'protractor';
import { DetalhamentoHistoricoCalculoPage } from './detalhamento-historico-calculo.po';

export class HistoricoCalculoPage {
    getDataTable() {
        return element(by.id('calculosTable'));
    }

    expectRow(index: number, values: string[]): void {
        const row = this.getDataTable().all(by.tagName('tr')).get(index);
        const cells = row.all(by.tagName('td'));

        const cellsValues = cells.map(function (elm) {
            return elm.getText();
        });

        expect(cellsValues).toEqual(values);
    }

    clickDetalhes(index: number) {
        this.getDataTable().all(by.css('tbody tr td a')).get(index).click();
        return new DetalhamentoHistoricoCalculoPage();
    }
}
