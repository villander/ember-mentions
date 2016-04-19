import Ember from 'ember';

export default Ember.Component.extend({

	didInsertElement() {
    this._super(...arguments);
    let firstElement = this.$('ul.mentions-list > li').first();
    firstElement.addClass('select');
  },

  selectUserInMentionList(element) {
    element.addClass('select');
  },

  unSelectUserInMentionList(element) {
    element.removeClass('select');
  },

  toggleActiveClass: Ember.observer('keyDownToMentions', function() {
    let keyCode = this.get('keyCode');
    let element = this.$('ul.mentions-list > li.select');
    if (keyCode === 38) { //up
       this.unSelectUserInMentionList(element);
      if (element.prev().length == 0) {
        element.siblings().last().addClass('select');
      } else {
        element.prev().addClass('select');
      }
    } else if (keyCode === 40) { //down
       this.unSelectUserInMentionList(element);
      if (element.next().length == 0) {
        element.siblings().first().addClass('select');
      } else {
        element.next().addClass('select');
      }
    } else if (keyCode === 13) { //enter
      let user = this.get('users').findBy('username', element.find('h4.user-info-username').text());
      this.send('selectMention', user);
    }
  }),

  actions: {
  	selectMention(user) {
  		console.log(user.username);
  	}
  }
  
});
