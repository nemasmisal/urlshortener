const app = new Vue({
  el: '#app',
  data: function () {
    return {
      url: '',
      urlData: null,
      hash: '',
      hashInfo: '',
      error: null,
    };
  },
  created: async function () {
    try {
      const _res = await fetch('/url');
      const res = await _res.json();
      this.urlData = res;
    } catch (error) {
      this.showError(error.message ? error.message : error);
    }
  },
  methods: {
    async createHash() {
      const notAllowChars = new RegExp(/^' |' |^OR|--|' # --|^ /, 'gi');
      if (!this.url || notAllowChars.test(this.url)) {
        this.url = '';
        return this.showError('Character/s not allowed!');
      }
      try {
        const _res = await fetch('/url', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ url: this.url }),
        });
        this.url = '';
        const res = await _res.json();
        if (res.message) {
          return this.showError(res.message);
        }
        this.urlData = [...this.urlData, ...res];
      } catch (error) {
        return this.showError(error.message ? error.message : error);
      }
    },
    async getHashInfo() {
      const hashPattern = new RegExp(/^[A-Z0-9]{8}$/, 'i');
      if (!this.hash || !hashPattern.test(this.hash)) {
        this.hash = '';
        return this.showError('Wrong HASH format!');
      }
      try {
        const _res = await fetch('/url/' + this.hash);
        const res = await _res.json();
        this.hash = '';
        if (res.message) {
          return this.showError(res.message);
        }
        this.hashInfo = res;
      } catch (error) {
        return this.showError(error.message ? error.message : error);
      }
    },
    showError(msg) {
      this.error = msg;
      setTimeout(() => {
        this.error = null;
      }, 2000);
    },
  },
});
