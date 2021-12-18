export class UserInfo  {
    constructor (selectorUserName, selectorUserProf) {
        this._selectorUser = document.querySelector(selectorUserName);
        this._selectorProf = document.querySelector(selectorUserProf);
    }

    getUserInfo() {
        return {
            name: this._selectorUser.textContent, 
            prof: this._selectorProf.textContent
        }
    }

    setUserInfo(name, prof) {        
        this._selectorUser.textContent = name;
        this._selectorProf.textContent = prof;
    }
}