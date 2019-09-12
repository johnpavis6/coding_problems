let app = angular.module('myApp', []);
let API_KEY = "5d79f19abdaac80423d2c72d";
function getSettings(method = "GET", ID, jsondata = {}) {
    return {
        "async": true,
        "crossDomain": true,
        "url": `https://sangamproblems-1bf5.restdb.io/rest/problems${ID ? `/${ID}` : ''}`,
        "method": method,
        "headers": {
            "content-type": "application/json",
            "x-apikey": API_KEY,
            "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata)
    }
}
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
        $http(getSettings()).then(function (resp) {
            $scope.problems = resp.data || [];
        }).catch(function (err) { });
    }
    $scope.getProblems();
    $scope.createProblem = function () {
        $http(getSettings("POST", null, $scope.payload)).then(function (resp) {
            PNotify.success("Added successfully");
            $scope.payload._id = resp.data._id;
            $scope.problems.push(Object.assign({}, $scope.payload));
            $('.close').click();
        }).catch(function (err) {
            PNotify.error(err.message);
        });
    }
    $scope.updateProblem = function () {
        $http(getSettings("PUT", $scope.payload._id, $scope.payload)).then(function (resp) {
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
        $http(getSettings("DELETE", _id)).then(function (resp) {
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
    $('.chosen-select').chosen({ width: "100%", allow_single_deselect: true });
});