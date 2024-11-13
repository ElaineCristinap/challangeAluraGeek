async function getAllProducts() {
  const url = "http://localhost:3000/produtos";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Pegando os dados do backend fake
  const products = await getAllProducts();
  // Testando para ver se os dados vem corretamente no console
  // console.log(products)

  // representação de um card em html para seguimento
  // <div class="card">
  //     <img class="card-img" src="./assets/card-one-img.svg" alt="Foto do primeiro card">
  //     <p class="card-title">Stormtrooper</p>
  //     <div class="card-footer">
  //         <p class="card-price">$ 60,00</p>
  //         <img class="card-icon" id="icon-trash" src="./assets/icon-trash.svg" alt="Icone de lixeira">
  //     </div>
  // </div>

  // Percorrendo pela lista de produtos e criando um card dinamicamente com os dados corretos de todos os produtos
  for (produto of products) {
    const cardList = document.getElementById("card-list");

    const div1 = document.createElement("div");
    div1.classList = "card";

    const imagem1 = document.createElement("img");
    imagem1.classList = "card-img";
    imagem1.setAttribute("src", `${produto.imagem}`);

    const p1 = document.createElement("p");
    p1.classList = "card-title";
    p1.textContent = produto.nome;

    const div2 = document.createElement("div");
    div2.classList = "card-footer";

    div1.appendChild(imagem1);
    div1.appendChild(p1);
    div1.appendChild(div2);

    const p2 = document.createElement("p");
    p2.classList = "card-price";
    p2.textContent = `$ ${produto.preco}`;

    const imagem2 = document.createElement("img");
    imagem2.classList = "card-icon";
    imagem2.setAttribute("src", "./assets/icon-trash.svg");
    imagem2.id = "icon-trash";

    imagem2.addEventListener("click", async () => {
      const url = `http://localhost:3000/produtos/${produto.id}`;
      try {
        await fetch(url, {
          method: "DELETE",
        });
      } catch (error) {
        console.error(error);
      }
    });

    div2.appendChild(p2);
    div2.appendChild(imagem2);

    cardList.appendChild(div1);
  }
});

const btnGuardar = document.getElementById("btn-guardar");

btnGuardar.addEventListener("click", async () => {
  const inputNome = document.getElementById("name");
  const inputValue = document.getElementById("value");
  const inputImg = document.getElementById("img");

  // Validação do Input

  if (inputNome.value == "") {
    alert("O Campo de Nome é obrigatório");
    return;
  }
  if (inputValue.value == "") {
    alert("O Campo de Valor é obrigatório");
    return;
  }
  if (inputImg.value == "") {
    alert("O Campo de Imagem é obrigatório");
    return;
  }
  if (isNaN(inputValue.value)) {
    alert("O Campo de Valor deve ser números");
    return;
  }

  const produto = {
    nome: inputNome.value,
    preco: Number(inputValue.value),
    imagem: inputImg.value,
  };

  const url = "http://localhost:3000/produtos";
  try {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(produto),
    });
  } catch (error) {
    console.error(error.message);
  }
});
