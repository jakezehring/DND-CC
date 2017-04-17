angular.module('starter.controllers', [])

.controller('TabsCtrl', function ($scope, $state, $localStorage, $ionicSideMenuDelegate, $window) {
    $scope.$storage = $localStorage

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }
    $scope.characters = [];

    for (cur = 0; cur < $scope.$storage.length; cur++)
        $scope.characters.push($scope.$storage.characters[cur].tracker)

    $scope.goToChar = function (character) {
        var cur = character
        $scope.$storage.cur = cur;
        $ionicSideMenuDelegate.toggleLeft();
        $window.location.reload(true);
    }

    $scope.new = function () {
        $ionicSideMenuDelegate.toggleLeft();
        $state.go('new')
    }
})

    .controller('NewCtrl', function ($scope, $state, $localStorage) {
        $scope.$storage = $localStorage

        $scope.input = {
            name: ""
        }
        $scope.ruleset = "3.5"

        $scope.startApp = function (ruleset) {
            console.log($scope.name)
            if ($scope.input.name == "")
                alert("Please enter a name for your character")
            else {
                var character = {
                    Name: $scope.input.name,
                    Ruleset: ruleset,
                    Race: "Human",
                    Alignment: "chaotic Neutral",
                    Class: "fighter",
                    Level: 1,
                    Strength: 6,
                    Dexterity: 6,
                    Constitution: 6,
                    Intelligence: 6,
                    Wisdom: 6,
                    Charisma: 6,
                    Diety: "",
                    Exp: 0,
                    Traits: "",
                    Ideals: "",
                    Bonds: "",
                    Flaws: "",
                    tracker: $scope.$storage.length
                }
                $scope.$storage.characters.push(character);
                $scope.$storage.length = $scope.$storage.length + 1;
                $scope.$storage.cur = $scope.$storage.length - 1;
                var combat = {
                    HP: 1,
                    Max_hp: 10,
                    AC: 1,
                    Initiative: 1,
                    Fortitude: 1,
                    Reflex: 1,
                    Will: 1,
                    Exahustion: 0,
                    Inspiration: true,
                    Bonus: 0,
                    Hit_die: 5,
                    Max_die: 5,
                    Grapple: 1,
                    BaseAttack: 1,
                    Weapon: "Longsword",
                    AttackBonus: "0",
                    Damage: "1d2",
                    Critical: "19-20",
                    Range: "0",
                    Type: "S",
                    Notes: ""
                }
                $scope.$storage.combats.push(combat);
                var ability = {
                    abil: [],
                    feats: [],
                    spells: []
                }
                $scope.$storage.abilities.push(ability)
                var money = {
                    Gold: 0,
                    Silver: 0,
                    Copper: 0,
                }
                $scope.$storage.monies.push(money)
                var inventory = {
                    gear: [],
                    items: [],
                }
                $scope.$storage.inventories.push(inventory)
                $scope.$storage.update = 1;
                $state.go('tab.char');
            }
        }
    })

.controller('CharCtrl', function ($scope, $state, $localStorage, $ionicSideMenuDelegate, $window) {
    $scope.$storage = $localStorage.$default({
        characters: [],
        combats: [],
        abilities: [],
        monies: [],
        inventories: [],
        length: 0,
        cur: 0,
        update: 0
    })

    //$localStorage.$reset();

    $scope.cur = $scope.$storage.cur;

    if ($scope.$storage.characters[$scope.cur] === undefined)
        $state.go('new');
    else {
        $scope.rule3 = true;
        if($scope.$storage.characters[$scope.$storage.cur].Ruleset == 3.5)
            $scope.rule3 = false
        $scope.rule5 = !$scope.rule3

    }
        $scope.$on('$ionicView.beforeEnter', function () {
            if ($scope.$storage.update == 1) {
                $scope.$storage.update = 0
                $window.location.reload(true);
            }
    });

})

.controller('CombatCtrl', function ($scope, $localStorage) {
    $scope.$storage = $localStorage
    $scope.rule3 = true;
    if ($scope.$storage.characters[$scope.$storage.cur].Ruleset == 3.5)
        $scope.rule3 = false
    $scope.rule5 = !$scope.rule3
})

.controller('AbilitiesCtrl', [
    '$state', '$scope', '$ionicPopup', '$localStorage',
  function ($state, $scope, $ionicPopup, $localStorage) {
      $scope.$storage = $localStorage

      console.log($scope.$storage)

      $scope.abiladd = function (type) {
          $scope.data = { type }
          var mypop =
          $ionicPopup.show({
              template: 'Title: <input type="text" ng-model="data.title"> <br> Description: <textarea name="desc" cols="40" rows="5" maxlength="200" ng-model="data.description" style="height: 130px; min-height:130px; max-height:130px;">',
              title: 'Add Ability',
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
                  console.log(res);
                  if (res.type == 1) {
                      $scope.$storage.abilities[$scope.$storage.cur].spells.push(res);
                  } else if (res.type == 2) {
                      $scope.$storage.abilities[$scope.$storage.cur].feats.push(res);
                  } else if (res.type == 3) {
                      $scope.$storage.abilities[$scope.$storage.cur].abil.push(res);
                  }
              }
          });
      };
  }])

 .controller('InventoryCtrl', [
        '$state', '$scope', '$ionicPopup', '$localStorage',
   function ($state, $scope, $ionicPopup, $localStorage) {
       $scope.$storage = $localStorage


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
                       $scope.$storage.inventories[$scope.$storage.cur].items.push(res);
                   } else if (res.type == 2) {
                       $scope.$storage.inventories[$scope.$storage.cur].gear.push(res);
                   }
               }
           });
       };
   }]
);
