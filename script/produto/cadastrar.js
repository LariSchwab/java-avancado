let urlAPI = "https://public.franciscosensaulas.com";

let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);

async function salvar(e) {
    e.preventDefault(); 

   let campoNome = documento.getElementById("campoNome");
   let nome = campoNome.value

    if (nome.length < 3) {
        alert("Nome do produto deve conter no mínimo 3 caracteres");
        return;
    }

    if (nome.length > 20) {
        alert("Nome do produto deve conter no máximo 20 caracteres");
        return;
    }

   let campoPreco = document.getElementById("campoPreco");
   let preco = campoPreco.value

    // Validação do campo preço (deve ser um número válido maior que zero)
    if (isNaN(preco) || preco <= 0) {
        alert("Preço do produto deve ser um número válido maior que zero");
        return;
    }

    let campoCategoria = document.getElementById("campoCategoria");
    let categoria = campoCategoria.value

    // Criando o objeto com os dados para envio
    const dados = {
        nome: nome,
        descricao: descricao,
        preco: parseFloat(preco).toFixed(2) // Certificando que o preço tenha duas casas decimais
    };

  
    let url = `${urlAPI}/api/v1/empresa/produtos`;
    const resposta = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    if(resposta.ok == false) {
        alert("Não foi possível cadastrar o produto");
    } else {
        location.href = '/produto/index.html'; 
    }
}
