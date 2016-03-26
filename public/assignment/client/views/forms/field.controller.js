/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($scope, $routeParams, $uibModal, FieldService, FormService) {
        // event handler declarations
        var formId = $routeParams.formId;

        $scope.addField = addField;
        $scope.removeField = removeField;
        $scope.copyField = copyField;
        $scope.popField = popField;
        $scope.saveSortedFields = saveSortedFields;
        $scope.formId = formId;

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

        var newFields = new Array();
        for (var key in fieldMap) {
            newFields.push(fieldMap[key]);
        }
        $scope.newFields = newFields;

        FieldService
            .getFieldsForForm(formId)
            .then(function(response) {
                $scope.fields = response.data;
            })

        function addField(fieldType) {
            var field = fieldMap[fieldType];
            copyField(field);
        }

        function copyField(field) {
            FieldService
                .createFieldForForm(formId, field)
                .then(function(response) {
                    $scope.fields = response.data;
                });
        }

        function removeField(field) {
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(function(response1) {
                    FieldService.getFieldsForForm(formId)
                        .then(function(response2) {
                            $scope.fields = response2.data;
                        })
                })
        }

        function popField(field) {
            if(field.type === 'OPTIONS' || field.type === 'CHECKBOXES' || field.type === 'RADIOS') {
                var optionList = [];
                for(var i in field.options) {
                    optionList.push(field.options[i].label + ":" + field.options[i].value);
                }
                field.optionList = optionList;
            }

            $scope.field = field;

            $uibModal.open({
                animation: true,
                templateUrl: 'myModal',
                scope: $scope,
                controller: ModalInstanceCtrl
            });
        }

        function saveSortedFields() {
            FormService
                .findFormById(formId)
                .then(function(response) {
                    var form = response.data;
                    form.fields = $scope.fields;
                    FormService.updateFormById(formId, form);
                })
        }
    }

    angular.module('FormBuilderApp').controller('ModalInstanceCtrl', ModalInstanceCtrl);

    function ModalInstanceCtrl($scope, $uibModalInstance, FieldService) {

        $scope.updateField = function (field) {
            console.log($scope.formId);

            if(field.type === 'OPTIONS' || field.type === 'CHECKBOXES' || field.type === 'RADIOS') {
                var newOptions = [];
                for(var i in field.optionList) {
                    var newOption = field.optionList[i].split(":");
                    newOptions.push({
                        label: newOption[0],
                        value: newOption[1]
                    });
                }
                field.options = newOptions;
            }

            FieldService.updateField($scope.formId, field._id, field)
                .then(function(response) {
                    $scope.fields = response.data;
                })

            $uibModalInstance.close();
        };

        $scope.cancelModal = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();