import Ember from 'ember';

export const classNameIdentifier =  'textarea-with-emoji';

export default Ember.Component.extend({
  classNames: [ classNameIdentifier, 'chat-input'],
  attributeBindings: [ 'contenteditable'],
  contenteditable: true,

  filter: '',

  users: [
    {
      name: 'Ashley White',
      username: "ashley"
    }, {
      name: 'Vila Thomson',
      username: "roger"
    }, {
      name: 'Freck Fart',
      username: "frecklefart123"
    }
  ],

  input() {
    this.set('filter', this.element.innerText);
    this.addObserver('filter', this.mentionsUsers);
  },

  mentionsUsers: Ember.observer('filter', function() {
    if (this.get('filter') !== '') {

      let lastWord = this.get('filter').split(/ |\u00A0/).get('lastObject');
      if (lastWord === '') {
        let lengthOflastWord = this.get('filter').split(/ |\u00A0/).get('length');
        lastWord = this.get('filter').split(/ |\u00A0/).get(lengthOflastWord - 2);
      }

      if (lastWord.substr(0, 1) === '@') {

        var regexForUserName = /(^|\s)\@\w*/;
        if(regexForUserName.test(lastWord)) {
          let findName = lastWord.substr(1);
          var users =  this.get('users').filter((user) => {
            return (user.username.toLowerCase().indexOf(findName.toLowerCase()) === 0);
          });

          this.send('setMentionsUser', users);
        }

      } else {

        var regexForName = /[A-Z]\w*/;
        if(regexForName.test(lastWord)) {
          let findName = lastWord;
          var users =  this.get('users').filter((user) => {
            var names = user.name.toLowerCase().split(' ');
            return names.reduce((memo, n) => {
              return (memo || n.indexOf(findName.toLowerCase()) === 0);
            }, false);
          });

          this.send('setMentionsUser', users);
        }

      }
    } else {
      this.send('setMentionsUser', []);
    }

  }),

  willDestroyElement() {
    this._super(...arguments);
    this.removeObserver('filter', this.mentionsUsers);
  },

  actions: {
    setMentionsUser(arrayOfUsers) {
      this.get('setMentionsUser')(arrayOfUsers);
    }
  }
});
