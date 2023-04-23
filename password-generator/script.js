const lengthSlider = document.querySelector("[data-lengthSlider]")
const length = document.querySelector("[data-lengthNumber]")
const display = document.querySelector("[data-passwordDisplay]")
const copy = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const upper = document.querySelector("#uppercase")
const lower = document.querySelector("#lowercase")
const num = document.querySelector("#numbers")
const sym = document.querySelector("#symbols")
const dataInd = document.querySelector("[data-indicator]")
const genButt = document.querySelector(".generateButton")
const allCheck = document.querySelectorAll("input[type = checkbox]")
const symbols = '~`!@#$%^&*()_-+={}[]|:;"<,>.?/'


let password = ""
let passwordLength = 10
let checkCount = 0

handleSlider()

function handleSlider(){
    lengthSlider.value  = passwordLength
    length.innerText =   passwordLength 
}

function setIndicator(color){
    dataInd.style.backgroundColor = color
    //dataInd.style.shadow = 
}

function getRandInt(min,max){
    return Math.floor(Math.random() * (max - min)) + min
}

function genNum (){
    return getRandInt(0,9);
}

function genLowCase(){
    return String.fromCharCode(getRandInt(97,123))
}

function genUppCase(){
    return String.fromCharCode(getRandInt(65,91))
}

function genSymbol(){
    let ranNum = getRandInt(0,symbols.length);
    return symbols.charAt(ranNum)
}

function calcStrength(){
    let isUpper = false;
    let isLower = false
    let isNUm = false
    let isSym = false

    if(upper.checked) isUpper = true;
    if(lower.checked) isLower = true;
    if(num.checked) isNUm = true;
    if(sym.checked) isSym = true;

    if(isUpper && isLower && (isNUm || isSym) && passwordLength >=8){
        setIndicator('#0f0')
    }
    else if( (isUpper || isLower) && (isNUm || isSym) && passwordLength >=6){
        setIndicator('#ff0')
    }
    else{
        setIndicator('#f00')
    }
}

function shufflePassword(array){

    //fisher yates method
    for(let i=array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    let str = ""
    array.forEach((el)=>(str += el))
    return str
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(display.value)
        copyMsg.innerText = "Copied"
    }
    catch(e){
        copyMsg.innerText = "Failed"
    }
    copyMsg.classList.add("active")  
     
    setTimeout(() => {
        copyMsg.classList.remove("active") 
    }, 2000);
}

function handleCheckBox(){

    checkCount = 0;
    allCheck.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++
    })

    if(passwordLength < checkCount){
        passwordLength = checkCount
        handleSlider()
    }
}

allCheck.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBox)
})

lengthSlider.addEventListener('input',(e)=> {
    passwordLength = e.target.value;
    handleSlider();
})

copy.addEventListener('click',() => {
    if(display.value)
        copyContent()
})

genButt.addEventListener('click', () => {
    if (checkCount == 0) 
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount
        handleSlider()
    }

    password = ""

    let funcArr = []

    if(upper.checked)
        funcArr.push(genUppCase)
    

    if(lower.checked)
        funcArr.push(genLowCase)

    if(num.checked)
        funcArr.push(genNum)
    
    if(sym.checked)
        funcArr.push(genSymbol)
    

    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }

    for(let i=0;i<passwordLength-funcArr.length; i++){
        let randInd = getRandInt(0 , funcArr.length);
        password += funcArr[randInd]();
    }

    password = shufflePassword(Array.from(password));
    display.value = password

    calcStrength()

})