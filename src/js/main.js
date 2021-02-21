//  real-man slider

const prevBtn = document.querySelector(`.rezults__slider-prevArrow`)
const nextBtn = document.querySelector(`.rezults__slider-nextArrow`)
const items = document.querySelectorAll(`.rezults__slider-item`)
const pointsContainer = document.querySelector(`.rezults__slider-points`)
const itemsImageBefore = document.querySelectorAll(`.slider__img-before`)
const itemsTextAfter = document.querySelectorAll(`.rezults__slider-text-after`)

let position = 0
const width = items[0].clientWidth
const totalWidth = width * (items.length - 1)
let pointNumber = 0

createPoints(items, `rezults__slider-point`, pointsContainer)

const points = document.querySelectorAll(`.rezults__slider-point`)
points[pointNumber].classList.add(`active`)
itemsImageBefore[pointNumber].classList.add(`activ__item`)
itemsTextAfter[pointNumber].classList.add(`activ__item-text`)

prevBtn.addEventListener(`click`, () => {
    prev()
    pointsColor(pointNumber, position, width, points)
    animatedItem()
})

nextBtn.addEventListener(`click`, () => {
    next()
    pointsColor(pointNumber, position, width, points)
    animatedItem()
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

function pointsColor(point, positionItem, widthItem, pointsCollection) {
    point = positionItem / widthItem
    for (let i = 0; i < pointsCollection.length; i++) {
        if (i === point) {
            pointsCollection[i].classList.add(`active`)
        } else {
            pointsCollection[i].classList.remove(`active`)
        }
    }
}

function animatedItem() {
    pointNumber = position / width
    for (let i = 0; i < itemsImageBefore.length; i++) {
        if (i === pointNumber) {
            itemsImageBefore[i].classList.add(`activ__item`)
            itemsTextAfter[i].classList.add(`activ__item-text`)
        } else {
            itemsImageBefore[i].classList.remove(`activ__item`)
            itemsTextAfter[i].classList.remove(`activ__item-text`)
        }
    }
}


function createPoints(htmlCollection, className, container) {
    for (let i = 0; i < htmlCollection.length; i++) {
        const div = document.createElement(`div`)
        div.className = className
        container.append(div)
    }
}

//  Testimonials slider

const testimonialsItem = document.querySelectorAll(`.testimonials__slider-item`)

let testimonPosition = 0
let testimonPointNumber = 0

const testimonWidth = testimonialsItem[0].clientWidth
const testimonTotalWidth = testimonWidth * (testimonialsItem.length - 1)
const testimonPointContainer = document.querySelector(`.testimonials__slider-points`)

createPoints(testimonialsItem, `testimonials__slider-point`, testimonPointContainer)


const testimonPoints = document.querySelectorAll(`.testimonials__slider-point`)
testimonPoints[testimonPointNumber].classList.add(`active`)


function testimonNext() {
    if (testimonPosition + testimonWidth > testimonTotalWidth) {
        testimonPosition = 0
    } else {
        testimonPosition = testimonPosition + testimonWidth
    }
    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].style.right = `${testimonPosition}px`
    }
}

let timer = setInterval(() => {
    testimonNext()
    pointsColor(testimonPointNumber, testimonPosition, testimonWidth, testimonPoints)
}, 5000)


for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener(`mouseenter`, () => {
        clearInterval(timer)
    })
    testimonialsItem[i].addEventListener(`pointerleave`, () => {
        testimonNext()
        pointsColor(testimonPointNumber, testimonPosition, testimonWidth, testimonPoints)
        timer = setInterval(() => {
            testimonNext()
            pointsColor(testimonPointNumber, testimonPosition, testimonWidth, testimonPoints)
        }, 5000)
    })

}

timer()
