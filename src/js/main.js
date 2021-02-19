//  real-man slider

const prevBtn = document.querySelector(`.rezults__slider-prevArrow`)
const nextBtn = document.querySelector(`.rezults__slider-nextArrow`)
const items = document.querySelectorAll(`.rezults__slider-item`)
const pointsContainer = document.querySelector(`.rezults__slider-points`)


let position = 0
const width = items[0].clientWidth
const totalWidth = width * (items.length - 1)
let pointNumber = 0


createPoints()
const points = document.querySelectorAll(`.rezults__slider-point`)
points[pointNumber].classList.add(`active`)

prevBtn.addEventListener(`click`, () => {
    prev()
    pointsColor()
})

nextBtn.addEventListener(`click`, () => {
    next()
    pointsColor()
})


function next() {
    if (position + width > totalWidth) {
        position = 0
    } else {
        position = position + width
    }
    for (let i = 0; i < items.length; i++) {
        items[i].style.right = `${position}px`
    }
}

function prev() {
    if (position - width < 0) {
        position = totalWidth
    } else {
        position = position - width
    }
    for (let i = 0; i < items.length; i++) {
        items[i].style.right = `${position}px`
    }
}

function pointsColor() {
    pointNumber = position / width
    for (let i = 0; i < points.length; i++) {
        if (i === pointNumber) {
            points[i].classList.add(`active`)
        } else {
            points[i].classList.remove(`active`)
        }
    }
}

function createPoints() {
    for (let i = 0; i < items.length; i++) {
        const div = document.createElement(`div`)
        div.className = `rezults__slider-point`
        pointsContainer.append(div)
    }
}
//  real man slider points

