const conexao = require('./connection.js');

conexao.conex;

function insertTask(tarefa, data, comentario){
  const insert = conexao.connection.query(`INSERT INTO tarefas (tarefa, data, comentario) VALUES ('${tarefa}', '${data}', '${comentario}');`)
  return insert;
}

function deletTask(id){
  const delet = conexao.connection.query(`DELETE FROM tarefas WHERE id = '${id}';`);
  return delet;
}

function updateTask(id, tarefa, data, comentario){
  const update = conexao.connection.query(`UPDATE tarefas SET tarefa = '${tarefa}', data = '${data}', comentario = '${comentario}' WHERE id = '${id}';`)
  return update;
}

function showTasks(){
  const show = conexao.connection.query("SELECT * FROM tarefas;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return result;
    }
  });
}

module.exports = {insertTask, deletTask, updateTask, showTasks}