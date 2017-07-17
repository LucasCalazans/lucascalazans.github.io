document.addEventListener("DOMContentLoaded", function() {
    var vm = {
        values: ko.observableArray([]),
        email: ko.observable(""),
        password: ko.observable(""),
        modal: {
            visible: ko.observable(true),
            title: "Antes de continuar...",
            buttonText: ko.observable('LOGIN'),
            buttonBackground: ko.observable('#426fc5'),
            buttonDisabled: ko.observable(false)
        },
        groupModal: {
            visible: ko.observable(true),
            title: "Escolha o grupo:",
            groups: ko.observableArray([])
        },
        firebaseData: null
    };

    vm.modal.inputs = [
        { label: "Login", name: "login", placeholder: "Informe o seu email", defaultValue: vm.email },
        { label: "Password", name: "password", type: "password", placeholder: "Informe sua senha", defaultValue: vm.password },
    ],

    vm.init = function() {
        var todoRef = firebase.database().ref('/');
        todoRef.on('value', function(snapshot) {
            vm.firebaseData = snapshot.val();

            var groups = Object.keys(vm.firebaseData);
            for(var i = 0, len = groups.length; i < len; i++) {
                vm.groupModal.groups.push(groups[i]);
            }
        });
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            vm.modal.visible(false);
            vm.init();
        } else {
            vm.modal.visible(true);
        }
    });


    // firebase.auth().signOut();
    vm.modal.authenticate = function() {
        vm.modal.buttonDisabled(true);
        vm.modal.buttonBackground('#DDDDDD');
        firebase.auth().signInWithEmailAndPassword(vm.email(), vm.password()).then(function(user) {
            vm.modal.buttonDisabled(false);
            vm.modal.buttonBackground('#426FC5');
        }).catch(function(error) {
            vm.modal.buttonDisabled(false);
            vm.modal.buttonBackground('#426FC5');
        });
    };

    ko.applyBindings(vm, document.getElementById("app"));
});