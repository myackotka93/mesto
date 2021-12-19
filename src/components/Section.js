export class Section {
    constructor  (containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.append(element);
    }

    preAddItem(element) {
        this._container.prepend(element);
    }
}