const API_URL =
"https://9ec1av5s88.execute-api.us-east-1.amazonaws.com";

async function criarPedido(){

    const pedido = {

        cliente:
        document.getElementById("cliente").value,

        email:
        document.getElementById("email").value,

        produto:
        document.getElementById("produto").value,

        quantidade:
        Number(
            document.getElementById(
                "quantidade"
            ).value
        ),

        valorUnitario:
        Number(
            document.getElementById(
                "valorUnitario"
            ).value
        )
    };

    const response = await fetch(
        `${API_URL}/pedidos`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(pedido)
        }
    );

    const dados =
        await response.json();

    alert(dados.mensagem);

    listarPedidos();
}

async function listarPedidos(){

    const response =
        await fetch(
            `${API_URL}/pedidos`
        );

    const dados =
        await response.json();

    const div =
        document.getElementById(
            "pedidos"
        );

    div.innerHTML = "";

    dados.pedidos.forEach(
        pedido => {

            div.innerHTML += `
            <div class="card">

                <h3>
                    ${pedido.produto}
                </h3>

                <p>
                    Cliente:
                    ${pedido.cliente}
                </p>

                <p>
                    Quantidade:
                    ${pedido.quantidade}
                </p>

                <p>
                    Valor:
                    R$ ${pedido.valorTotal}
                </p>

                <p class="${pedido.status}">
                    Status:
                    ${pedido.status}
                </p>

                <button
                    onclick="entregarPedido('${pedido.id}')">
                    Entregar
                </button>

                <button
                    onclick="cancelarPedido('${pedido.id}')">
                    Cancelar
                </button>

            </div>
            `;
        }
    );
}

async function entregarPedido(id){

    await fetch(
        `${API_URL}/pedidos/${id}/status`,
        {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status:"entregue"
            })
        }
    );

    listarPedidos();
}

async function cancelarPedido(id){

    await fetch(
        `${API_URL}/pedidos/${id}`,
        {
            method:"DELETE"
        }
    );

    listarPedidos();
}

listarPedidos();