import Ember from "ember";
import layout from "../templates/components/modal-wrapper";
import InboundActions from "ember-component-inbound-actions/inbound-actions";
const {keys, create} = Object; // jshint ignore:line
const {computed, observer, $, run, on, typeOf, debug, isPresent} = Ember;  // jshint ignore:line
const {defineProperty, get, set, inject, isEmpty, merge} = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Component.extend(InboundActions, {

  //region properties
  /**
   * @type {ModalInstance}
   */
  instance: undefined,

  layout: layout,

  _sendReject: true,

  /**
   * Possible values = ['closed', 'open', null|undefined];
   *
   * @property
   * @type {String}
   */
  state: null,

  //region computed
  defaultKeyboardValue: true,
  defaultBackdropValue: true,
  defaultSizeValue: 'modal-lg',

  isClosed: Ember.computed('state', function () {
    return 'closed' === this.get('state');
  }),

  isOpen: Ember.computed('state', function () {
    return 'open' === this.get('state');
  }),

  modalSize: Ember.computed('instance', function () {
    return Ember.getWithDefault(this.get('instance.target') || {}, 'size', this.get('defaultSizeValue'));
  }),

  backdrop: Ember.computed('instance', 'instance.target', 'instance.target.backdrop', 'defaultBackdropValue', function () {
    return Ember.getWithDefault(this.get('instance.target') || {}, 'backdrop', this.get('defaultBackdropValue'));
  }),

  keyboard: Ember.computed('instance', 'instance.target', 'instance.target.keyboard', 'defaultKeyboardValue', function () {
    return Ember.getWithDefault(this.get('instance.target') || {}, 'keyboard', this.get('defaultKeyboardValue'));
  }),
  //endregion

  //endregion

  show: on('didInsertElement', function () {
    let $el = this.$('.modal');

    $el.modal({
      keyboard: this.get('keyboard'),
      backdrop: this.get('backdrop')
    });


    $el.on('shown.bs.modal', () => {
      this.set('state', 'open');
    });

    $el.on('hidden.bs.modal', this.actions.closeModalReject.bind(this, 'visible'));
  }),

  close: function () {
    if (this.get('isDestroyed') || this.get('isDestroying') || this.get('isClosed')) {
      return;
    }

    this.set('state', 'closed');

    let $modal = this.$('.modal');

    if ($modal) {
      $modal.modal('hide');
    }
  },

  actions: {
    closeModalResolve: function (result) {
      if (this.get('isDestroyed') || this.get('isDestroying') || this.get('isClosed')) {
        return;
      }

      this.close();
      this.sendAction('onCloseResolve', this.get('modal'), result);
    },

    closeModalReject: function (result) {
      if (this.get('isDestroyed') || this.get('isDestroying') || this.get('isClosed')) {
        return;
      }

      this.close();
      this.sendAction('onCloseReject', this.get('modal'), result);
    }
  }
});
