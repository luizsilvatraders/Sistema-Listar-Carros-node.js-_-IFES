const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const carrosFile = 'carros.json';

function listarCarros() {
  return new Promise((resolve, reject) => {
    fs.readFile(carrosFile, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const carros = JSON.parse(data);
        resolve(carros);
      }
    });
  });
}

function cadastrarCarro() {
  return new Promise((resolve, reject) => {
    rl.question('Placa: ', (placa) => {
      rl.question('Nome: ', (nome) => {
        rl.question('Montadora: ', (montadora) => {
          fs.readFile(carrosFile, 'utf8', (err, data) => {
            if (err) {
              reject(err);
            } else {
              let carros = JSON.parse(data);
              if (!Array.isArray(carros)) {
                carros = [];
              }
              carros.push({ placa, nome, montadora });
              fs.writeFile(carrosFile, JSON.stringify(carros), (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            }
          });
        });
      });
    });
  });
}

function main() {
  rl.question('Escolha sua opção:\n1 - Listar carros\n2 - Cadastrar carro\n0 - Sair do sistema\n', async (opcao) => {
    switch (opcao) {
      case '1':
        try {
          const carros = await listarCarros();
          console.log(carros);
        } catch (err) {
          console.error(err);
        }
        main();
        break;
      case '2':
        try {
          await cadastrarCarro();
          console.log('Carro cadastrado com sucesso!');
        } catch (err) {
          console.error(err);
        }
        main();
        break;
      case '0':
        rl.close();
        break;
      default:
        console.log('Opção inválida.');
        main();
    }
  });
}

main();
