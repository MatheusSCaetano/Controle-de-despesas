const transactionsUl = document.querySelector('#transactions')//pegar o elemento com id tal...
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')


const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'))
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    updateLocalStorage()
    init()
}
const addTransactionIntoDOM = transaction =>{//o parametro transaction recebe o objeto que representa a transação
   const operator = transaction.amount< 0 ? '-' : '+'//descobrir qual operador usar de acordo com o atributo amount do objeto
   const CSSClass = transaction.amount<0 ? 'minus' : 'plus'//armazenar qual classe adicionar a nova <li> que será add
   const amountWithoutOperator =Math.abs(transaction.amount) //metodo abs para tirar o sinal caso seja negativo e não ficar com o sinal uplicado dentro da li
   const li= document.createElement('li')//como está sendo criado pelo js, a const li é um obj

    li.classList.add(CSSClass)//add li com a classe de acordo com as condições colocadas na const CSSClass
    li.innerHTML = `${transaction.name} 
    <span> ${operator} R$ ${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
    </button>`
    
    // transactionsUl.innerHTML=li  --- Não podemos adicionar a li na ul deste modo pois, para realizar isto precisamos que o paramtro passado para incluir seja uma String, neste caso  a nossa li foi criado pelo js, deste modo ela vira um objeto
    transactionsUl.append(li)
    }

    const updateBalanceValues = () => {
        const transactionsAmounts = transactions
        .map(transaction => transaction.amount)//cria um vetor com todas as propriedades transaction dos objetos do array do dummyTransaction

        const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0).toFixed(2)

         const income = transactionsAmounts
         .filter(value => value > 0)
         .reduce((accumulator, value) => accumulator+value,0)
         .toFixed(2)//cria um outro vetor com o .filter de acordo a condição (>0 do outro vetor) - reduce vai domar os valores deste novo vetor colocando o toficed no final para ter duas casas decimais
        
         const expense = Math.abs( transactionsAmounts
         .filter(value => value <0)
         .reduce((accumulator, value) => accumulator+value,0))
         .toFixed(2)
         
         balanceDisplay.textContent = `R$ ${total}`
         incomeDisplay.textContent = `R$ ${income}`
         expenseDisplay.textContent= `R$ ${expense}`
    }

const init = ()=>{
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)

    updateBalanceValues()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}


const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionArray = (transactionName, transactionAmount) => {
    transactions.push({ id: generateID(), name: transactionName, amount: +transactionAmount})
}

const cleanInputs = () =>{
    inputTransactionName.value=''
    inputTransactionAmount.value=''
}

const handleFormSubmit = event =>{
    event.preventDefault()//impede que o forms seja enviado e seja carregado em pagina

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputEmpty = transactionName === '' || transactionAmount === ''
    
    if(isSomeInputEmpty){
        alert('Por favor preencha os dois campos para subir uma transação')
        // validando para ver s epreencheu os dois campos
        return
    }

    addToTransactionArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', handleFormSubmit)