document.addEventListener("DOMContentLoaded", function() {

    function viewModel() {
        this.test = "Test";
        this.classes = {class1: true, class2: false};
        this.firstName = ko.observable('Lucas');
        this.lastName = ko.observable('Calazans');
        this.personAge = ko.observable(22);

        // this.fullName = ko.pureComputed(function() {
        //     return this.firstName() + " " + this.lastName();
        // }, this);
        this.fullName = ko.pureComputed({
            read: function() {
                return this.firstName() + " " + this.lastName();
            },
            write: function(value) {
                var lastSpacePos = value.lastIndexOf(" ");
                if (lastSpacePos > 0) { // Ignore values with no space character
                    this.firstName(value.substring(0, lastSpacePos)); // Update "firstName"
                    this.lastName(value.substring(lastSpacePos + 1)); // Update "lastName"
                }
                console.log(value);
            },
            owner: this
        });

        this.myObservableArray = ko.observableArray(); // Initially an empty array
        this.selectedIndex = ko.observable();

        this.myObservableArray.push('Some value'); // Adds the value and notifies observers
        this.myObservableArray.push('Some value 4');
        this.myObservableArray.push('Some value 2');
        this.myObservableArray.push('Some value 3');
        this.myObservableArray.unshift('New value 1');
        this.myObservableArray.unshift('New value 2');
        // this.myObservableArray.pop(); // Remove the last item of array
        // this.myObservableArray.shift(); // Remove the first item of array

        this.myObservableArray.remove(function(item) { // Remove all items that ends with '2'
            if(item.legnth <= 0) return false;
            var last = item.substr(item.length - 1, 1);
            return (+last == 2);
        });

        this.myObservableArray.removeAll(['Some value']); // Remove all items that are equals to same value of array

        this.myObservableArray.sort(function(left, right) { // Order by the last number
            if(left.length <= 0) return -1;
            if(right.length <= 0) return 1;

            var last = +left.substr(left.length - 1, 1);
            var lastRight = +right.substr(right.length - 1, 1);
            if(!Number.isInteger(last)) return -1;
            if(!Number.isInteger(lastRight)) return 1;
            return (last == lastRight) ? 0 : (last < lastRight) ? -1 : 1;
        });
        console.log('The length of the array is ' + this.myObservableArray().length);

        // this.firstName.extend({ notify: 'always' });
        // this.firstName.extend({ rateLimit: 2000 });
        // this.myObservableArray.extend({ rateLimit: 2000 });

        var subcription = this.firstName.subscribe(function(newValue) {
            console.log("The person's new name is " + newValue);
        });

        this.selectedIndex.subscribe(function(newValue) {
            console.log("The selectedIndex is " + newValue);
        });

        this.firstName.subscribe(function(oldValue) {
            console.log("The person's previous name is " + oldValue);
        }, null, "beforeChange");

        // subscription.dispose(); // I no longer want notifications
    }

    ko.applyBindings(viewModel, document.getElementById("app"));
});