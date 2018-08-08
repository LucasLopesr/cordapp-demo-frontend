import { browser, by, element } from 'protractor';

export class ModalEditPage {
    clickCancelar(): void {
        element(by.id('btnCancelar')).click();
    }

    clickSalvar(): void {
        element(by.id('btnSalvar')).click();
    }

    typePlaca(value: string): void {
        const placaElement = element(by.id('placa'));
        placaElement.clear();
        placaElement.sendKeys(value);
    }

    getHeaderModalSalvaRegistro() {
        return element(by.id('headerModalSalvaRegistro'));
    }
}
