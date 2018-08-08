import { browser, by, element } from 'protractor';

export class DetalhamentoHistoricoCalculoPage {
    getDataTable() {
        return element(by.id('detalhamentoHistoricoCalculosTable'));
    }

    expectRow(index: number, values: string[]): any {
        const row = this.getDataTable().all(by.tagName('tr')).get(index);
        const cells = row.all(by.tagName('td'));

        const cellsValues = cells.map(function (elm) {
            return elm.getText();
        });

        expect(cellsValues).toEqual(values);
    }
}
