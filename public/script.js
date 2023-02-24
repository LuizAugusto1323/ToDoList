const btnAdc = document.querySelector('#btnAdc');

function add() {
  const name = document.querySelector('#tarefa');
  const coment = document.querySelector('#comentario');
  const data = {
    tarefa: name.value,
    comentario: coment.value,
  };
  if (data.tarefa !== '' && data.comentario !== '') {
    show();
    axios.post('http://localhost:3000/tasks/insert', data);
  }
}
function show() {
  const divTask = document.querySelector('.tasks');
  axios.get('http://localhost:3000/tasks/show').then((response) => {
    response.data.forEach((task) => {
      let date = new Date(task.updated_at);
      const childElement = document.createElement('ul');
      childElement.className = task.id;
      childElement.innerHTML = `<li><input type="checkbox"></li><li>${
        task.tarefa
      }</li><li>${
        task.comentario
      }</li><li>Atualizada em: ${date.toLocaleDateString()}</li><li><button id='edit' onClick="edit(${
        task.id
      })"></button></li><li><button id='del'></button></li>`;
      divTask.appendChild(childElement);
    });
  });
}
show();
btnAdc.addEventListener('click', add);

const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');
const btnAtualizar = document.querySelector('#atualizar');

function edit(id) {
  containerModal.classList.add('ativo');
  const newName = document.querySelector('#nome');
  const newComent = document.querySelector('#coment');
  function atualizar() {
    if (newName.value !== '' && newComent.value !== '') {
      axios.put(`http://localhost:3000/tasks/update/${id}`, {
        tarefa: newName.value,
        comentario: newComent.value,
      });
    }
  }
  btnAtualizar.addEventListener('click', atualizar);
}

function fecharModal() {
  containerModal.classList.remove('ativo');
}

botaoFechar.addEventListener('click', fecharModal);
