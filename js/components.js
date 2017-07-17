ko.components.register('list', {
    viewModel: function(params) {
        if(!params) return;
        this.list = ko.observable(params.values || []);
    },
    template: `
        <ul data-bind="foreach: list">
            <li class="list-item">
                <input type="checkbox" class="checkbox" data-bind="attr: { checked: $data.checked, id: $data.id }">
                <label class="label-checkbox" data-bind="text: $data.value, attr: { for: $data.id }"></label>
            </li>
        </ul>
    `
});

ko.components.register('material-button', {
    viewModel: function(params) {
        if(!params) return;
        this.click = params.click;
        this.text = params.text || "";
        this.disabled = params.disabled;
        this.backgroundColor = params.backgroundColor;
    },
    template: `
        <button class="material-btn" data-bind="click: click, text: text, style: { backgroundColor: backgroundColor }, attr: { disabled }"></button>
        <style>
            .material-btn {
                width: 100%;
                color: white;
                height: 40px;
                border: none;
                cursor: pointer;
                position: relative;
                text-align: center;
            }
        </style>
    `
});

ko.components.register('modal', {
    viewModel: function(params) {
        if(!params) return;
        this.visible = params.visible;
        this.title = params.title;
        this.inputs = params.inputs || [];
        this.clickEvent = params.clickEvent;
        this.buttonText = params.buttonText;
        this.buttonDisabled = params.buttonDisabled || false;
        this.buttonBackground = params.buttonBackground;
    },
    template: `
        <!-- ko if: visible -->
            <div class="modal-overlay">
                <div class="modal-container">
                    <span class="modal-title" data-bind="text: title"></span>
                    <!-- ko foreach: inputs -->
                        <label data-bind="text: $data.label, attr: { for: 'modal-' + (($data.name) ? $data.name : $index()) }" class="modal-input-label"></label>
                        <div class="modal-input-block">
                            <input data-bind="
                                value: ($data.defaultValue) ? $data.defaultValue : '',
                                valueUpdate: 'afterkeydown',
                                attr: { 
                                    id: 'modal-' + (($data.name) ? $data.name : $index()),
                                    name: ($data.name) ? $data.name : '',
                                    type: ($data.type) ? $data.type : 'text',
                                    placeholder: ($data.placeholder) ? $data.placeholder : '',
                                }" class="modal-input-block-el">
                            <!-- ko if: (!$data.type || $data.type == "text" || $data.type == "password") -->
                                <div class="modal-input-block-line"></div>
                            <!-- /ko -->
                        </div>
                    <!-- /ko -->
                    <material-button params="click: clickEvent, text: buttonText, backgroundColor: buttonBackground, disabled: buttonDisabled"></material-button>
                </div>
            </div>
        <!-- /ko -->
    `
})