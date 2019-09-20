let app = angular.module('myApp', []);
PNotify.defaults.styling = 'bootstrap4';
app.controller('myCtrl', function ($scope, $http) {
    $scope.payload = { Category: "Easy" };
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
});