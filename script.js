// --- CLASSE MÃE (PAI) ---
class Voo {
    constructor(codigo, origem, destino) {
        this.codigo = codigo;
        this.origem = origem;
        this.destino = destino;
        this.status = "No Pátio";
        this.altitude = 0;
    }

    decolar() {
        if (this.status === "No Pátio") {
            this.status = "Em Voo";
            this.altitude = 10000;
            return `Voo ${this.codigo} autorizado! Decolagem concluída.`;
        }
        return "O avião já está voando!";
    }

    pousar() {
        if (this.status === "Em Voo" || this.status === "Supersônico") {
            this.status = "Pousado";
            this.altitude = 0;
            return `Voo ${this.codigo} pousou com sucesso.`;
        }
        return "O avião não está em voo.";
    }

    comunicarTorre() {
        return `Torre, aqui é o voo ${this.codigo}. Solicito coordenadas.`;
    }
}

// --- SUBCLASSE: JATO EXECUTIVO ---
class JatoExecutivo extends Voo {
    constructor(codigo, origem, destino) {
        super(codigo, origem, destino);
        this.modoSupersonico = false;
    }

    ativarSupersonico() {
        if (this.status === "Em Voo") {
            this.modoSupersonico = true;
            this.status = "Supersônico";
            this.altitude = 50000;
            return "MODO SUPERSÔNICO ATIVADO! Quebrando a barreira do som.";
        }
        return "Atenção: Decole antes de ativar o modo supersônico!";
    }

    desativarSupersonico() {
        if (this.modoSupersonico) {
            this.modoSupersonico = false;
            this.status = "Em Voo";
            this.altitude = 10000;
            return "Retornando à velocidade subsônica.";
        }
        return "O modo supersônico já está desligado.";
    }

    // Polimorfismo
    comunicarTorre() {
        return `[VIP] Torre, aqui é o Jato ${this.codigo}. Prioridade de pouso imediata!`;
    }
}

// --- SUBCLASSE: VOO DE CARGA ---
class VooCarga extends Voo {
    constructor(codigo, origem, destino, capacidadeMaxima) {
        super(codigo, origem, destino);
        this.capacidadeMaxima = capacidadeMaxima;
        this.cargaAtual = 0;
    }

    embarcarCarga(toneladas) {
        if (this.status !== "No Pátio") {
            return "Erro: Não é possível carregar um avião que já decolou!";
        }
        if (this.cargaAtual + toneladas <= this.capacidadeMaxima) {
            this.cargaAtual += toneladas;
            return `Sucesso: ${toneladas}t embarcadas. Total: ${this.cargaAtual}t.`;
        }
        return `ERRO: Peso excedido! Limite restante: ${this.capacidadeMaxima - this.cargaAtual}t.`;
    }

    // Polimorfismo
    comunicarTorre() {
        return `[CARGA] Torre, cargueiro ${this.codigo} transportando ${this.cargaAtual}t. Solicito rota estável.`;
    }
}

// --- INICIALIZAÇÃO DOS OBJETOS ---
const meuJato = new JatoExecutivo("VIP-777", "Paris", "New York");
const meuCargueiro = new VooCarga("CARGO-100", "Manaus", "São Paulo", 150);

// --- FUNÇÕES DE INTERAÇÃO COM A TELA (DOM) ---

function atualizarInterfaceJato(msg) {
    document.getElementById('status-jato').innerText = meuJato.status;
    document.getElementById('alt-jato').innerText = meuJato.altitude;
    document.getElementById('modo-jato').innerText = meuJato.modoSupersonico ? "ATIVADO" : "NORMAL";
    if(msg) document.getElementById('msg-torre').innerText = msg;
}

function atualizarInterfaceCarga(msg) {
    document.getElementById('status-carga').innerText = meuCargueiro.status;
    document.getElementById('alt-carga').innerText = meuCargueiro.altitude;
    document.getElementById('carga-atual').innerText = meuCargueiro.cargaAtual;
    
    // Atualiza a barra de progresso visual
    const porc = (meuCargueiro.cargaAtual / meuCargueiro.capacidadeMaxima) * 100;
    document.getElementById('barra-progresso').style.width = porc + "%";
    
    if(msg) document.getElementById('msg-torre').innerText = msg;
}

// Eventos do Jato
function jatoDecolar() { atualizarInterfaceJato(meuJato.decolar()); }
function jatoAtivarSuper() { atualizarInterfaceJato(meuJato.ativarSupersonico()); }
function jatoDesativarSuper() { atualizarInterfaceJato(meuJato.desativarSupersonico()); }
function jatoPousar() { atualizarInterfaceJato(meuJato.pousar()); }

// Eventos da Carga
function cargaDecolar() { atualizarInterfaceCarga(meuCargueiro.decolar()); }
function cargaPousar() { atualizarInterfaceCarga(meuCargueiro.pousar()); }
function cargaEmbarcar() {
    const input = document.getElementById('input-ton');
    const peso = parseFloat(input.value);
    if (!isNaN(peso)) {
        const resultado = meuCargueiro.embarcarCarga(peso);
        atualizarInterfaceCarga(resultado);
        input.value = "";
    }
}

// Função Universal de Rádio (Polimorfismo em ação)
function enviarRadio(tipo) {
    const objeto = (tipo === 'jato') ? meuJato : meuCargueiro;
    document.getElementById('msg-torre').innerText = objeto.comunicarTorre();
}