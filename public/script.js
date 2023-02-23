const btnAdc = document.querySelector('#btnAdc');

function add() {
  show();
  const name = document.querySelector('#tarefa');
  const coment = document.querySelector('#comentario');
  const data = {
    tarefa: name.value,
    comentario: coment.value,
  };
  // como fazer post com fetch tambem
  /* fetch('http://localhost:3000/tasks/insert', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  }); */
  axios.post('http://localhost:3000/tasks/insert', data).then((response) => {
    console.log(response.data);
  });
}

function show() {
  const divTask = document.querySelector('.tasks');
  axios.get('http://localhost:3000/tasks/show').then((response) => {
    response.data.forEach((task) => {
      let date = new Date(task.created_at);

      console.log();
      const childElement = document.createElement('ul');
      childElement.className = 'task';
      childElement.innerHTML = `<li><input type="checkbox"></li><li>${
        task.tarefa
      }</li><li>${
        task.comentario
      }</li><li>${date.toLocaleDateString()}</li><li><button id='edit'></button></li><li><button id='del'></button></li>`;
      divTask.appendChild(childElement);
    });
  });
}
show();

async function edit() {
  await show();
  const btnEdit = document.querySelectorAll('#edit');
  console.log(btnEdit);
}

edit();

btnAdc.addEventListener('click', add);
