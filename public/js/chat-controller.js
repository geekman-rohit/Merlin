// Generated by CoffeeScript 1.9.0
(function() {
  var app;

  app = angular.module("MerlinChat");

  app.controller("chatController", function($scope, $rootScope) {
    var a;
    $scope.activateEnter = true;
    angular.element('textarea#streamInput').keypress(function(eventdata) {
      if ($scope.activateEnter && !eventdata.shiftKey && eventdata.keyCode === 13) {
        if ($scope.streamInput.trim().length > 0) {
          angular.element('.text-box-container button').trigger('click');
          return false;
        }
      }
      return true;
    });
    a = 10;
    angular.element('.text-box-container').click(function() {
      angular.element('textarea#streamInput').focus();
    });
    $scope.getName = function(jid) {
      var roster;
      if (jid === xmpp.jid) {
        if (xmpp.fullName.length > 0) {
          return xmpp.fullName;
        } else {
          return xmpp.jid;
        }
      }
      roster = xmpp.getDefaultRoster();
      if (roster[jid]) {
        return roster[jid].name;
      } else {
        return jid;
      }
    };
    $scope.getPhoto = function(jid) {
      var roster;
      if (jid === xmpp.jid) {
        return xmpp.photo;
      }
      roster = xmpp.getDefaultRoster();
      if (roster[jid]) {
        return roster[jid].photo;
      } else {
        return 'views/default-propic.png';
      }
    };
    $scope.$on("newMessage", function(event, body) {
      if (!$scope.$$phase) {
        $scope.$apply();
      }
      $(".box-container .scroller").scrollTop($('.box-container .box-content').height());
      $(".box-container .scroller").perfectScrollbar('update');
    });
    $scope.messages = [];
    $scope.fetchMessages = function(jid) {
      if (xmpp.messages[jid]) {
        $scope.messages = xmpp.messages[jid];
      } else {
        $scope.messages = [];
      }
      return $scope.messages;
    };
    $scope.renderNameLeft = function(message) {
      var name;
      name = $scope.getName(message.from);
      if (message.sent) {
        return name;
      }
      return '';
    };
    $scope.renderNameRight = function(message) {
      var name;
      name = $scope.getName(message.from);
      if (!message.sent) {
        return name;
      }
      return '';
    };
    $scope.streamInput = '';
    $scope.sendMessage = function(jid) {
      var body;
      if ($scope.streamInput.trim().length > 0) {
        body = $scope.streamInput;
        xmpp.sendMessage(jid, body);
        $scope.streamInput = '';
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
      $(".box-container .scroller").scrollTop($('.box-container .box-content').height());
      $(".box-container .scroller").perfectScrollbar('update');
      angular.element('textarea#streamInput').focus();
    };
    $scope.getClass = function(message) {
      if (message.sent) {
        return "message message-right";
      }
      return "message message-left";
    };
  });

}).call(this);
