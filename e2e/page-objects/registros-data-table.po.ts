import { browser, by, element } from 'protractor';
import { ModalEditPage } from './modal-edit.po';
import { HistoricoCalculoPage } from './historico-calculo.po';

export class RegistrosDataTablePage {
    getDataTable() {
        return element(by.id('registrosTable'));
    }

    expectRowCount(rowCount): void {
        expect(this.getDataTable().all(by.css('tbody tr')).count()).toEqual(rowCount);
    }

    clickEditar(index: number): ModalEditPage {
        this.getDataTable().all(by.css('tbody tr td modal-edit button')).get(index).click();
        return new ModalEditPage();
    }

    expectRow(index: number, values: string[]): void {
        const row = this.getDataTable().all(by.tagName('tr')).get(index);
        const cells = row.all(by.tagName('td'));

        const cellsValues = cells.map(function (elm) {
            return elm.getText();
        });

        expect(cellsValues).toEqual(values);
    }

    getBtnHistoricoCalculo() {
        return element(by.id('btnHistoricoCalculo'));
    }

    clickHistoricoDeCalculos(): HistoricoCalculoPage {
        this.getBtnHistoricoCalculo().click();
        return new HistoricoCalculoPage();
    }
}
