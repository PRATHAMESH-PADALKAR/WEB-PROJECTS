const num = document.querySelector('#counter');

// const increment = () => {
//     let value = parseInt(num.innerText);
//     value += 1;
//     num.innerText = value;
// }

function increment () {
    let value = parseInt(num.innerText)
    value += 1
    num.innerText = value
}

const decrement = () => {
    let value = parseInt(num.innerText)
    value -= 1
    num.innerText = value
}