import Ember from 'ember';

const [ ENTER_KEY, ESC_KEY, LEFT_KEY, UP_KEY, DOWN_KEY, RIGHT_KEY ] = [ 13, 27, 37, 38, 40, 39 ];

export default Ember.Component.extend({
  users: [],
  actions : {
    setMentionsUser(arrayOfUsers) {
      this.set('users', arrayOfUsers);
    },
    onKeyDown(event) {
    	let hasMentionsAndEnter = this.get('users.length') && event.keyCode === ENTER_KEY ? true: false;
    	if (event.keyCode === UP_KEY || event.keyCode === DOWN_KEY || hasMentionsAndEnter) {
        this.toggleProperty('triggerActionOnMentionsList');
        this.set('keyCode', event.keyCode);
        event.preventDefault();
      }
	  }
  }

});
