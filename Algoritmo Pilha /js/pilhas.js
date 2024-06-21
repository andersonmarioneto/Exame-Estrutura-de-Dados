

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