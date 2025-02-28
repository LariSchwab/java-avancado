let tabelaProdutos = document.getElementById("tabela-produtos");
let botaoConsultarEmpresas = document.getElementById("consultar-empresas");

let urlAPI = "https://public.franciscosensaulas.com"
function atribuirCliqueBotoesApagar() {

    let botoesApagar = document.getElementsByClassName("botao-apagar");
    Array.from(botoesApagar).forEach((botao) => {
        botao.addEventListener('click', apagar);
    });

    async function apagar(evento) {
        const botaoClique = evento.target;

        const nome = botaoClique.getAttribute("data-nome");
        const id = botaoClique.getAttribute("data-id");

        Swal.fire({
            title: `Deseja apagar o cadastro do produto '${nome}'?`,
            text: "Você não poderá reverter isso!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim apagar!",
            cancelButtonText: "Não",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                apagarProduto(id);
            }
        });
    }

    async function apagarProduto(id) { 
        let url = `${urlAPI}/api/v1/empresa/produtos/${id}`
        console.log(url);
    
        const resposta = await fetch(url, { method: "DELETE" });
        if (resposta.ok == false) {
            alert("Não foi possivel apagar");
            return;
        }
    
        Swal.fire({
            title: "Apagado!",
            text: "Produto removida com sucesso!",
            icon: "success"
        });
        consultarEmpresas();    
    }

    async function consultarEmpresas() {
          let url = `${urlAPI}/api/v1/empresa/produtos`

          const resposta = await fetch(url)

          if (resposta.ok == false) {
            alert("Não foi possível carregar os dados")
        }

        const empresas = await resposta.json();

        let tbody = tabelaProduto.querySelector("tbody");
    tbody.innerHTML = "";

    produto.forEach(produtos => {
        const colunas = `
       <td>${produto.nome}</td>
       <td>${produto.preco}</td>
       <td>${produto.categoria}</td>
       <td>
       <a href="editar.html?id=${produto.nome}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
       <button 
       class="btn btn-danger botao-apagar" 
       data-id="${empresa.id}" 
       data-nome="${empresa.nome}"
       ><i class="fas fa-trash"></i> Apagar</button>
       </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;