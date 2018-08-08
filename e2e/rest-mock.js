module.exports = () => {
    return {
        ajustamentos: {
            recordsTotal: 2,
            data: [
                {
                    id: 123,
                    nome: "teste.xlsx",
                    dataCriacao: "02/12/2017",
                    numeroApolice: 155,
                    codigoCorretor: 400,
                    registros: [],
                    nomeUsuario: 'Joãozinho',
                    numeroSPE: '003126841684004654',
                    status: 'I'
                },
                {
                    id: 124,
                    nome: "teste.xlsx",
                    dataCriacao: "02/12/2017",
                    numeroApolice: 155,
                    codigoCorretor: 400,
                    registros: [],
                    nomeUsuario: 'Zézinho',
                    numeroSPE: '155687654198719809',
                    status: 'V'
                }
            ]
        },

        registros: {
            recordsTotal: 2,
            data: [
                {
                    "id": 13062,
                    "tipoEndosso": "300.01",
                    "item": 1,
                    "motivo": 3,
                    "formaCalculo": 1,
                    "vigenciaInicial": "2017-01-20T02:00:00.000+0000",
                    "vigenciaFinal": "2018-01-20T02:00:00.000+0000",
                    "placa": "ABC1234",
                    "chassi": "192318BH3H12389",
                    "status": "NV",
                    "ignorado": true,
                    "criticas": []
                },
                {
                    "id": 12345,
                    "tipoEndosso": "300.02",
                    "item": 2,
                    "motivo": 3,
                    "formaCalculo": 2,
                    "vigenciaInicial": "2017-08-12T02:00:00.000+0000",
                    "vigenciaFinal": "2018-08-12T02:00:00.000+0000",
                    "placa": "ABC4321",
                    "chassi": "15484DFEF1548ER",
                    "status": "NV",
                    "ignorado": false,
                    "criticas": ["Crítica 1", "Crítica 2", "Critica 3"]
                }
            ]
        },

        calculos: {
            recordsTotal: 2,
            data: [
                { id: 1, dataCalculo: '23/03/2018', valorCalculado: 358.12, nomeUsuario: 'Joãozinho', numeroSPE: '003126841684004654', possuiAcordoOperacional: true },
                { id: 2, dataCalculo: '22/03/2018', valorCalculado: 415.29, nomeUsuario: 'Zézinho', numeroSPE: '003126841684004654', possuiAcordoOperacional: false }
            ]
        },

        itens: {
            recordsTotal: 2,
            data: [
                { item: 1, placa: 'ABC1234', chassi: '15484DFEF1548ER', formaCalculo: 1, valorCalculado: 351.47, ignorado: true },
                { item: 2, placa: 'ABC4321', chassi: '5984598ASDBE455', formaCalculo: 2, valorCalculado: 351.47, ignorado: false }
            ]
        },

        atualizar: {},
        validar: {},
        ignorar: {},
        manual: {},

        itensApolice: {
            recordsTotal: 1,
            data: [
                { id: 101, item: 1, placa: "ABC1011", chassi: "192318BH3H1238", formaCalculo: 2, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 102, item: 2, placa: "ABC1022", chassi: "192318BH3H1238", formaCalculo: 1, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 103, item: 3, placa: "ABC1033", chassi: "192318BH3H1238", formaCalculo: 2, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 104, item: 4, placa: "ABC1044", chassi: "192318BH3H1238", formaCalculo: 2, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 105, item: 5, placa: "ABC1055", chassi: "192318BH3H1238", formaCalculo: 1, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 106, item: 6, placa: "ABC1066", chassi: "192318BH3H1238", formaCalculo: 2, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 107, item: 7, placa: "ABC1077", chassi: "192318BH3H1238", formaCalculo: 1, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 108, item: 8, placa: "ABC1088", chassi: "192318BH3H1238", formaCalculo: 2, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 109, item: 9, placa: "ABC1099", chassi: "192318BH3H1238", formaCalculo: 2, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false },
                { id: 110, item: 10, placa: "ABC1101", chassi: "192318BH3H1238", formaCalculo: 1, vigenciaInicial: "2017-08-12T02:00:00.000+0000", vigenciaFinal: "2018-08-12T02:00:00.000+0000", selecionado: false }
            ]
        },

        calculo: {
            quantidadeIncluidos: 0,
            quantidadeIgnorados: 0,
            quantidadeAlterados: 0,
            quantidadeCalculados: 2,
            quantidadeExcluidos: 2,
            valorCalculado: 358.12,
            possuiAcordoOperacional: false
        },

        session: {
            usuario: 'Zézinho Alves',
            spe: '556876548719809',
            apolice: '5587'
        },

        processos: {
            status: 'F'
        }
    };
}
