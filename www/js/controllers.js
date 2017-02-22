angular.module('starter.controllers', [])

.controller('CharCtrl', function ($scope) {
   
})

.controller('CombatCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('AbilitiesCtrl', [ 
    '$state', '$scope', '$ionicPopup',
  function ($state, $scope, $ionicPopup){
    $scope.abil = [];
    $scope.feats = [];
    $scope.spells = []; 
        
    $scope.abiladd = function(type) {
        $scope.data = {type}
        var mypop =
        $ionicPopup.show({
            template: 'Title: <input type="text" ng-model="data.title"> <br> Description: <textarea name="desc" cols="40" rows="5" maxlength="200" ng-model="data.description" style="height: 130px; min-height:130px; max-height:130px;">',
            title: 'Add Ability',
            cssClass: 'addAbil',
            scope: $scope,
            buttons: [
            {text: 'Cancel' },
            {text: 'Save',
                type: 'button-positive',
                onTap: function(e) {
                    if((!$scope.data.title)||(!$scope.data.description)){
                        e.preventDefault();
                    } else{
                        return $scope.data;
                    }
                }
            },
            ]
        });
        mypop.then(function(res){
            if(res){
                if(res.type == 1){
                    $scope.spells.push(res);
                } else if(res.type==2){
                    $scope.feats.push(res);
                } else if(res.type==3){
                    $scope.abil.push(res);
                }
            }
        });
    };
}])

 .controller('InventoryCtrl', [
        '$state', '$scope', '$ionicPopup',
   function ($state, $scope, $ionicPopup){
       $scope.items = [];
       $scope.gear = [];


       $scope.shouldShowDelete = true;
       $scope.listCanSwipe = true;

       $scope.itemadd = function (type) {
           $scope.data = { type }
           var mypop =
           $ionicPopup.show({
               template: 'Title: <input type="text" ng-model="data.title"> <br> Description: <textarea name="desc" cols="40" rows="5" maxlength="200" ng-model="data.description" style="height: 130px; min-height:130px; max-height:130px;">',
               title: 'Add Item',
               cssClass: 'addAbil',
               scope: $scope,
               buttons: [
               { text: 'Cancel' },
               {
                   text: 'Save',
                   type: 'button-positive',
                   onTap: function (e) {
                       if ((!$scope.data.title) || (!$scope.data.description)) {
                           e.preventDefault();
                       } else {
                           return $scope.data;
                       }
                   }
               },
               ]
           });
           mypop.then(function (res) {
               if (res) {
                   if (res.type == 1) {
                       $scope.items.push(res);
                   } else if (res.type == 2) {
                       $scope.gear.push(res);
                   }
               }
           });
       };
   }]
);
