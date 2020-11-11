const transactionsUl = document.querySelector('#transactions')//pegar o elemento com id tal...


const dummyTransactions = [//array com objetos
{id: 1, name: 'Bolo de brigadeiro', amount: -20},//objetos 0
{id: 2, name: 'Salario', amount: 300},//objetos 1
{id: 3, name: 'Torta de Frango', amount: -10},//objetos 2
{id: 4, name: 'Violão', amount: 150}//objetos 3
]

const addTransactionIntoDOM = transaction =>{//o parametro transaction recebe o objeto que representa a transação
   const operator = transaction.amount< 0 ? '-' : '+'//descobrir qual operador usar de acordo com o atributo amount do objeto
   const CSSClass = transaction.amount<0 ? 'minus' : 'plus'//armazenar qual classe adicionar a nova <li> que será add
   const amountWithoutOperator =Math.abs(transaction.amount) //metodo abs para tirar o sinal caso seja negativo e não ficar com o sinal uplicado dentro da li
   const li= document.createElement('li')//como está sendo criado pelo js, a const li é um obj

    li.classList.add(CSSClass)//add li com a classe de acordo com as condições colocadas na const CSSClass
    li.innerHTML = `${transaction.name} <span> ${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>`
    
    // transactionsUl.innerHTML=li  --- Não podemos adicionar a li na ul deste modo pois, para realizar isto precisamos que o paramtro passado para incluir seja uma String, neste caso  a nossa li foi criado pelo js, deste modo ela vira um objeto
    transactionsUl.append(li)
    }

    const updateBalanceValues = () => {
        const transactionAmount = dummyTransactions.map(transaction => transaction.amount)
        console.log(transactionAmount)
    }

const init = ()=>{
    dummyTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()