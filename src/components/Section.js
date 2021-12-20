export class Section {
    constructor(containerSelector) {
        console.log(containerSelector);
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.append(element);
    }

    preAddItem(element) {
        this._container.prepend(element);
    }
}