// Declarando variáveis globais
let alunos = [];

// Evento disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
    // Função para carregar dados na tabela
    carrega();

    // Elementos do modal novo aluno
    let btnNovoAluno = document.getElementById("btnNovoAluno");
    let modalNovoAluno = document.getElementById("modalNovoAluno");
    let spanNovoAluno = modalNovoAluno.querySelector(".close");

    // Configurando eventos do modal novo aluno
    btnNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "block";
    };

    spanNovoAluno.onclick = function () {
        modalNovoAluno.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modalNovoAluno) {
            modalNovoAluno.style.display = "none";
        }
    };

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
});

// Função para identificar aluno por cadastro
function identifica(matricula) {
    for (let aluno of alunos) {
        if (aluno.matricula === matricula.id) {
            return aluno;
        }
    }
    return null;
}

// Função para exibir modal de informações do aluno
function modal(button) {
    let aluno = identifica(button);

    let modal = document.getElementById("myModal");

    if (!modal) {
        console.error("Elemento 'myModal' não encontrado no DOM");
        return;
    }

    let span = modal.querySelector(".close");
    if (!span) {
        console.error("Elemento 'close' não encontrado no DOM");
        return;
    }

    // Elementos do modal de informações do cadastro
    let matriculaModal = modal.querySelector("#matriculaModal");
    let nomeModal = modal.querySelector("#nomeModal");
    let livroModal = modal.querySelector("#livroModal");
    let cpfModal = modal.querySelector("#cpfModal");
    let telefoneModal = modal.querySelector("#telefoneModal");
    let btnExcluirAluno = modal.querySelector("#btnExcluirAluno");

    if (!matriculaModal || !nomeModal || !livroModal || !cpfModal || !telefoneModal || !btnExcluirAluno) {
        console.error("Elementos não encontrados no DOM");
        return;
    }

    // Preenchendo informações no modal
    matriculaModal.innerHTML = aluno.matricula;
    nomeModal.innerHTML = aluno.nome;
    livroModal.innerHTML = aluno.livro;
    cpfModal.innerHTML = aluno.cpf;
    telefoneModal.innerHTML = aluno.telefone;

    // Configurando o botão de excluir
    btnExcluirAluno.onclick = function () {
        excluirAluno(aluno.placa);
        modal.style.display = "none";
    };

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    modal.style.display = "block";
}

// Função para excluir cadastro
function excluirAluno(matricula) {
    alunos = alunos.filter(aluno => aluno.matricula !== matricula);
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carrega();
}

// Função para carregar dados na tabela
function carrega() {
    let tabela = document.getElementById("tabela");
    alunos = JSON.parse(localStorage.getItem("alunos")) || [];

    tabela.innerHTML = "";

    for (let aluno of alunos) {
        let botaoid = `<td><button id='${aluno.matricula}' class='btn-info'>Mais info</button></td>`;
        let linha = `<tr>
            <td>${aluno.matricula}</td>
            <td>${aluno.nome}</td>
            <td>${aluno.livro}</td>
            <td>${aluno.cpf}</td>
            <td>${aluno.telefone}</td>
            ${botaoid}</tr>`;
        tabela.innerHTML += linha;
    }

    // Adicionando eventos aos botões da tabela
    let botoes = document.querySelectorAll('.btn-info');
    for (let i = 0; i < botoes.length; i++) {
        botoes[i].onclick = function () {
            modal(this);
        };
    }
}

// Função para cadastrar novo aluno
function cadastrarAluno() {
    let matricula = document.getElementById("matricula").value;
    let nome = document.getElementById("nome").value;
    let livro = document.getElementById("livro").value;
    let cpf = document.getElementById("cpf").value;
    let telefone = document.getElementById("telefone").value;

    // Verifica se a matricula já está cadastrada
    if (alunoExistente(matricula)) {
        alert("Aluno já cadastrado.");
        return;
    }

    let novoAluno = {
        matricula: matricula,
        nome: nome,
        livro: livro,
        cpf: cpf,
        telefone: telefone
    };

    alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push(novoAluno);

    // Salva no localStorage
    localStorage.setItem("alunos", JSON.stringify(alunos));

    // Recarrega a tabela após cadastrar um novo aluno
    carrega();

    // Esconde o modal de novo aluno
    modalNovoAluno.style.display = "none";
}

// Função para verificar se o aluno já existe
function alunoExistente(matricula) {
    return alunos.some(aluno => aluno.matricula === matricula);
}