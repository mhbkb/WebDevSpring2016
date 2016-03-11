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
        FormService
            .findAllFormsForUser(userId)
            .then(function(response) {
                $scope.forms = response.data;
            })

        function addForm(form) {
            FormService
                .createFormForUser(userId, form)
                .then(function(response) {
                    $scope.forms.push(form);
                    $scope.form = null;
                });
        }

        var selectedFormIndex = -1;
        function updateForm(form) {
            FormService
                .updateFormById(form["_id"], form)
                .then(function(response) {
                    for(var i = 0; i < $scope.forms.length; i++){
                        if($scope.forms[i]['_id'] == form["_id"]){
                            $scope.forms[i] = form;
                            $scope.form = null;
                            break;
                        }
                    }
                })
        }

        function deleteForm(form) {
            FormService
                .deleteFormById(form["_id"])
                .then(function(response1) {
                    FormService.findAllFormsForUser(userId)
                               .then(function(response2) {
                                    $scope.forms = response2.data;
                                })
                })
        }

        function selectForm(form) {
            selectedFormIndex = $scope.forms.indexOf(form);
            console.log(form);
            $scope.form = form;
        }
    }
})();