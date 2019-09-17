let app = angular.module('myApp', []);
PNotify.defaults.styling = 'bootstrap4';
app.controller('myCtrl', function ($scope, $http) {
    $scope.payload = { Category: "Easy" };
    $scope.modalFor = 0;
    $scope.formFields = fields;
    $scope.problems = [];
    $scope.currShowCard = -1;
    $scope.filterFields = {};
    fields.forEach(function (o) { $scope.filterFields[o] = ""; })
    $scope.getProblems = function () {
        $http({ url: '/api/v1/problems', method: 'get' }).then(function (resp) {
            $scope.problems = resp.data.results || [];
        }).catch(function (err) { });
    }
    $scope.getProblems();
    $scope.createProblem = function () {
        $http({ url: '/api/v1/problems', method: 'post', data: $scope.payload }).then(function (resp) {
            PNotify.success("Added successfully");
            $scope.payload._id = resp.data._id;
            $scope.problems.push(Object.assign({}, $scope.payload));
            $('.close').click();
        }).catch(function (err) {
            PNotify.error(err.message);
        });
    }
    $scope.updateProblem = function () {
        $http({ url: '/api/v1/problems/' + $scope.payload._id, method: 'put', data: $scope.payload }).then(function (resp) {
            PNotify.success("Updated successfully");
            for (let i = 0; i < $scope.problems.length; i++) {
                if ($scope.problems[i]._id == $scope.payload._id) {
                    $scope.problems[i] = $scope.payload;
                    break;
                }
            }
            $('.close').click();
        }).catch(function (err) {
            PNotify.error(err.message);
        });
    }
    $scope.removeProblem = function (_id) {
        if (!confirm("Are you sure?")) return;
        $http({ url: '/api/v1/problems/' + _id, method: 'delete' }).then(function (resp) {
            for (let i = 0; i < $scope.problems.length; i++) {
                if ($scope.problems[i]._id == _id) {
                    $scope.problems.splice(i, 1);
                    // $scope.problems = $scope.problems;
                    break;
                }
            }
            PNotify.success("Deleted successfully");
        }).catch(function (err) {
            PNotify.error(err.message);
        });
    }
    $scope.updateModalFor = function (obj) {
        if (obj) {
            $scope.modalFor = 2;
            $scope.payload = Object.assign({}, obj);
            delete $scope.payload.$$hashKey;
        }
        else {
            $scope.modalFor = 1;
            $scope.payload = {};
        }
        setTimeout(() => { $('.chosen-select').trigger('chosen:updated'); }, 0);
    }
    $scope.submitProblem = function () {
        switch ($scope.modalFor) {
            case 1: return $scope.createProblem();
            case 2: return $scope.updateProblem();
        }
    }
    $scope.toggleCurrShowCard = function (ind) {
        if (ind == $scope.currShowCard) ind = -1;
        $scope.currShowCard = ind;
    }
    $scope.getFilteredProblems = function () {
        let arr = [], { problems, filterFields } = $scope;
        problems.forEach(o => {
            let flag = true;
            for (let key in filterFields) {
                let findOn = filterFields[key];
                if (findOn.length && o[key].toLowerCase().search(findOn.toLowerCase()) < 0) {
                    flag = false;
                    break;
                }
            }
            if (flag) arr.push(o);
        });
        return arr;
    }
});
$(document).ready(function () {
    $("#loader").hide();
    $("#main-body").fadeIn(500);
    $('.chosen-select').chosen({ width: "100%", allow_single_deselect: true });
});