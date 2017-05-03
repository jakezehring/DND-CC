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
                    tracker: $scope.$storage.length,
                    id: -1,
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
)

.controller('PartyCtrl', function ($scope, $state, $localStorage, $firebaseArray, $window) {
    $scope.$storage = $localStorage

    $scope.input = {
        title: ""
    }
    $scope.input.search = ""
    $scope.title = "Party"
    $scope.friends = []
    console.log($scope.$storage.characters[$scope.$storage.cur].id)
    
    $scope.signedin1 = false;
    $scope.signedin2 = false;
    $scope.inparty = false;
    if (!($scope.$storage.user === undefined)) {
        if ($scope.$storage.characters[$scope.$storage.cur].id == -1)
            $scope.signedin2 = true;
        else {
            var ref = firebase.database().ref("Parties/" + $scope.$storage.characters[$scope.$storage.cur].id);
            console.log(ref)
            var party = $firebaseArray(ref);
            party.$loaded().then(function () {
                $scope.title = party[1].$value
                $scope.friends = party[0]
                for(cur = 0; cur < $scope.friends.length; cur++)
                    $scope.friends[cur].show = false
            })
            $scope.inparty = true;
        }
    }
    else
        $scope.signedin1 = true;

    $scope.signUp = function () {
        $state.go("signup")
    }

    $scope.login = function () {
        $state.go("login")
    }

    $scope.create = function () {
        if ($scope.input.title != "") {
            var test = $firebaseArray(firebase.database().ref("Parties/" + $scope.input.title))
            test.$loaded().then(function () {
                if (!(test[0] === undefined))
                    alert("party already exists")
                else {
                    var ref = firebase.database().ref("Parties");
                    var party = {
                        Owner: $scope.$storage.user.email,
                        Name: $scope.input.title,
                        Characters: []
                    };
                    var char = {
                        Owner: $scope.$storage.user.email,
                        Name: $scope.$storage.characters[$scope.$storage.cur].Name,
                        Class: $scope.$storage.characters[$scope.$storage.cur].Class,
                        Level: $scope.$storage.characters[$scope.$storage.cur].Level,
                        HP: $scope.$storage.combats[$scope.$storage.cur].HP,
                        Max_hp: $scope.$storage.combats[$scope.$storage.cur].Max_hp
                    };
                    party.Characters.push(char)
                    ref.child($scope.input.title).set(party).then(function () {
                        $scope.$storage.characters[$scope.$storage.cur].id = $scope.input.title
                        $window.location.reload(true);
                    })
                }
            })
        }
        else
            alert("Please enter a name for your party")
    }

    $scope.join = function () {
        if($scope.input.search == "")
            alert("Please enter a party name")
        else {
            var ref = firebase.database().ref("Parties/" + $scope.input.search)
            var party = $firebaseArray(ref)
            party.$loaded().then(function () {
                if (party[0] === undefined) {
                    alert("Party not found")
                }
                else {
                    var char = {
                        Owner: $scope.$storage.user.email,
                        Name: $scope.$storage.characters[$scope.$storage.cur].Name,
                        Class: $scope.$storage.characters[$scope.$storage.cur].Class,
                        Level: $scope.$storage.characters[$scope.$storage.cur].Level,
                        HP: $scope.$storage.combats[$scope.$storage.cur].HP,
                        Max_hp: $scope.$storage.combats[$scope.$storage.cur].Max_hp,
                        Weapon: $scope.$storage.combats[$scope.$storage.cur].Weapon,
                        Damage: $scope.$storage.combats[$scope.$storage.cur].Damage,
                        Bonus: $scope.$storage.combats[$scope.$storage.cur].Bonus
                    };
                    party[0].push(char)
                    $scope.$storage.characters[$scope.$storage.cur].index = party[0].length - 1
                    party.$save(party[0]).then(function () {
                        $scope.$storage.characters[$scope.$storage.cur].id = $scope.input.search
                        $window.location.reload(true);
                    })
                }
            })

        }
    }

    $scope.leave = function () {
        var ref = firebase.database().ref("Parties/" + $scope.$storage.characters[$scope.$storage.cur].id)
        var party = $firebaseArray(ref)
        party.$loaded().then(function () {
            var location = -1
            console.log(party[0])
            for (cur = 0; cur < party[0].length; cur++)
                if (party[0][cur].Name == $scope.$storage.characters[$scope.$storage.cur].Name)
                    location = cur
            if (location != 1 && party[0][location].Owner == $scope.$storage.user.email) {
                party[0].splice(location, 1)
                party.$save(party[0]).then(function () {
                    $scope.$storage.characters[$scope.$storage.cur].id = -1
                    $window.location.reload(true);
                })
            }
        })
    }

    $scope.show = function (character) {
        for (cur = 0; cur < $scope.friends.length; cur++)
            if ($scope.friends[cur].Name == character.Name) {
                $scope.friends[cur].show = !$scope.friends[cur].show
            }
    }
})

.controller('SignUpCtrl', function ($scope, $state, $localStorage, $firebaseAuth) {
    $scope.$storage = $localStorage

    $scope.input = {
        username: "",
        password1: "",
        password2: ""
        }

    $scope.trySignUp = function () {
        var auth = $firebaseAuth();
        $scope.$storage.user = null;
        auth.$createUserWithEmailAndPassword($scope.input.username, $scope.input.password1)
        .then(function (firebaseUser) {
            $scope.$storage.user = firebaseUser;
            console.log(firebaseUser)
            $state.go("tab.party")
        }).catch(function (error) {
            alert(error)
            console.log(error)
        })
    }

    $scope.cancel = function () {
        $state.go("tab.party")
    }
})

.controller('LoginCtrl', function ($scope, $state, $localStorage, $firebaseAuth) {
    $scope.$storage = $localStorage

    $scope.input = {
        username: "",
        password: ""
    }

    $scope.tryLogin = function () {
        var auth = $firebaseAuth();
        $scope.$storage.user = null;
        auth.$signInWithEmailAndPassword($scope.input.username, $scope.input.password)
        .then(function (firebaseUser) {
            $scope.$storage.user = firebaseUser;
            $state.go("tab.party")
        }).catch(function (error) {
            alert(error)
            console.log(error)
        })
    }

    $scope.cancel = function () {
        $state.go("tab.party")
    }
});
