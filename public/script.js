import axios from 'axios';

const btnAdc = document.querySelector('#btnAdc');

async function add() {
  const name = document.querySelector('#tarefa');
  const coment = document.querySelector('#comentario');
  const comentValue = coment.value;
  const nameValue = name.value;

  const post = await axios({
    method: 'post',
    url: 'http://localhost:3000/tasks/insert',
    data: {
      tarefa: nameValue,
      comentario: comentValue,
    },
  });

  return post;
}

btnAdc.addEventListener('click', add);
