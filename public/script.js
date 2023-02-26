const btnAdc = document.querySelector('#btnAdc');

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
  const divTask = document.querySelector('.tasks');
  axios.get('http://localhost:3000/tasks/show').then((response) => {
    response.data.forEach((task) => {
      let date = new Date(task.updated_at);
      const childElement = document.createElement('ul');
      childElement.className = task.id;
      if (task.ready === 0) {
        childElement.innerHTML = `<li><input type="checkbox" id='${
          task.id
        }'><label for='${task.id}' onClick="checar(${
          task.id
        })">Aberta</label></li><li>${task.tarefa}</li><li>${
          task.comentario
        }</li><li>Atualizada em: ${date.toLocaleDateString()}</li><li><button id='edit' onClick="edit(${
          task.id
        })"></button></li><li><button id='del' onClick="delet(${
          task.id
        })"></button></li>`;
        divTask.appendChild(childElement);
      } else {
        childElement.innerHTML = `<li><input type="checkbox" id='${
          task.id
        }' checked><label for='${task.id}' onClick="checar(${
          task.id
        })">Fechada</label></li><li>${task.tarefa}</li><li>${
          task.comentario
        }</li><li>Atualizada em: ${date.toLocaleDateString()}</li><li><button id='edit' onClick="edit(${
          task.id
        })"></button></li><li><button id='del' onClick="delet(${
          task.id
        })"></button></li>`;
        divTask.appendChild(childElement);
      }
    });
  });
  return null;
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

function delet(id) {
  axios.delete(`http://localhost:3000/tasks/delete/${id}`);
  window.location.reload();
}

const deletadas = document.querySelector('#deletadas');

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
  const divTask = document.querySelector('.tasks');
  if (divTask.className === 'tasks ativo') {
    divTask.innerHTML = showDeleted();
    divTask.classList.remove('ativo');
  } else {
    divTask.classList.add('ativo');
    divTask.innerHTML = show();
  }
}

deletadas.addEventListener('click', cleanTaskList);

function checar(id) {
  axios.post(`http://localhost:3000/tasks/ready/${id}`, {
    ready: 1,
  });
  window.location.reload();
}
