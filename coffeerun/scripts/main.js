(function (window) {
  'use strict'
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;
  var remoteDS = new RemoteDataStore(SERVER_URL);
  // var myTruck = new Truck('ncc-1701', remoteDS);
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var checklist = new CheckList(CHECKLIST_SELECTOR);
  checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR);
  formHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function () {
        checklist.addRow.call(checklist, data);
      },
      function () {
        alert('Server unreachable. Try again later.')
      });
  });
  formHandler.addInputHandler(Validation.isCompanyEmail);
  myTruck.printOrders(checklist.addRow.bind(checklist));
  formHandler.addInputHandler(Validation.isDecaf);
})(window);
