import promptSync from 'prompt-sync';

class Cliente {
    nomeCompleto: string;
    id: string;
    endereco: string;
    numeroTelefone: string;
    rendaSalarial: number;

    constructor(nomeCompleto: string, id: string, endereco: string, numeroTelefone: string, rendaSalarial: number) {
        this.nomeCompleto = nomeCompleto;
        this.id = id;
        this.endereco = endereco;
        this.numeroTelefone = numeroTelefone;
        this.rendaSalarial = rendaSalarial;
    }
}

class ContaBancaria {
    numeroConta: string;
    cliente: Cliente;
    saldo: number;

    constructor(numeroConta: string, cliente: Cliente) {
        this.numeroConta = numeroConta;
        this.cliente = cliente;
        this.saldo = 0.0;
    }

    depositar(valor: number): void {
        if (valor > 0) {
            this.saldo += valor;
            console.log(`Depósito de R$${valor} realizado com sucesso!`);
        } else {
            console.log("Valor de depósito deve ser positivo.");
        }
    }

    sacar(valor: number): void {
        if (valor > this.saldo) {
            console.log("Saldo insuficiente para realizar o saque.");
        } else if (valor <= 0) {
            console.log("Valor de saque deve ser positivo.");
        } else {
            this.saldo -= valor;
            console.log(`Saque de R$${valor} realizado com sucesso!`);
        }
    }

    verificarSaldo(): number {
        console.log(`Saldo atual: R$${this.saldo}`);
        return this.saldo;
    }
}

class ContaCorrente extends ContaBancaria {
    limiteChequeEspecial: number;

    constructor(numeroConta: string, cliente: Cliente) {
        super(numeroConta, cliente);
        this.limiteChequeEspecial = 100.0;
    }

    sacar(valor: number): void {
        if (valor > this.saldo + this.limiteChequeEspecial) {
            console.log("Saldo insuficiente para realizar o saque.");
        } else if (valor <= 0) {
            console.log("Valor de saque deve ser positivo.");
        } else {
            this.saldo -= valor;
            console.log(`Saque de R$${valor} realizado com sucesso!`);
        }
    }
}

class ContaPoupanca extends ContaBancaria {}

function main() {
    const prompt = promptSync();
    const contas: { [key: string]: ContaBancaria } = {};

    while (true) {
        console.log("\nMenu:");
        console.log("1. Criar nova conta");
        console.log("2. Depositar");
        console.log("3. Sacar");
        console.log("4. Verificar saldo");
        console.log("5. Sair");
        const escolha = prompt("Escolha uma opção: ");

        if (escolha === '1') {
            const numeroConta = prompt("Digite o número da conta: ");
            const nomeCompleto = prompt("Digite o nome completo do titular: ");
            const id = prompt("Digite o número de identificação (ID): ");
            const endereco = prompt("Digite o endereço: ");
            const numeroTelefone = prompt("Digite o número de telefone: ");
            const rendaSalarial = parseFloat(prompt("Digite a renda salarial: "));

            const cliente = new Cliente(nomeCompleto, id, endereco, numeroTelefone, rendaSalarial);

            if (rendaSalarial >= 500) {
                contas[numeroConta] = new ContaCorrente(numeroConta, cliente);
                console.log("Conta corrente criada com sucesso!");
            } else {
                contas[numeroConta] = new ContaPoupanca(numeroConta, cliente);
                console.log("Conta poupança criada com sucesso!");
            }
        } else if (escolha === '2') {
            const numeroConta = prompt("Digite o número da conta: ");
            if (contas[numeroConta]) {
                const valor = parseFloat(prompt("Digite o valor para depositar: "));
                contas[numeroConta].depositar(valor);
            } else {
                console.log("Conta não encontrada.");
            }
        } else if (escolha === '3') {
            const numeroConta = prompt("Digite o número da conta: ");
            if (contas[numeroConta]) {
                const valor = parseFloat(prompt("Digite o valor para sacar: "));
                contas[numeroConta].sacar(valor);
            } else {
                console.log("Conta não encontrada.");
            }
        } else if (escolha === '4') {
            const numeroConta = prompt("Digite o número da conta: ");
            if (contas[numeroConta]) {
                contas[numeroConta].verificarSaldo();
            } else {
                console.log("Conta não encontrada.");
            }
        } else if (escolha === '5') {
            console.log("Saindo do sistema. Até mais!");
            break;
        } else {
            console.log("Opção inválida. Tente novamente.");
        }
    }
}

main();
