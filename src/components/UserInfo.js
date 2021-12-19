export class UserInfo {
    constructor (selectorUserName, selectorUserProf, avatar) {
        this._id = -1;
        this._name = '';
        this._about = '';
        this._avatar = '';
        this._selectorUser = document.querySelector(selectorUserName);
        this._selectorProf = document.querySelector(selectorUserProf);
        this._avatarImg = document.querySelector(avatar);
    }

    get id() {
        return this._id;
    }

    getUserInfo() {
        return {
            name: this._selectorUser.textContent, 
            prof: this._selectorProf.textContent,            
        }
    }

    updateAvatar(avatar) {
        this._avatar = avatar;

        this._avatarImg.src = this._avatar;
        this._avatarImg.alt = "Тут должен быть аватар пользователя";

    }

    setUserInfo(data) {
        this._id = data._id;
        this._name = data.name;
        this._about = data.about;
        this._avatar = data.avatar;

        this._selectorUser.textContent = this._name;
        this._selectorProf.textContent = this._about;
        this.updateAvatar(this._avatar);
    }
}