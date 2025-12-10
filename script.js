// Carrega dados ao abrir a página
exibir_financas();
exibir_resumo();


// ================= Cadastrar Salário =================
document.getElementById("formsal").addEventListener("submit", function(event) {
    event.preventDefault();

    const salario = parseFloat(document.getElementById("salario").value);

    if (salario > 0) {
        localStorage.setItem("salario", salario);
        exibir_financas();
        exibir_resumo();
        document.getElementById("salario").value = "";
    }
});


// ================= Cadastrar Despesas =================
document.getElementById("formdesp").addEventListener("submit", function(event) {
    event.preventDefault();

    const data = document.getElementById("data").value;
    const nome = document.getElementById("nome").value;
    const valor = parseFloat(document.getElementById("valor").value);

    if (data && nome && valor > 0) {
        const financas = { data, nome, valor };
        const lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];

        lista_financas.push(financas);
        localStorage.setItem('listagem', JSON.stringify(lista_financas));

        exibir_financas();
        exibir_resumo();

        document.getElementById("data").value = "";
        document.getElementById("nome").value = "";
        document.getElementById("valor").value = "";
    }
});


// ================= Exibir Despesas =================
function exibir_financas() {
    const lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];
    const output = document.getElementById('output');
    output.innerHTML = '';

    lista_financas.forEach((financa, index) => {
        const li = document.createElement('li');

        li.innerHTML = `
            <strong>DATA:</strong> ${financa.data};
            <strong>NOME:</strong> ${financa.nome};
            <strong>VALOR:</strong> R$${financa.valor}
            <button onclick="removerDespesa(${index})">Deletar</button>
            <button onclick="editarDespesa(${index})">Editar</button>
        `;

        output.appendChild(li);
    });
}


// ================= Soma total das despesas =================
function total_despesas() {
    const lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];
    return lista_financas.reduce((total, financa) => total + financa.valor, 0);
}


// ================= Atualiza Resumo Financeiro =================
function exibir_resumo() {
    const salario = parseFloat(localStorage.getItem("salario")) || 0;
    const total = total_despesas();
    const restante = salario - total;

    document.getElementById("salariores").textContent = salario.toFixed(2);
    document.getElementById("saldot").textContent = total.toFixed(2);
    document.getElementById("saldof").textContent = restante.toFixed(2);
}


// ================= Remover Despesa =================
function removerDespesa(index) {
    const lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];
    lista_financas.splice(index, 1);

    localStorage.setItem('listagem', JSON.stringify(lista_financas));
    exibir_financas();
    exibir_resumo();
}


// ================= Editar Despesa =================
function editarDespesa(index) {
    const lista_financas = JSON.parse(localStorage.getItem('listagem')) || [];
    const financa = lista_financas[index];

    document.getElementById("data").value = financa.data;
    document.getElementById("nome").value = financa.nome;
    document.getElementById("valor").value = financa.valor;

    removerDespesa(index);
}


// ================= Limpar tudo =================
function Limpar() {
    document.getElementById("output").innerHTML = "";
    localStorage.clear();

    document.getElementById("salariores").innerHTML = "";
    document.getElementById("saldot").innerHTML = "";
    document.getElementById("saldof").innerHTML = "";

    exibir_resumo();
}
