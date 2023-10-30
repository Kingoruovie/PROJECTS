let rate = 0;

document.body.querySelectorAll('.rate').forEach(
    (item) => {
        item.addEventListener('click',() => {
            rate = item.textContent;
            removeActiveStyle()
            addActiveStyle(item)
        })
    }
)


document.body.querySelector('button').addEventListener('click', () => {
    if (rate !== 0) {
        document.body.querySelector('span').textContent = rate
        document.body.querySelector('main.rating').style.display = 'none'
        document.body.querySelector('main.thank-you').style.display = 'block'
    }
})



function removeActiveStyle () {
    let item = document.body.querySelector('.active')
    if (item != null ) {
        item.classList.remove('active');
    }
}

function addActiveStyle (item) {
    item.classList.add('active');
}