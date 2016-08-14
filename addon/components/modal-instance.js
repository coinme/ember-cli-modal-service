import Ember from "ember";
import layout from "../templates/components/modal-instance";
import InboundActions from "ember-component-inbound-actions/inbound-actions";

// function argumentsWith(firstArgument, array) {
//   var args = Array.prototype.slice.call(array);
//
//   args.unshift(firstArgument, array);
//
//   return args;
// }

/**
 * @class ModalInstance
 */
export default Ember.Component.extend(InboundActions, {

  size: 'modal-lg',

  layout: layout,

  modalWrapper: null,

  model: null,

  closeResolve(result) {
    this.sendAction('onCloseResolve', result);
  },

  closeReject(result) {
    this.sendAction('onCloseReject', result);
  },

  actions: {
    closeResolve(res) {
      this.closeResolve(res);
    },
    closeReject(res) {
      this.closeReject(res);
    },
  }
});
