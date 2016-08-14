import Ember from 'ember';
const { get, set, merge, on, RSVP } = Ember; // jshint ignore:line
const a = Ember.A; // jshint ignore:line

export default Ember.Service.extend({

	modals:null,

  initService:on('init', function(){
    set(this, 'modals', a());
  }),

  showModal:function(componentName, context){

    var defer = RSVP.defer();

    context = context || {};

    merge(context, {defer:defer});

    get(this, 'modals').pushObject({
      componentName:componentName,
      context:context
    });

    return defer.promise;
  },

  closeModalReject:function(result){
    var modal = get(this, 'modals').shiftObject();
    modal.context.defer.reject(result);
  },

  closeModalResolve:function(result){
    var modal = get(this, 'modals').shiftObject();
    modal.context.defer.resolve(result);
  }

});
