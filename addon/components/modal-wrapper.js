import Ember from "ember";
import layout from "../templates/components/modal-wrapper";
import InboundActions from 'ember-component-inbound-actions/inbound-actions';
const {keys, create} = Object; // jshint ignore:line
const {computed, observer, $, run, on, typeOf, debug, isPresent} = Ember;  // jshint ignore:line
const {defineProperty, get, set, inject, isEmpty, merge} = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Component.extend(InboundActions, {

  /**
   * @type {ModalInstance}
   */
  instance: undefined,

  modalSize: Ember.computed('instance', function() {
    return this.get('instance.target.size') || 'modal-lg';
  }),

  layout: layout,

  _sendReject: true,

  show: on('didInsertElement', function () {
    this.$('.modal').modal();
  }),

  close: function () {
    this.$('.modal').modal('hide');
  },

  actions: {
    closeModalResolve: function (result) {
      this.close();
      this.sendAction('onCloseResolve', this.get('modal'), result);
    },

    closeModalReject: function (result) {
      this.close();
      this.sendAction('onCloseReject', this.get('modal'), result);
    }
  }
});
