import Ember from 'ember';

export default Ember.Component.extend({
  mentionsUser: [],
  users: Ember.computed('mentionsUser', function() {
    return this.get('mentionsUser');
  }),
  actions : {
    setMentionsUser(arrayOfUsers) {
      this.set('mentionsUser', arrayOfUsers);
    }
  }

});
