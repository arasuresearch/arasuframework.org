var app = angular.module('ar', ['ui.router','contact','contacts', 'collection']); //'google-maps'

app.run(['$rootScope', '$state', '$stateParams',  function ($rootScope,   $state,   $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;}]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider
        .when('/', '/home')
        .when('/user/:id', '/contacts/:id')
        .otherwise('/home');

      $stateProvider
        .state("home", {
          url: "/home",
          templateUrl: '/static/app/views/home.html'        
        })
        .state("quickstart", {
          url: "/quickstart",
          templateUrl: '/static/app/views/quickstart.html'        
        })
        .state("guide", {
          url: "/guide",
          controller: ['$scope', '$location', '$anchorScroll'  ,function (  $scope, $location, $anchorScroll) {
            //http://stackoverflow.com/questions/14712223/how-to-handle-anchor-hash-linking-in-angularjs
            $scope.scrollTo = function(id) {
              $location.hash(id);
              $anchorScroll();
            };
          }],
          templateUrl: '/static/app/views/guide.html'        
        })
        .state("contribute", {
          url: "/contribute",
          templateUrl: '/static/app/views/contribute.html'        
        })
        .state("examples", {
          url: "/examples",
          templateUrl: '/static/app/views/examples.html'        
        });
    }
  ]
);

///////////////////////////////
var contact = angular.module('contact', ['ui.router']);
  
contact.config(['$stateProvider', '$urlRouterProvider',function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        .state('contact', {
          url: '/contact',
          abstract: true,
          views: {
            '': {
              templateUrl: '/static/app/views/contact.html',
              controller: ['$scope', '$stateParams', 'collection',
                function (  $scope,   $stateParams,   collection) {
                  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
                }]
            }
          }
        })
        .state('contact.new', {
          url: '',
          views: {
            '':{
              templateUrl: '/static/app/views/contact.new.html',
              controller: ['$scope', '$stateParams', '$state','Contact', function ($scope,$stateParams,$state,Contact) {
                $scope.contact = new Contact();

                $scope.submit = function(contactForm) {
                  if(contactForm.$invalid) {
                    $scope.invalidSubmitAttempt = true;
                    return;
                  }
                  $scope.contact.$save();
                  $scope.msg = '<h3>'+$scope.contact.Name+' Thank you for your interest with us </h3><p> your request saved we will get back to you within 48 hours</p>';
                };
                // $scope.submit = function () {
                //   $scope.contact.$save();
                //   //$state.go('contact.show');
                // };
              }]
            }
          }
        })
        .state('contact.show', {
          url: '/show',
          views: {
            '': {
              templateUrl: '/static/app/views/contact.show.html',
              controller: ['$scope', '$stateParams', function ($scope,$stateParams) {
                  //$scope.user = utils.findById($scope.users, $stateParams.id);
                }]
            },
            'hint@': {
              template: 'This is users.detail populating the "hint" ui-view'
            },
            'menuTip': {
              templateProvider: ['$stateParams',
                function ($stateParams) {
                  return '<hr><small class="muted">Contact ID: ' + $stateParams.id + '</small>';
                }]
            }
          }
        });
    }
  ]
);

