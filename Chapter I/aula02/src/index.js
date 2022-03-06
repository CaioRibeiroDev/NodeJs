const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();
app.use(express.json());

const customers = []

// Middleware
function verifyIfExistsAccountCPF(req, res, next) {
  // pegando cpf
  const { cpf } = req.headers

  // buscando cpf
  const customer = customers.find(customer => customer.cpf === cpf);

  // verificando se existe customer
  if(!customer){
    return res.status(400).json({error: "Customer not found"});
  }

  req.customer = customer;

  return next();
}
 
function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit') {
      return acc + operation.amount
    }else {
      return acc - operation.amount
    }
  }, 0)

  return balance;
}

app.post('/account', (req, res) => {
  // desestruturando informações do body
  const { cpf, name } = req.body;

  // testa se ao menos um dos elementos no array passa no teste implementado pela função atribuída e retorna um valor true ou false.
  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)

  // verificando se existe no array
  if(customerAlreadyExists) {
    return res.status(400).json({ error: "Customer already Exists!" })
  } 

  customers.push({
    cpf,
    name,
    id: uuidv4(), 
    statement: []
  })

  return res.status(201).send()
})

// app.use(verifyIfExistsAccountCPF) Tudo que estiver abaixo dele pegará o verifyIfExistsAccountCPF.


app.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {
  const {description, amount} = req.body;

  const {customer} = req;

  const statementOperant = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperant);

  return res.status(201).send()
})

app.post('/withdraw', verifyIfExistsAccountCPF, (req, res) => {
  const {amount} = req.body;
  const {customer} = req;

  console.log(customer.statement)
  const balance = getBalance(customer.statement);

  if(balance < amount) {
    return res.status(400).json({error: "Insufficient funds!"})
  }

  const statementOperant = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperant);

  return res.status(201).send();
})

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {
  const {customer} = req
  return res.json(customer.statement)
})


app.get('/statement/date', verifyIfExistsAccountCPF, (req, res) => {
  const {customer} = req
  const {date} = req.query

  const dateFormat = new Date(date + " 00:00")

  const statement = customer.statement.filter(
    (statement) => 
      statement.created_at.toDateString() === 
      new Date(dateFormat).toDateString()
    )
    
    return res.json(statement)
}) 

app.put('/account', verifyIfExistsAccountCPF, (req, res) => {
  const {name} = req.body;
  const {customer} = req;

  customer.name = name;

  return res.status(201).send();
})

app.get('/account', verifyIfExistsAccountCPF, (req, res) => {
  const {customer} = req

  return res.json(customer)
})

app.delete('/account', verifyIfExistsAccountCPF, (req, res) => {
  const {customer} = req;

  // splice
  customers.splice(customer, 1)

  return res.status(200).json(customers)
})

app.get('/balance', verifyIfExistsAccountCPF, (req, res) => {
  const {customer} = req

  const balance = getBalance(customer.statement);

  return res.json(balance)
})

app.listen(3333, () => {
  console.log('Server Is Started');
})