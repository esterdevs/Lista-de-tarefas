// Carrega as tarefas salvas quando a página abre
window.onload = carregarTarefas;


function adicionarTarefa() {
  
  const input = document.getElementById("tarefa");
  const texto = input.value.trim();
  
  if (texto === "") {
    alert("Digite uma tarefa!");
    return;
  }
  
  criarTarefa(texto, false);
  
  input.value = "";
  
  salvarTarefas();
}


function criarTarefa(texto, concluida) {
  
  const lista = document.getElementById("lista");
  
  const item = document.createElement("li");
  
  const textoTarefa = document.createElement("span");
  textoTarefa.textContent = texto;
  
  if (concluida) {
    textoTarefa.style.textDecoration = "line-through";
    textoTarefa.style.opacity = "0.5";
  }
  
  
  // Botão concluir
  const botaoConcluir = document.createElement("button");
  
  botaoConcluir.textContent = concluida ?
    "Desfazer" :
    "Concluir";
  
  botaoConcluir.onclick = function() {
    
    if (textoTarefa.style.textDecoration === "line-through") {
      
      textoTarefa.style.textDecoration = "none";
      textoTarefa.style.opacity = "1";
      
      botaoConcluir.textContent = "Concluir";
      
    } else {
      
      textoTarefa.style.textDecoration = "line-through";
      textoTarefa.style.opacity = "0.5";
      
      botaoConcluir.textContent = "Desfazer";
    }
    
    salvarTarefas();
  };
  
  
  // Botão excluir
  const botaoExcluir = document.createElement("button");
  
  botaoExcluir.textContent = "Excluir";
  
  botaoExcluir.onclick = function() {
    
    item.remove();
    
    salvarTarefas();
  };
  
  
  item.appendChild(textoTarefa);
  item.appendChild(botaoConcluir);
  item.appendChild(botaoExcluir);
  
  lista.appendChild(item);
}


function salvarTarefas() {
  
  const tarefas = [];
  
  const itens = document.querySelectorAll("#lista li");
  
  itens.forEach(function(item) {
    
    const texto = item.querySelector("span").textContent;
    
    const concluida =
      item.querySelector("span").style.textDecoration === "line-through";
    
    tarefas.push({
      texto: texto,
      concluida: concluida
    });
  });
  
  localStorage.setItem(
    "tarefas",
    JSON.stringify(tarefas)
  );
}


function carregarTarefas() {
  
  const tarefasSalvas = localStorage.getItem("tarefas");
  
  if (!tarefasSalvas) {
    return;
  }
  
  const tarefas = JSON.parse(tarefasSalvas);
  
  tarefas.forEach(function(tarefa) {
    
    criarTarefa(
      tarefa.texto,
      tarefa.concluida
    );
    
  });
}