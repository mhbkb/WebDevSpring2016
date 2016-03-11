/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, FieldService) {
        // event handler declarations
        $scope.addField = addField;
        $scope.deleteField = deleteField;

        var formId = $routeParams.formId;
        var fieldMap = {'TEXT': {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"},
            'TEXTAREA': {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"},
            'DATE': {"_id": null, "label": "New Date Field", "type": "DATE"},
            'OPTIONS': {"_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                {"label": "Option 1", "value": "OPTION_1"},
                {"label": "Option 2", "value": "OPTION_2"},
                {"label": "Option 3", "value": "OPTION_3"}
            ]},
            'CHECKBOXES': {"_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                {"label": "Option A", "value": "OPTION_A"},
                {"label": "Option B", "value": "OPTION_B"},
                {"label": "Option C", "value": "OPTION_C"}
            ]},
            'RADIOS': {"_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                {"label": "Option X", "value": "OPTION_X"},
                {"label": "Option Y", "value": "OPTION_Y"},
                {"label": "Option Z", "value": "OPTION_Z"}
            ]}
        };

        FieldService
            .getFieldsForForm(formId)
            .then(function(response) {
                $scope.fields = response.data;
            })

        function addField(fieldType) {
            var field = fieldMap[fieldType];

            FieldService
                .createFieldForForm(formId, field)
                .then(function(response) {
                    $scope.fields.push(field);
                });
        }

        function deleteField(field) {
            FieldService
                .deleteFieldFromForm(formId, field.id)
                .then(function(response1) {
                    FieldService.getFieldsForForm(formId)
                        .then(function(response2) {
                            $scope.fields = response2.data;
                        })
                })
        }
    }
})();