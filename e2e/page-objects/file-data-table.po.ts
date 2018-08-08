import { browser, by, element } from 'protractor';
import { RegistrosDataTablePage } from './registros-data-table.po';

export class FileDataTablePage {
    navigateTo() {
        return browser.get('/');
    }

    getFileInput() {
        return element(by.id('fileInput'));
    }

    getDataTable() {
        return element(by.id('arquivosTable'));
    }

    getBtnEnviar() {
        return element(by.id('btnEnviar'));
    }

    expectRowCount(rowCount) {
        expect(this.getDataTable().all(by.css('tbody tr')).count()).toEqual(rowCount);
    }

    clickDetalhes(index: number) {
        this.getDataTable().all(by.css('tbody tr td a')).get(index).click();
        return new RegistrosDataTablePage();
    }
}
