// Definindo a Classe Voo
class Voo {
    constructor(codigo, origem, destino, horario) {
        // Atributos (características)
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.horario = horario;
        this.status = "No Solo";
    }

    // Método para atualizar as informações na tela (DOM)
    atualizarPainel() {
        document.getElementById("txt-codigo").innerText = this.codigo;
        document.getElementById("txt-origem").innerText = this.origem;
        document.getElementById("txt-destino").innerText = this.destino;
        document.getElementById("txt-horario").innerText = this.horario;
        
        const statusElemento = document.getElementById("txt-status");
        statusElemento.innerText = this.status;

        // Lógica de cores baseada no status
        if (this.status === "Em Voo") {
            statusElemento.className = "em-voo";
        } else {
            statusElemento.className = "no-solo";
        }
    }

    // Método para Decolar
    decolar() {
        if (this.status !== "Em Voo") {
            this.status = "Em Voo";
            console.log(`Voo ${this.codigo} decolou com sucesso!`);
            
            // Alterando o visual do avião
            document.getElementById("aviao").classList.add("decolando");
            this.atualizarPainel();
        }
    }

    // Método para Pousar
    pousar() {
        this.status = "No Solo";
        console.log(`Voo ${this.codigo} pousou com sucesso.`);
        
        // Retornando o avião à posição original
        document.getElementById("aviao").classList.remove("decolando");
        this.atualizarPainel();
    }

    // Novo Método sugerido pelo professor
    atualizarStatus(novoStatus) {
        this.status = novoStatus;
        console.log(`Status do voo ${this.codigo} alterado para: ${novoStatus}`);
        this.atualizarPainel();
    }
}

// Criando o objeto (Instanciando a classe)
// Aqui você pode modificar os valores iniciais
const meuVoo = new Voo("GOL-1234", "São Paulo (GRU)", "Rio de Janeiro (GIG)", "14:30");

// Inicializa o painel com os dados do objeto
meuVoo.atualizarPainel();