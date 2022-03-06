const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const {username} = request.headers

  const nickname = users.find(nickname => nickname.username === username)

  if(!nickname) {
    return response.status(400).json({error: "User not found"});
  }

  request.nickname = nickname;

  next()
}

app.post('/users', (request, response) => {
  const {name, username} = request.body;

  const usernameAlreadyExists = users.some((un) => un.username === username);

  if(usernameAlreadyExists){
    return response.status(400).json({error: "Já existe um username"})
  }

  const newUser = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(newUser)

  response.status(201).json(newUser)
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const {nickname} = request

  const userTodos = nickname.todos

  response.json(userTodos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const {title, deadline} = request.body
  const {nickname} = request;

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  nickname.todos.push(todo)

  return response.json(todo)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {nickname} = request
  const {id} = request.params
  const {title, deadline} = request.body

  const postID = nickname.todos.find(p => p.id === id)

  if(!postID){
    response.status(400).json({error: "not found"})
  }

  postID.title = title;
  postID.deadline = deadline;

  response.status(200).send()
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  const {nickname} = request
  const {id} = request.params
  const {done} = request.body

  const postID = nickname.todos.find(p => p.id === id)

  if(!postID) {
    response.status(400).json({error: "not found"})
  }

  postID.done = done

  response.status(200).send()
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  const {nickname} = request
  const {id} = request.params

  const postID = nickname.todos.find(p => p.id === id)

  if(!postID) {
    response.status(400).json({error: "not found"})
  }

  nickname.todos.splice(postID, 1)

  response.status(200).send()
});

module.exports = app;