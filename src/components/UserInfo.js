export class UserInfo {
  constructor (selectorUserName, selectorUserProf, avatar) {
    this._id = -1;
    this._name = '';
    this._about = '';
    this._avatar = '';
    this._user = document.querySelector(selectorUserName);
    this._prof = document.querySelector(selectorUserProf);
    this._avatarImg = document.querySelector(avatar);
  }

  get id() {
      return this._id;
  }

  getUserInfo() {
    return {
      name: this._user.textContent, 
      prof: this._prof.textContent,            
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

    this._user.textContent = this._name;
    this._prof.textContent = this._about;
    this.updateAvatar(this._avatar);
  }
}