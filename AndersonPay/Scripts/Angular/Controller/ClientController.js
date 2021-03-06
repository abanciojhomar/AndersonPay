﻿(function () {
    'use strict';

    angular
        .module('App')
        .controller('ClientController', ClientController);

    ClientController.$inject = ['$window', 'ClientService'];

    function ClientController($window, ClientService) {
        var vm = this;

        vm.Clients;

        vm.GoToUpdatePage = GoToUpdatePage;
        vm.Initialise = Initialise;

        vm.Delete = Delete;


        function GoToUpdatePage(clientId) {
            $window.location.href = '../Client/Update/' + clientId;
        }

        function Initialise() {
            Read();
        }

        function Read() {
            ClientService.Read()
                .then(function (response) {
                    vm.Clients = response.data;
                })
                .catch(function (data, status) {
                    new PNotify({
                        title: status,
                        text: data,
                        type: 'error',
                        hide: true,
                        addclass: "stack-bottomright"
                    });

                });
        }

        function Delete(client) {
            ClientService.Delete(client)
                .then(function (response) {
                    Read();
                })
                .catch(function (data, status) {
                    

                });
        }

    }
})();