export class User {
    constructor (
        public id: string,
        public email: string,
        public name: string,
        public surname: string,
        public localId: string,
        private _token: string,
        private _tokenExpirationDate: Date,
    ) {  }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        } else {
            return this._token;
        }
    }
}