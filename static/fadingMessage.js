function createFadingModal(parentElementSelector, message, timer = 5) {
    const parentEle = document.querySelector(parentElementSelector);

    const newElement = document.createElement('div');
    newElement.innerHTML = message;
    newElement.classList.add('info');

    newElement.style.transition = `opacity ${timer}s ease-in-out`;
    newElement.style.opacity = 1;
    newElement.style.fontSize = '3rem';

    parentEle.appendChild(newElement);
    setTimeout(() => {
        newElement.style.opacity = 0
        setTimeout(() => parentEle.removeChild(newElement), timer * 1000)
    }, 0)


}

module.exports = createFadingModal;