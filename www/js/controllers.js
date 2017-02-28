angular.module('starter.controllers', [])

.controller('CharCtrl', function ($scope, $localStorage) {
    $scope.$storage = $localStorage.$default({
        Name: "Rob Robinsion",
        Race: "Human",
        Alignment: "chaotic Neutral",
        Class: "fighter",
        Level: 1,
        Strength: 6,
        Dexterity: 6,
        Constitution: 6,
        Intelligence: 6,
        Wisdom: 6,
        Charisma: 6
    });
})

.controller('CombatCtrl', function ($scope, $localStorage) {
    $scope.$storage = $localStorage.$default({
        HP: 1,
        AC: 1,
        Initiative: 1,
        Fortitude: 1,
         Reflex: 1,
        Will: 1,
        Grapple: 1,
        BaseAttack: 1,
        Weapon: "Longsword",
        AttackBonus: "0",
        Damage: "1d2",
        Critical: "19-20",
        Range: "0",
        Type: "slashing",
        Notes: " "
    });
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
