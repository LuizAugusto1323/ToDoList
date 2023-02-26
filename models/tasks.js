const conexao = require('./connection.js');

async function insertTask(tarefa, comentario) {
  const insert = await conexao.query(
    `INSERT INTO tarefas (tarefa, comentario) VALUES ('${tarefa}', '${comentario}');`,
  );
  return `Tarefa ${tarefa} inserida com sucesso. :)`;
}

async function deletTask(id) {
  const delet = await conexao.query(
    `UPDATE tarefas SET deleted = '1' WHERE id = '${id}';`,
  );
  const message =
    delet.affectedRows !== 0
      ? 'Tarefa deletada com sucesso.'
      : 'Tarefa não encontrada.';
  return message;
}

async function updateTask(id, tarefa, comentario) {
  const update = await conexao.query(
    `UPDATE tarefas SET tarefa = '${tarefa}', comentario = '${comentario}' WHERE id = '${id}';`,
  );
  return `Tarefa de numero ${id} alterada.`;
}

async function showTasks() {
  const show = await conexao.query(
    'SELECT * FROM tarefas WHERE deleted = 0 ORDER BY updated_at DESC;',
  );
  return show;
}

async function showDeleted() {
  const comand =
    'SELECT * FROM tarefas WHERE deleted = 1 ORDER BY updated_at DESC LIMIT 10;';
  const del = await conexao.query(comand);
  return del;
}

async function ready(id) {
  const reading = await conexao.query(
    `UPDATE tarefas SET ready = 1 WHERE id = ${id};`,
  );
  let res =
    ready === 1 ? 'Tarefa marcada como concluida.' : 'Tarefa desmarcada';
  return res;
}

module.exports = {
  insertTask,
  deletTask,
  updateTask,
  showTasks,
  showDeleted,
  ready,
};
