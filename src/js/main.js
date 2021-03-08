
window.onload = function () {
// when page resize - reload
    window.addEventListener(`resize`, () => {
        setTimeout(() => {
            document.location.reload()
        }, 1000)
    })

    // burger + header scroll
    const burger = document.querySelector(`.header__nav`)
    const menu = document.querySelector(`.header__menu`)
    const header = document.querySelector(`.header`)
    const headerLinks = document.querySelectorAll(`.header__menu-list-link`)
    const headerLogo = document.querySelector(`.header__logo`)

    // padding body when scroll off
    const paddingScroll = window.innerWidth - document.body.clientWidth


    window.addEventListener(`scroll`, () => {
        header.style.opacity = `0.85`
    })

    headerLogo.addEventListener(`click`, () => {
        window.scrollTo({
            top: 0,
            behavior: `smooth`
        })
        if (menu.style.display === `block`) {
            setTimeout(() => {
                menu.style.display = `none`
            }, 1000)
            menu.classList.toggle(`animate_menu`)
            document.body.style.overflow = `auto`
            document.body.style.paddingRight = `0px`
            burger.classList.toggle(`change`)
        }
    })

    burger.addEventListener(`click`, toggleMenu)
    menu.addEventListener(`click`, toggleMenu)

    function scrollToLink() {
        for (let i = 0; i < headerLinks.length; i++) {
            headerLinks[i].addEventListener(`click`, (e) => {
                e.preventDefault()
                const href = e.target.getAttribute(`href`).substring(1)
                const scrollTarget = document.getElementById(href)
                const topOffset = header.offsetHeight
                const elementPosition = scrollTarget.getBoundingClientRect().top
                const offsetPosition = elementPosition - topOffset

                window.scrollBy({
                    top: offsetPosition,
                    behavior: `smooth`
                })

            })
        }
    }

    function toggleMenu() {
        burger.classList.toggle(`change`)
        if (menu.style.display === `block`) {
            setTimeout(() => {
                menu.style.display = `none`
            }, 1000)
            menu.classList.toggle(`animate_menu`)
            document.body.style.overflow = `auto`
            document.body.style.paddingRight = `0px`
        } else {
            menu.style.display = `block`
            setTimeout(() => {
                menu.classList.toggle(`animate_menu`)
            }, 50)

            scrollToLink()

            document.body.style.overflow = `hidden`
            document.body.style.paddingRight = `${paddingScroll}px`
        }
    }

    //  real-man slider

    const nextBtn = document.querySelector(`.rezults__slider-nextArrow`)
    const prevBtn = document.querySelector(`.rezults__slider-prevArrow`)
    const pointsContainer = document.querySelector(`.rezults__slider-points`)
    const itemsImageBefore = document.querySelectorAll(`.slider__img-before`)
    const itemsTextAfter = document.querySelectorAll(`.rezults__slider-text-after`)
    const items = document.querySelectorAll(`.rezults__slider-item`)
    const itemsImageAfter = document.querySelectorAll(`.slider__img-after`)

    const width = items[0].clientWidth
    const totalWidth = width * (items.length - 1)

    let pointNumber = 0
    let position = 0

    createPoints(items, `rezults__slider-point`, pointsContainer)

    const points = document.querySelectorAll(`.rezults__slider-point`)

    points[pointNumber].classList.add(`active`)
    itemsImageBefore[pointNumber].classList.add(`activ__item`)
    itemsTextAfter[pointNumber].classList.add(`activ__item-text`)
    itemsImageAfter[pointNumber].classList.add(`activ__item`)

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
                itemsImageAfter[i].classList.add(`activ__item`)
            } else {
                itemsImageBefore[i].classList.remove(`activ__item`)
                itemsTextAfter[i].classList.remove(`activ__item-text`)
                itemsImageAfter[i].classList.remove(`activ__item`)
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
    const testimonPointNumber = 0

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

    function timerBody() {
        testimonNext()
        pointsColor(testimonPointNumber, testimonPosition, testimonWidth, testimonPoints)
    }

    let timerId = setInterval(timerBody, 5000)

    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener(`pointerenter`, () => {
            clearInterval(timerId)
        })
        testimonialsItem[i].addEventListener(`pointerleave`, () => {
            timerBody()
            timerId = setInterval(timerBody, 5000)
        })
    }

    // List tabs for facts block

    const listItem = document.querySelectorAll(`.facts__list-item`)
    const descriptionsFacts = document.querySelectorAll(`.facts__description`)
    const startPosition = 1

    listItem[startPosition].classList.add(`activ__item`)
    descriptionsFacts[startPosition].classList.add(`activ__description`)
    descriptionsFacts[startPosition].classList.add(`activ__description-animation`)

    for (let i = 0; i < listItem.length; i++) {
        listItem[i].addEventListener(`click`, () => {
            for (let j = 0; j < listItem.length; j++) {
                if (listItem[j].classList.contains(`activ__item`)) {
                    listItem[j].classList.remove(`activ__item`)
                }
                if (descriptionsFacts[j].classList.contains(`activ__description`)) {
                    descriptionsFacts[j].classList.remove(`activ__description`)
                }
                if (descriptionsFacts[j].classList.contains(`activ__description-animation`)) {
                    descriptionsFacts[j].classList.remove(`activ__description-animation`)
                }
            }
            listItem[i].classList.add(`activ__item`)
            descriptionsFacts[i].classList.add(`activ__description`)
            setTimeout(() => {
                descriptionsFacts[i].classList.add(`activ__description-animation`)
            }, 50)
        })
    }
}
