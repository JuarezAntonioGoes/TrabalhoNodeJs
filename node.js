var http = require('http');
var readline = require('readline');
var fs = require('fs');
var url = require('url');
let i = 0;



var server = http.createServer(function (request, response) {
    if (request.url == "/" || request.url == "/home") {

        let sorteio = new Array;
        for (j = 0; j < 6; j++) {
            sorteio[j] = Math.floor(Math.random() * (61 - 0) + 1);

        }



        fs.readFile('texto.txt', 'utf-8', function (erro) {
            if (erro) {
                fs.open('texto.txt', 'w', function (erro, file) {
                    if (erro) throw erro
                    //console.log('Arquivo criado');
                    i = 1
                });


            } else {
                i = 1
                //console.log("Arquivo localizado!");

            }
            if (i == 1) {
                fs.appendFile('texto.txt', sorteio + '\n', function (erro) {
                    if (erro) throw erro
                    //console.log('Arquivo editado');
                });
            }

            var leitor = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });


            let ArrayInformada;

            leitor.question("Informe o 6 numeros separados por ','\n", function (answer) {
                let resp = answer;
                ArrayInformada = resp.replace(/ /g, "");
                ArrayInformada = ArrayInformada.split(',');
                let numero;
                for (l = 0; l < ArrayInformada.length; l++) {
                    numero = parseInt(ArrayInformada[l]);
                    if (numero > 60) {
                        console.log('numero maior que 60');
                        leitor.close();
                    }

                }

                if (l < 6) {
                    console.log('Foram informados menos de seis numeros.');
                    leitor.close();
                }

                console.log("\nSua resposta foi '" + ArrayInformada + "'");
                //leitor.close();



                let acertou = 0;

                var linhaTexto;
                let colunaTexto;
                var contAcertos = 0;

                fs.readFile('texto.txt', 'utf-8', function (erro, dados) {
                    if (erro) throw erro;


                    linhaTexto = dados.split(/\r?\n/);
                    linhaTexto.forEach(item => {
                        colunaTexto = item.split(',');
                        colunaTexto.forEach(item2 => {
                            //ArrayInformada = ArrayInformada.split(',');
                            ArrayInformada.forEach((item3) => {
                                //console.log(item3 + ' == ' + item2);
                                //console.log(item2 + '==' + item3);
                                if (item2 == item3) {
                                    contAcertos = contAcertos + 1;
                                    // console.log('acertou ' + contAcertos);
                                }
                            })

                        })

                        if (contAcertos == 6) {
                            acertou = 1;
                        }

                        contAcertos = 0;
                    })


                });







                var data = new Date;
                
                var dia = data.getDate();
                var mes = data.getMonth();
                var ano4 = data.getFullYear();
                var hora = data.getHours();
                var min = data.getMinutes();
                var seg = data.getSeconds();


                var str_data = dia + '-' + (mes + 1) + '-' + ano4;
                var str_hora = hora + 'Hrs, ' + min + 'min, ' + seg+'s';


                let DataExecucao = str_data + ' ' + str_hora;

                //console.log(DataExecucao);




                
               

                fs.readFile(DataExecucao+'.txt', 'utf-8', function (erro) {
                    if (erro) {
                        fs.open(DataExecucao+'.txt', 'w', function (erro, file) {
                            if (erro) throw erro
                            //console.log('Arquivo criado NumerosApostados');
                            if (acertou) {
                                fs.appendFile(DataExecucao+'.txt', ArrayInformada + ' **GANHADOR**\n', function (erro) {
                                    if (erro) throw erro
                                    //console.log('Arquivo editado');
                                });
                            } else {
                                fs.appendFile(DataExecucao+'.txt', ArrayInformada + '\n', function (erro) {
                                    if (erro) throw erro
                                    //console.log('Arquivo editado');
                                });
                            }
                        });
                    } else {
                        if (acertou) {
                            fs.appendFile(DataExecucao+'.txt', ArrayInformada + ' **GANHADOR**\n', function (erro) {
                                if (erro) throw erro
                                //console.log('Arquivo editado');
                            });
                        } else {
                            fs.appendFile(DataExecucao+'.txt', ArrayInformada + '\n', function (erro) {
                                if (erro) throw erro
                                //console.log('Arquivo editado');
                            });
                        }
                    }
                });

            });



        });




    }

});
server.listen(3000, function () {
    console.log('Executando Servidor HTTP');
});