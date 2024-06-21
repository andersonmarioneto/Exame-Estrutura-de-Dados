/* //funcao Stack - com os metodos da pilha
function Stack() {
    var items = []

    this.push = function(element) {
        //metodo add
        items.push(element)
    }

    this.pop = function() {
        //metodo remove elemento
        return items.pop()
    }

    this.peek = function() {
        //verifica o ultimo elemento da pilha - o topo
        return items[items.length -1]
    }

    this.isEmpty = function() {
        //informa se a pilha está vazia ou nao
        return items.length === 0
    }

    this.clear = function(element) {
        // limpar pilha
        items = []
    }

    this.size = function(element) {
        // tamanho
        return items.length
    }

    this.print = function(element) {
        // escrever a pilha na tela
        console.log(items.toString())
    }
}

// instanvia da class Stack - object pilha
var pilha = new Stack()

console.log(pilha.isEmpty(), "Pilha está vazia?")

pilha.push(2)
pilha.print()
pilha.push(4)
pilha.print()
pilha.push(6)
pilha.print()
pilha.push(8)
pilha.print()
pilha.push(10)
pilha.print()

console.log(pilha.peek(), "Topo")
console.log(pilha.size(), "Tamanho")

pilha.pop()
pilha.print()
pilha.pop()
pilha.print()
pilha.pop()
pilha.print()
pilha.pop()
pilha.print()

console.log(pilha.isEmpty(), "Pilha está vazia?") */


function converte(decNumber) { //numero escrito ex:23
    var restStack = [],
    rest,
    binaryString = ''

    while(decNumber > 0) { //verificação 
        rest = Math.floor(decNumber % 2) // resto da divisão por 2 "verificaçao"
        restStack.push(rest) //ex: [1,1,1,0,1]
        decNumber = Math.floor(decNumber / 2) // o resultado dividido por 2
    }

    while(restStack.length > 0) { // verifica o tamanho ex: 5 
        binaryString += restStack.pop().toString() //remove os elementos escrevendo em ordem decrescente ex: 10111
    }

    return binaryString
}

const btn = document.querySelector("#send")

btn.addEventListener("click", function(e) {
    e.preventDefault()

    const decimalInput = document.querySelector("#num")
    console.log(decimalInput.value)
    console.log(converte(decimalInput.value))

    const binaryInput = document.querySelector("#result")
    binaryInput.value = converte(decimalInput.value);
})

//console.log(converte(23))