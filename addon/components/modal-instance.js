import Ember from 'ember';
import layout from '../templates/components/modal-instance';
import InboundActions from 'ember-component-inbound-actions/inbound-actions';

/**
 * @class ModalInstance
 */
export default Ember.Component.extend(InboundActions, {

  size: 'modal-lg',

  layout: layout,

  modalWrapper:null,

  model:null,

  closeResolve:function(result){
  	this.sendAction('onCloseResolve', result);
  },

  closeReject:function(result){
  	this.sendAction('onCloseReject', result);
  },

  actions:{
    closeResolve:function(res){
      this.closeResolve(res);
    },
    closeReject:function(res){
      this.closeReject(res);
    },
  }
});
