/**
 * Created by maohao on 16/2/22.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, FormService) {
        // event handler declarations
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var userId = $scope.currentUser._id;

        function addForm(form) {
            FormService.createFormForUser(userId, form, function(response) {
                console.log(response);
                $scope.forms.push(form);
            })
        }

        var selectedFormIndex = -1;
        function updateForm(form) {
            FormService.update(form["_id"], form, function(response) {
                console.log(response);
                for(var i = 0; i < $scope.forms.length; i++){
                    if($scope.forms[i]['_id'] == formId){
                        $scope.forms[i] = form;
                        break;
                    }
                }
            })
        }

        function deleteForm(form) {
            FormService.deleteFormById(form["_id"], function(response) {
                console.log(response);
                $scope.forms = response;
            })
        }

        function selectForm(form) {
            selectedFormIndex = $scope.forms.indexOf(form);
            console.log(form);
            $scope.form = form;
        }
    }
})();