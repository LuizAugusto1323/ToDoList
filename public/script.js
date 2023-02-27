const btnAdc = document.querySelector('#btnAdc');
const botaoFechar = document.querySelector('[data-modal="fechar"]');
const containerModal = document.querySelector('[data-modal="container"]');
const btnAtualizar = document.querySelector('#atualizar');
const deletadas = document.querySelector('#deletadas');
const divTask = document.querySelector('.tasks');

function add() {
  const name = document.querySelector('#tarefa');
  const coment = document.querySelector('#comentario');
  const data = {
    tarefa: name.value,
    comentario: coment.value,
  };
  if (data.tarefa !== '' && data.comentario !== '') {
    axios.post('http://localhost:3000/tasks/insert', data);
  }
}

function show() {
  axios.get('http://localhost:3000/tasks/show').then((response) => {
    response.data.forEach(({ tarefa, comentario, id, updated_at, ready }) => {
      let date = new Date(updated_at);
      const bodyTask = `<li>${tarefa}</li><li>${comentario}</li><li>Atualizada em: ${date.toLocaleDateString()}</li><li><button id='edit' onClick="edit(${id})"></button></li><li><button id='del' onClick="delet(${id})"></button></li>`;
      const childElement = document.createElement('ul');
      childElement.className = id;
      if (ready === 0) {
        childElement.innerHTML = `<li><input type="checkbox" id='${id}'><label for='${id}' onClick="checar(${id})">Aberta</label></li>${bodyTask}`;
      } else {
        childElement.innerHTML = `<li><input type="checkbox" id='${id}' checked><label for='${id}' onClick="checar(${id})">Fechada</label></li>${bodyTask}`;
      }
      divTask.appendChild(childElement);
    });
  });
  return null;
}
show();

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

function delet(id) {
  axios.delete(`http://localhost:3000/tasks/delete/${id}`);
  window.location.reload();
}

function showDeleted() {
  axios.get('http://localhost:3000/tasks/deleted').then((response) => {
    const divTask = document.querySelector('.tasks');
    response.data.forEach((task) => {
      let date = new Date(task.updated_at);
      const childElement = document.createElement('ul');
      childElement.className = task.id;
      childElement.innerHTML = `<li>${task.tarefa}</li><li>${
        task.comentario
      }</li><li>Atualizada em: ${date.toLocaleDateString()}</li></button></li>`;
      divTask.appendChild(childElement);
    });
  });
  return null;
}

function cleanTaskList() {
  if (divTask.className === 'tasks ativo') {
    divTask.innerHTML = showDeleted();
    divTask.classList.remove('ativo');
  } else {
    divTask.classList.add('ativo');
    divTask.innerHTML = show();
  }
}

function checar(id) {
  axios.post(`http://localhost:3000/tasks/ready/${id}`, {
    ready: 1,
  });
  window.location.reload();
}

btnAdc.addEventListener('click', add);
botaoFechar.addEventListener('click', fecharModal);
deletadas.addEventListener('click', cleanTaskList);
