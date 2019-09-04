const TodosService = {
    getAllTodos(knex){
        return knex.select('*').from('dothingsdaily_todos')
    },
    insertTodo(knex, newTodo) {
        return knex
            .insert(newTodo)
            .into('dothingsdaily_todos')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
      return knex.from('dothingsdaily_todos').select('*').where('id', id).first()
    },
    deleteTodo(knex, id) {
      return knex('dothingsdaily_todos')
        .where({ id })
        .delete()
    },
    updateTodo(knex, id, newTodoFields) {
      return knex('dothingsdaily_todos')
        .where({ id })
        .update(newTodoFields)
    },
}

module.exports = TodosService