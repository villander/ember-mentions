import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['textarea-with-emoji'],

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

  mentionsUsers: Ember.computed('filter', function() {
    if (this.get('filter') !== '') {

      let lastWord = this.get('filter').split(' ').get('lastObject');
      if (lastWord === '') {
        let lengthOflastWord = this.get('filter').split(' ').get('length');
        lastWord = this.get('filter').split(' ').get(lengthOflastWord - 2);
      }

      if (lastWord.substr(0, 1) === '@') {

        var regexForUserName = /(^|\s)\@\w*/;
        if(regexForUserName.test(lastWord)) {
          let findName = lastWord.substr(1);
          return this.get('users').filter((user) => {
            return (user.username.toLowerCase().indexOf(findName.toLowerCase()) === 0);
          });
        }

      } else {

        var regexForName = /[A-Z]\w*/;
        if(regexForName.test(lastWord)) {
          let findName = lastWord;
          return this.get('users').filter((user) => {
            var names = user.name.toLowerCase().split(' ');
            return names.reduce((memo, n) => {
              return (memo || n.indexOf(findName.toLowerCase()) === 0);
            }, false);
          });
        }

      }
    }

  })

});
