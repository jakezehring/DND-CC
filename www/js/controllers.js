angular.module('starter.controllers', [])

.controller('TabsCtrl', function ($scope, $localStorage, $ionicSideMenuDelegate) {
    $scope.$storage = $localStorage
 
    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.characters = [];
    for (cur = 0; cur < $scope.$storage.length; cur++)
        $scope.characters.push($scope.$storage.characters[cur].Name)

    $scope.goToChar = function (place) {
        $scope.cur = place;
        $state.go('tab.char')
    }
  
})

    .controller('NewCtrl', function ($scope, $state, $localStorage) {
        $scope.$storage = $localStorage

        $scope.input = {
            name: ""
        }

        $scope.startApp = function () {
            var character = {
                Name: $scope.input.name,
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
            }
            $scope.$storage.characters.push(character);
            $scope.$storage.length = $scope.$storage.length + 1;
            $scope.$storage.cur = $scope.$storage.length - 1;
            $scope.$storage.update = 1;
            $state.go('tab.char');

        }
    })

.controller('CharCtrl', function ($scope, $state, $localStorage, $ionicSideMenuDelegate, $window) {
    $scope.$storage = $localStorage.$default({
        characters: [],
        length: 0,
        cur: 0,
        update: 0
    })

    //$localStorage.$reset();

    $scope.cur = $scope.$storage.cur;

        if ($scope.$storage.characters[$scope.cur] === undefined)
            $state.go('new');
        
        $scope.$on('$ionicView.beforeEnter', function () {
            if ($scope.$storage.update == 1) {
                $scope.$storage.update = 0
                $window.location.reload(true);
            }
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
    '$state', '$scope', '$ionicPopup', '$localStorage',
  function ($state, $scope, $ionicPopup, $localStorage) {
      $scope.$storage = $localStorage.$default({
          abil: [],
          feats: [],
          spells: []
      });
        
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
            if (res) {
                console.log(res);
                if(res.type == 1){
                    $scope.$storage.spells.push(res);
                } else if(res.type==2){
                    $scope.$storage.feats.push(res);
                } else if(res.type==3){
                    $scope.$storage.abil.push(res);
                }
            }
        });
    };
}])

 .controller('InventoryCtrl', [
        '$state', '$scope', '$ionicPopup', '$localStorage',
   function ($state, $scope, $ionicPopup, $localStorage) {
       $scope.$storage = $localStorage.$default({
           Gold: 0,
           Silver: 0,
           Copper: 0,
           Items: [],
           Gear: []
       })


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
                       $scope.$storage.Items.push(res);
                   } else if (res.type == 2) {
                       $scope.$storage.Gear.push(res);
                   }
               }
           });
       };
   }]
);
