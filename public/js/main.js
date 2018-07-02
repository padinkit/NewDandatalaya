var app = angular.module("dantalayaApp", [
  "ui.router",
  "ngMaterial",
  "ui.grid",
  "ui.grid.selection"
]);

app.config([
  "$stateProvider",
  "$urlRouterProvider",
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("home");

    $stateProvider
      .state("home", {
        url: "/home",
        templateUrl: "partials/home.html",
        controller: "loginController"
      })
      .state("about", {
        url: "/about",
        templateUrl: "partials/about.html"
      })
      .state("gallery", {
        url: "/gallery",
        templateUrl: "partials/gallery.html",
        controller: function() {
          setTimeout(function() {
            $(document).ready(function() {
              $("#owl-demo").owlCarousel({
                slideSpeed: 4000,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: 4000,
                stopOnHover: true
              });
            });
          }, 4000);
        }
      })
      .state("contact", {
        url: "/contact",
        templateUrl: "partials/contact.html"
      })
      .state("services", {
        url: "/services",
        templateUrl: "partials/services.html"
      })
      .state("patientservices", {
        url: "/services/patient",
        templateUrl: "partials/patientservices.html"
      })
      .state("dentistservices", {
        url: "/services/dentist",
        templateUrl: "partials/dentistservices.html"
      })
      .state("surgeonservices", {
        url: "/services/surgeon",
        templateUrl: "partials/surgeonservices.html"
      })
      .state("labtechnicianservices", {
        url: "/services/labtechnician",
        templateUrl: "partials/labtechnicianservices.html"
      })
      .state("patientregister", {
        url: "/patientregister",
        templateUrl: "partials/patientregister.html",
        controller: "patientRegisterController"
      })
      .state("doctorregister", {
        url: "/doctorregister",
        templateUrl: "partials/doctorregister.html",
        controller: "doctorRegisterController"
      })
      .state("surgeonregister", {
        url: "/surgeonregister",
        templateUrl: "partials/surgeonregister.html",
        controller: "surgeonRegisterController"
      })
      .state("technicianregister", {
        url: "/technicianregister",
        templateUrl: "partials/technicianregister.html",
        controller: "technicianRegisterController"
      })
      .state("register", {
        url: "/register",
        templateUrl: "partials/register.html"
      })
      .state("specialization", {
        url: "/specialization",
        templateUrl: "partials/specialization.html"
      })
      .state("search", {
        url: "/search",
        templateUrl: "partials/search.html"
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "partials/dashboard.html",
        controller: "dashboardController"
      })
      .state("chargeSheet", {
        url: "/chargeSheet",
        templateUrl: "partials/chargeSheet.html",
        controller: "chargeSheetController"
      })
      .state("activation", {
        url: "/activation",
        templateUrl: "partials/activation.html",
        controller: "activationController"
      })
      .state("updatePayment", {
        url: "/updatePayment",
        templateUrl: "partials/updatePayment.html",
        controller: "updatePaymentController"
      })
      .state("forgetpassword", {
        url: "/forgetpassword",
        templateUrl: "partials/forgetpassword.html",
        controller: "forgotPassController"
      })
      .state("changepassword", {
        url: "/changepassword",
        templateUrl: "partials/changepassword.html",
        controller: "changePassController"
      })
      .state("doctorprofile", {
        url: "/doctorprofile",
        templateUrl: "partials/doctorprofile.html",
        controller: "profileController"
      })
      .state("patientprofile", {
        url: "/patientprofile",
        templateUrl: "partials/patientprofile.html",
        controller: "profileController"
      })
      .state("surgeonprofile", {
        url: "/surgeonprofile",
        templateUrl: "partials/surgeonprofile.html",
        controller: "profileController"
      })
      .state("admindash", {
        url: "/admindash",
        templateUrl: "partials/admindash.html",
        controller: "admindashController"
      })
      .state("technicianprofile", {
        url: "/technicianprofile",
        templateUrl: "partials/technicianprofile.html",
        controller: "profileController"
      })
      .state("newpatientsearch", {
        url: "/newpatientsearch",
        templateUrl: "partials/NewPatientSearch.html"
      })
      .state("newpatientregister", {
        url: "/newpatientregister",
        templateUrl: "partials/NewPatientRegister.html"
      })
      .state("tabs", {
        url: "/tabs",
        templateUrl: "partials/tabs.html"
      })
      .state("doctor", {
        url: "/doctor",
        templateUrl: "partials/doctor.html"
      })
      .state("doctor.home", {
        url: "/dashboard",
        templateUrl: "partials/doctor.home.html",
        controller: "viewAllPatientsController"
      })
      .state("doctor.addPatient", {
        url: "/addPatient",
        templateUrl: "partials/doctor.addPatient.html",
        controller: "addPatientController"
      })
      .state("doctor.addNewPatient", {
        url: "/addNewPatient",
        templateUrl: "partials/doctor.addNewPatient.html",
        controller: "addNewPatientController",
        params: {
          data: {}
        }
      })
      .state("doctor.patients", {
        url: "/patients",
        templateUrl: "partials/doctor.patients.html",
        controller: "viewAllPatientsController"
      })
      .state("doctor.addPayment", {
        url: "/addPayment",
        templateUrl: "partials/doctor.addPayment.html"
      })
      .state("doctor.editPatient", {
        url: "/editPatient",
        templateUrl: "partials/doctor.editPatient.html",
        params: {
          data: {}
        },
        controller: "doctorPatientController"
      })
      .state("doctor.schedule", {
        url: "/schedule",
        templateUrl: "partials/doctor.schedule.html",
        controller: "schedulerController"
      })
      .state("doctor.patientProfile", {
        url: "/patientProfile",
        templateUrl: "partials/doctor.patientProfile.html",
        params: {
          data: {}
        },
        controller: "doctorPatientController"
      })
      .state("doctor.payments", {
        url: "/payments",
        templateUrl: "partials/doctor.payments.html"
      })
      .state("doctor.profile", {
        url: "/profile",
        templateUrl: "partials/doctor.profile.html"
      })
      .state("doctor.treatmentDetails", {
        url: "/treatmentDetails",
        templateUrl: "partials/doctor.treatmentDetails.html",
        params: {
          data: {}
        },
        controller: "treatmentDetailsController"
      })
      .state("patientTreatmentDetails", {
        url: "/patientTreatmentDetails",
        templateUrl: "partials/patient.treatmentDetails.html",
        params: {
          data: {}
        },
        controller: "PatientTreatmentDetailsController"
      })
      .state("patientPayment", {
        url: "/patientPayment",
        templateUrl: "partials/patient.payment.html",
        params: {
          data: {}
        },
        controller: "PatientPaymentController"
      })
      .state("patientAppointment", {
        url: "/patientAppointment",
        templateUrl: "partials/patient.appointments.html",
        params: {
          data: {}
        },
        controller: "patientAppointmenttController"
      });

    toastr.options = {
      positionClass: "toast-top-center",
      timeOut: "12000",
      closeButton: true
    };
  }
]);

app.run(function($rootScope, $http, $state, $location) {
  $rootScope.fetchedUserData = false;
  var token = localStorage.getItem("DantalayaUser");
  $rootScope.token = token;
  if (token) {
    $http.post("/auth/loginToken", { token: token }).then(
      function(logindata) {
        $http.post("/auth/login", logindata.data).then(
          function(data) {
            $rootScope.userLoggedin = true;
            $rootScope.userId = data.data.username;
            $rootScope.userType = data.data.profile;
            if ($rootScope.userType == "admin") {
              $state.go("admindash");
            } else if ($rootScope.userType == "patient") {
              $state.go("dashboard");
            } else if ($rootScope.userType == "doctor") {
              $state.go("doctor.home");
            } else if ($rootScope.userType == "technician") {
              $state.go("technicianprofile");
            } else if ($rootScope.userType == "surgeon") {
              $state.go("surgeonprofile");
            }

            $http.post("/getuserDetails", { user: $rootScope.userId }).then(
              function(data) {
                $rootScope.userData = data.data;
                $rootScope.fetchedUserData = true;

                if ($rootScope.userType == "doctor") {
                  if (!$rootScope.userData.data.bank) {
                    $rootScope.nobank = true;
                  }
                }
                $rootScope.$broadcast("fetchedUserData");
              },
              function(err) {
                console.log(err);
              }
            );
          },
          function(err) {
            console.log("login error");
          }
        );
      },
      function(err) {
        console.log("login error");
        $state.go("home");
      }
    );
  }

  $rootScope.$on("$stateChangeStart", function(
    e,
    toState,
    toParams,
    fromState,
    fromParams
  ) {
    setTimeout(function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }, 600);
  });
  $(".nav a").on("click", function() {
    $(".navbar-toggle").trigger("click");
  });
});

app.controller("navcontroller", function($scope, $location) {
  setTimeout(function() {
    $(".nav a").on("click", function() {
      $(".navbar-toggle").trigger("click");
    });
  }, 300);
});

app.controller("middleController", function($scope, $location) {
  $scope.getUrl = function(url) {
    if (url == $location.url()) {
      return true;
    } else {
      return false;
    }
  };
});

app.controller("loginController", function($scope, $http, $state, $rootScope) {
  setTimeout(function() {
    $(document).ready(function() {
      $("#owl-demo").owlCarousel({
        slideSpeed: 400,
        paginationSpeed: 400,
        singleItem: true,
        autoPlay: 6000,
        stopOnHover: true
      });
    });
  }, 300);
  if ($rootScope.userLoggedin === true) {
    if ($rootScope.userType == "admin") {
      $state.go("admindash");
    } else if ($rootScope.userType == "patient") {
      $state.go("dashboard");
    } else if ($rootScope.userType == "doctor") {
      $state.go("doctor.home");
    } else if ($rootScope.userType == "technician") {
      $state.go("technicianprofile");
    } else if ($rootScope.userType == "surgeon") {
      $state.go("surgeonprofile");
    }
  }

  $scope.login = function() {
    $rootScope.fetchedUserData = false;
    $http.post("/auth/login", $scope.user).then(
      function(data) {
        toastr.success("Login Successful");
        $rootScope.userLoggedin = true;
        $rootScope.userId = data.data.username;
        $rootScope.userType = data.data.profile;
        localStorage.setItem("DantalayaUser", data.data.token);
        $rootScope.token = data.data.token;
        if ($rootScope.userType == "admin") {
          $state.go("admindash");
        } else if ($rootScope.userType == "patient") {
          $state.go("dashboard");
        } else if ($rootScope.userType == "doctor") {
          $state.go("doctor.home");
        } else if ($rootScope.userType == "technician") {
          $state.go("technicianprofile");
        } else if ($rootScope.userType == "surgeon") {
          $state.go("surgeonprofile");
        }

        $http.post("/getuserDetails", { user: $rootScope.userId }).then(
          function(data) {
            $rootScope.userData = data.data;
            $rootScope.fetchedUserData = true;
            if ($rootScope.userType == "doctor") {
              if (!$rootScope.userData.data.bank) {
                $rootScope.nobank = true;
              }
            }
            $rootScope.$broadcast("fetchedUserData");
          },
          function(err) {
            console.log(err);
          }
        );
      },
      function(err) {
        toastr.error(
          "Username or Password Incorrect Or Account Not Yet Activated"
        );
      }
    );
  };
});

app.controller("patientAppointmenttController", function(
  $scope,
  $http,
  $state,
  $rootScope
) {
  $scope.getStatus = function(data) {
    if (data == "openAppointment") {
      return "Open";
    } else if (data == "rejectAppointment") {
      return "Rejected";
    } else {
      return "Accepted";
    }
  };

  $scope.showToggle = function(data) {
    if ($scope[data]) {
      return true;
    } else if (
      !$scope.openAppointment &&
      !$scope.confirmAppointment &&
      !$scope.rejectAppointment
    ) {
      return true;
    } else {
      return false;
    }
  };
});

app.controller("dashboardController", function(
  $scope,
  $http,
  $state,
  $rootScope
) {
  $scope.results = [];
  $scope.searchparam = {};
  $scope.allDetailsFromEmail = [];
  $scope.selectedUserFromEmail;

  function getAllDetailsFromEmail() {
    if ($rootScope.userType == "patient" && $rootScope.fetchedUserData) {
      $http
        .post("/getAllDetailsFromEmail", {
          email: $rootScope.userData.data.email
        })
        .then(
          function(data) {
            data.data.map(function(obj, index) {
              if (!obj.data.dependant) {
                obj.self = true;
                obj.selfname = "(Self)";
                $scope.allDetailsFromEmail.push(obj);
                $scope.selectedUserFromEmail = obj;
                $scope.selectedUser = String(index);
              } else {
                $scope.allDetailsFromEmail.push(obj);
              }
            });
          },
          function(err) {
            toastr.error(err);
          }
        );
    }
  }
  if ($rootScope.fetchedUserData) {
    getAllDetailsFromEmail();
  }

  $scope.$on("fetchedUserData", getAllDetailsFromEmail);

  $scope.changeUser = function(each) {
    $scope.selectedUserFromEmail = $scope.allDetailsFromEmail[parseInt(each)];
    $rootScope.userData = $scope.selectedUserFromEmail;
  };

  $scope.search = function() {
    $scope.searchsubmit = true;
    var params = $scope.searchparam;
    $http.post("/searchdetails", params).then(
      function(data) {
        $scope.results = data.data;
        $scope.resultReturned = true;
      },
      function(err) {
        toastr.error("Search Error");
      }
    );
  };
  $scope.searchdoctor = function() {
    $scope.showdoctor = "true";
  };

  $scope.getStatus = function(data) {
    if (data == "openAppointment") {
      return "Open";
    } else if (data == "rejectAppointment") {
      return "Rejected";
    } else {
      return "Accepted";
    }
  };

  $scope.closeBookAppointment = function() {
    $scope.newEventTitleModal = false;
  };

  $scope.bookAppointment = function(obj) {
    //$('#appointmentModal').modal('show');
    $scope.newEventTitleModal = true;
    $("#calendar").fullCalendar("removeEvents");
    $scope.allEventData = [];
    $scope.selected = obj;

    $http.post("/viewEvents", { doctorId: obj.username }).then(function(data) {
      if (data.data) {
        if (data.data.data) {
          $scope.allEventData = data.data.data.events;
        }
      }

      $("#calendar").fullCalendar({
        header: {
          left: "prev,next today",
          center: "title",
          right: "month,agendaWeek,agendaDay"
        },
        defaultView: "agendaWeek",
        editable: true,
        selectable: true,
        selectHelper: true,
        timezone: false,
        longpressDelay: 10,
        dayClick: function(start) {
          if ($("#calendar").fullCalendar("getView").name == "month") {
            return false;
          }
          if (moment(start) < moment()) {
            return false;
          }

          var eventData;
          eventData = {
            start: start,
            className: "openAppointment",
            patientId: $rootScope.userData._id,
            patientName:
              $rootScope.userData.data.firstname +
              " " +
              $rootScope.userData.data.lastname,
            doctorUser: $scope.selected.username,
            doctorName:
              $scope.selected.firstname + " " + $scope.selected.lastname,
            doctorMail: $scope.selected.email,
            patientMail: $rootScope.userData.data.email,
            patientPhone: $rootScope.userData.data.mobile,
            doctorPhone: $scope.selected.mobile,
            id: $rootScope.userData.data.username + new Date().valueOf()
          };
          $scope.eventData = eventData;
          showEventAddingModal(start);
        },
        editable: true,
        eventLimit: true,
        events: $scope.allEventData
      });
      $scope.allEventData.map(function(obj) {
        $("#calendar").fullCalendar("renderEvent", obj, true);
      });
    });
  };

  function showEventAddingModal(start) {
    $scope.newEventTitle = undefined;
    $scope.newEventDate = {};
    $scope.newEventDate.start = start;
    $scope.newEventDate.end = moment(start).add(30, "m");
    $("#newEventTitleModal").modal("show");
    /*$('#newEventTitleModal').addClass('z2010');
		$('.modal-backdrop').addClass('z2000');*/
    $scope.$apply();
  }

  $scope.newEventAdding = function() {
    if (!$scope.newEventTitle) {
      $scope.titleError = true;
      return;
    }
    $scope.eventData.title = $scope.newEventTitle;
    $scope.eventData.end = $scope.newEventDate.end;
    addEvent();
    $("#calendar").fullCalendar("unselect");
    $("#newEventTitleModal").modal("hide");
    //$('.modal-backdrop').removeClass('z2000');
  };

  $scope.closeEventAddingModal = function() {
    $("#newEventTitleModal").modal("hide");
    //$('.modal-backdrop').removeClass('z2000');
  };

  function addEvent() {
    $http
      .post("/addEvent", {
        doctorId: $scope.selected.username,
        patientId: $rootScope.userId,
        data: $scope.eventData
      })
      .then(function(data) {
        $http
          .post("/appointmentmail", {
            origin: "patient",
            data: $scope.eventData
          })
          .then(function(data) {});
        $("#calendar").fullCalendar("renderEvent", $scope.eventData, true);
      });
  }
});

app.controller("activationController", function(
  $scope,
  $http,
  $state,
  $rootScope,
  $stateParams,
  $location
) {
  var params = $location.search();
  $http.post("/auth/activate", params).then(
    function(data) {
      $scope.ActivationText = "Your Account has been Activated";
      $scope.showLogin = true;
    },
    function(err) {
      $scope.ActivationText = err.data;
      console.log(err);
    }
  );
});

app.controller("updatePaymentController", function(
  $scope,
  $http,
  $state,
  $rootScope,
  $stateParams,
  $location
) {
  var params = $location.search();
  $http.post("/updatePayment", { id: params.payment_request_id }).then(
    function(data) {
      $scope.ActivationText = "Your Payment Is Successful";
      $scope.showLogin = true;
      $(".immoral-modal-container").hide();
    },
    function(err) {
      $scope.ActivationText = err.data;
      console.log(err);
    }
  );
});

app.filter("trueFalseParser", function($filter) {
  return function(input) {
    return input ? "Done" : "Not Yet Paid";
  };
});

app.controller("chargeSheetController", function(
  $scope,
  $http,
  $state,
  $rootScope,
  $stateParams,
  $location
) {
  if (!$rootScope.userData) {
    $state.go("home");
  }
  $scope.chargesheet = $rootScope.userData.data.chargesheet;
  $scope.gridOptions = {
    enableFiltering: false,
    data: $scope.chargesheet,
    enableRowSelection: true,
    enableRowHeaderSelection: false,
    multiSelect: false,
    onRegisterApi: function(gridApi) {
      $scope.gridApi = gridApi;
      gridApi.selection.on.rowSelectionChanged($scope, function(row) {});
    },
    columnDefs: [
      {
        field: "month",
        displayName: "Month",
        width: 160
      },
      {
        field: "year",
        displayName: "Year",
        width: 160
      },
      {
        field: "totalamount",
        displayName: "Total Revenue Earned",
        width: 260
      },
      {
        field: "serviceAmount",
        displayName: "Billed Amount",
        minWidth: 260,
        cellTemplate:
          '<div class="ui-grid-cell-contents">{{row.entity.serviceAmount}}  <a class="grid-payonline" href="javascript:void(0)" ng-if="!row.entity.paidServiceAmount" ng-click=" grid.appScope.payOnline(row.entity)">Pay Online</a></div>'
      },
      {
        field: "paidServiceAmount",
        displayName: "Bill Payment",
        cellFilter: "trueFalseParser",
        width: 160
      },
      {
        field: "viewStatement",
        displayName: "View Statement",
        width: 160,
        cellTemplate:
          '<div class="ui-grid-cell-contents"><a class="" href="javascript:void(0)" ng-click=" grid.appScope.viewStatement(row.entity)">View Statement</a></div>'
      }
    ]
  };

  $scope.viewStatement = function(obj) {
    $http
      .post("/getParticularChargeSheet", {
        month: obj.month,
        year: obj.year,
        id: $rootScope.userData._id
      })
      .then(function(data) {
        $scope.monthYear = obj.month + " " + obj.year;
        $scope.statementData = data.data;
        $("#statement").modal();
      });
  };

  $scope.payOnline = function(each) {
    var paymentData = {
      amount: each.serviceAmount,
      phone: $rootScope.userData.data.mobile,
      buyer_name:
        $rootScope.userData.data.firstname +
        " " +
        $rootScope.userData.data.lastname,
      email: $rootScope.userData.data.email
    };
    $http.post("/payOnlineChargeSheet", paymentData).then(
      function(data) {
        var payment_request = JSON.parse(data.data.data).payment_request;
        var instamojoUsername = data.data.username;
        $scope.paymentId = payment_request.id;
        Instamojo.open(payment_request.longurl);
        $http
          .post("/addToPaymentQueue", {
            id: $rootScope.userData._id,
            paymentRequestId: payment_request.id,
            chargesheet: true,
            month: each.month,
            year: each.year
          })
          .then(function(data) {});
      },
      function(err) {
        console.log(err);
      }
    );
  };
});

app.controller("admindashController", function(
  $scope,
  $http,
  $state,
  $rootScope,
  $stateParams,
  $location
) {
  $scope.userActivation = true;
  $scope.checkbox = {};
  $http.get("/getaccounts").then(
    function(data) {
      $scope.getAccounts = data.data;
    },
    function(err) {
      console.log(err);
    }
  );

  $scope.activate = function(user) {
    var r = confirm("Are You sure, you want to Activate the Account");
    if (!r) {
      return;
    }
    $http.post("/admin/activate", { user: user }).then(
      function(data) {
        $http.get("/getaccounts").then(
          function(data) {
            $scope.getAccounts = data.data;
            toastr.info("User " + user + " has Been Activated");
          },
          function(err) {
            console.log(err);
          }
        );
      },
      function(err) {
        console.log(err);
      }
    );
  };

  $scope.reject = function(user, email) {
    var r = confirm("Are You sure, you want to Reject the Account");
    if (!r) {
      return;
    }
    $http
      .post("/admin/reject", {
        user: user,
        email: email
      })
      .then(
        function(data) {
          $http.get("/getaccounts").then(
            function(data) {
              $scope.getAccounts = data.data;
              toastr.info("User " + user + " has Been Rejected");
            },
            function(err) {
              console.log(err);
            }
          );
        },
        function(err) {
          console.log(err);
        }
      );
  };

  $scope.showUserData = null;
  $scope.userNotFound = false;
  $scope.userSelectedCurrentTreatmentId = null;
  $scope.userTreatmentId = null;

  $scope.searchUser = function(userEmail) {
    $http.post("/searchuser", { user: userEmail }).then(
      function(data) {
        if (data.data != "") {
          $scope.userNotFound = false;
          $scope.showUserData = data.data;
          if ($scope.showUserData.data.profile == "patient") {
            $scope.userCurrentTreatmentIds = Object.keys(
              $scope.showUserData.data.currenttreatment
            );
            $scope.userSelectedCurrentTreatmentId =
              $scope.userCurrentTreatmentIds[0];
            $scope.userTreatmentId =
              $scope.showUserData.data.currenttreatment[
                $scope.userSelectedCurrentTreatmentId
              ];
            $http
              .post("/userviewtreatment", {
                treatment: $scope.showUserData.data.treatments
              })
              .then(
                function(data) {
                  $scope.allTreatments = data.data;

                  $scope.treatmentData = $scope.allTreatments.find(function(
                    value,
                    index
                  ) {
                    return (
                      value._id ==
                      $scope.showUserData.data.currenttreatment[
                        $scope.userCurrentTreatmentIds[0]
                      ]
                    );
                  });
                  $scope.treatment = $scope.treatmentData.data;
                },
                function(err) {
                  console.log(err);
                }
              );
          }
        } else {
          $scope.showUserData = null;
          $scope.userNotFound = true;
        }

        // $scope.searchData = data.data;
        // $('#userdetailsModal').modal('show');
      },
      function(err) {
        console.log(err);
      }
    );
  };

  $scope.userDetails = function(user) {
    $http.post("/getuserDetails", { user: user }).then(
      function(data) {
        $scope.userData = data.data;
        $("#userdetailsModal").modal("show");
      },
      function(err) {
        console.log(err);
      }
    );
  };

  $scope.getAllAccounts = function() {
    $scope.showerror = true;

    var params = [];
    Object.keys($scope.checkbox).map(function(obj) {
      if ($scope.checkbox[obj]) {
        params.push(obj);
      }
    });

    $http.post("/getAllAccounts", { data: params }).then(
      function(data) {
        $scope.allUserData = data.data;
      },
      function(err) {
        console.log(err);
      }
    );
  };

  $scope.toggleTab = function(param) {
    if (param == "userActivation") {
      $scope.userActivation = true;
      $scope.search = false;
      $scope.searchSpecific = false;
    } else if (param == "search") {
      $scope.userActivation = false;
      $scope.search = true;
      $scope.searchSpecific = false;
    } else {
      $scope.searchSpecific = true;
      $scope.userActivation = false;
      $scope.search = false;
    }
  };
});

app.controller("patientRegisterController", function(
  $scope,
  $http,
  validationService,
  $rootScope,
  $state
) {
  $scope.testing = null;
  $scope.loader = false;
  $scope.genderValues = ["Male", "Female", "Other"];

  $scope.securityQuestion1 = [
    "Which phone number do you remember most from your childhood?",
    "What was your favorite place to visit as a child?",
    "What is the last name of the teacher who gave you your first failing grade?",
    "What street did you grow up on?"
  ];

  $scope.securityQuestion2 = [
    "What time of the day were you born? (hh:mm)",
    "In what city or town does your nearest sibling live?",
    "What is the make of your favourite car?",
    "What was the name of your elementary / primary school?"
  ];
  $scope.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  $scope.textChanged = function() {
    if (!$scope.signup.nri) {
      if ($scope.signup.pin.length === 6) {
        $scope.loader = true;
        $http.get("/pincode/" + $scope.signup.pin).then(function(response) {
          if (response.data.length > 0) {
            $scope.signup.city = response.data[0].districtname;
            var stateName = response.data[0].statename.toLowerCase();
            $scope.signup.state = $scope.toTitleCase(stateName);
            $scope.loader = false;
          } else {
            alert("Invalid Zip Code");
            $scope.signup.pin = null;
            $scope.signup.state = null;
            $scope.signup.city = null;
            $scope.loader = false;
          }
        });
      }
    }
  };

  $scope.submit = function() {
    $scope.signupFinal = {};
    if (validationService.patientValidation()) {
      $("#signupModal").modal();
      $scope.userIDerror = "";
      $scope.signupFinal.username = $scope.signup.email;
    }
  };

  $scope.signupfn = function(profile) {
    if ($scope.signupFinal.password !== $scope.signupFinal.passwordreenter) {
      $scope.showError = true;
      return;
    }
    if ($scope.signupForm.$valid) {
      $scope.signup.profile = profile;
      $scope.signupFinal.profile = profile;
      delete $scope.signupFinal.passwordreenter;

      $http
        .post("/auth/signup", {
          contactInfo: $scope.signup,
          authInfo: $scope.signupFinal
        })
        .then(
          function(data) {
            if (data.data.alert == "userIDError") {
              $scope.userIDerror = "User ID not available. Try a new one";
            } else {
              $("#signupModal").modal("toggle");
              toastr.success(
                "Thank you! Your Registration form was successfully submitted. Activate Your Account By clicking on the link sent to your Registered Mail-ID"
              );
              $state.go("home");
            }
          },
          function(err) {
            toastr.error("Registration Failed");
          }
        );
    }
  };
});

app.controller("doctorRegisterController", function(
  $scope,
  $http,
  validationService,
  $rootScope,
  $state
) {
  $scope.genderValues = ["Male", "Female", "Other"];
  $scope.states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "New Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];

  $scope.specializationValue = [
    "BDS",
    "MDS - PEDODONTICS",
    "MDS - CONSERVATIVE DENTISTRY AND ENDODONTICS",
    "MDS - COMMUNITY DENTISTRY /PUBLIC HEALTH",
    "MDS - ORAL AND MAXILLOFACIAL SURGERY (OMFS)",
    "MDS - ORTHODONTICS",
    "MDS - PROSTHODONTICS",
    "MDS - PERIODONTICS",
    "MDS - ORAL MEDICINE AND RADIOLOGY",
    "MDS - ORAL PATHOLOGY AND MICROBIOLOGY",
    "PhD - CONSERVATIVE DENTISTRY AND ENDODONTICS",
    "PhD - PROSTHODONTICS",
    "PhD - ORTHODONTICS",
    "PhD - COMMUNITY DENTISTRY /PUBLIC HEALTH",
    "PhD - ORAL PATHOLOGY AND MICROBIOLOGY",
    "PhD - ORAL AND MAXILLOFACIAL SURGERY (OMFS)"
  ];

  $scope.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  $scope.textChanged = function() {
      if ($scope.signup.pin.length === 6) {
        $scope.loader = true;
        $http.get("/pincode/" + $scope.signup.pin).then(function(response) {
          if (response.data.length > 0) {
            $scope.signup.city = response.data[0].districtname;
            var stateName = response.data[0].statename.toLowerCase();
            $scope.signup.state = $scope.toTitleCase(stateName);
            $scope.loader = false;
          } else {
            alert("Invalid Zip Code");
            $scope.signup.pin = null;
            $scope.signup.state = null;
            $scope.signup.city = null;
            $scope.loader = false;
          }
        });
      }
  };

  $scope.clinicTextChanged = function() {
      if ($scope.signup.clinicpin.length === 6) {
        $scope.loader = true;
        $http.get("/pincode/" + $scope.signup.clinicpin).then(function(response) {
          if (response.data.length > 0) {
            $scope.signup.cliniccity = response.data[0].districtname;
            var stateName = response.data[0].statename.toLowerCase();
            $scope.signup.clinicstate = $scope.toTitleCase(stateName);
            $scope.loader = false;
          } else {
            alert("Invalid Zip Code");
            $scope.signup.clinicpin = null;
            $scope.signup.clinicstate = null;
            $scope.signup.cliniccity = null;
            $scope.loader = false;
          }
        });
      }
  };

  $scope.submit = function() {
    $scope.signupFinal = {};
    if (validationService.doctorValidation()) {
      $("#signupModal").modal();
      $scope.userIDerror = "";
      $scope.signupFinal.username = $scope.signup.email;
    }
  };

  $scope.signupfn = function(profile) {
    if ($scope.signupFinal.password !== $scope.signupFinal.passwordreenter) {
      $scope.showError = true;
      return;
    }
    if ($scope.signupForm.$valid) {
      $scope.signup.profile = profile;
      $scope.signupFinal.profile = profile;
      delete $scope.signupFinal.passwordreenter;

      $http
        .post("/auth/signup", {
          contactInfo: $scope.signup,
          authInfo: $scope.signupFinal
        })
        .then(
          function(data) {
            if (data.data.alert == "userIDError") {
              $scope.userIDerror = "User ID not available. Try a new one";
            } else {
              $("#signupModal").modal("toggle");
              toastr.success(
                "Thank you! Your Registration form was successfully submitted. Confirmation mail will be sent to you once its verified."
              );
              $state.go("home");
            }
          },
          function(err) {
            toastr.error("Registration Failed");
          }
        );
    }
  };
});

app.controller("technicianRegisterController", function(
  $scope,
  $http,
  validationService,
  $rootScope,
  $state
) {
  $scope.genderValues = ["Male", "Female", "Other"];

  $scope.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  $scope.textChanged = function() {
      if ($scope.signup.pin.length === 6) {
        $scope.loader = true;
        $http.get("/pincode/" + $scope.signup.pin).then(function(response) {
          if (response.data.length > 0) {
            $scope.signup.city = response.data[0].districtname;
            var stateName = response.data[0].statename.toLowerCase();
            $scope.signup.state = $scope.toTitleCase(stateName);
            $scope.loader = false;
          } else {
            alert("Invalid Zip Code");
            $scope.signup.pin = null;
            $scope.signup.state = null;
            $scope.signup.city = null;
            $scope.loader = false;
          }
        });
      }
  };


  $scope.submit = function() {
    $scope.signupFinal = {};
    if (validationService.technicianValidation()) {
      $("#signupModal").modal();
      $scope.userIDerror = "";
      $scope.signupFinal.username = $scope.signup.email;
    }
  };

  $scope.signupfn = function(profile) {
    if ($scope.signupFinal.password !== $scope.signupFinal.passwordreenter) {
      $scope.showError = true;
      return;
    }
    if ($scope.signupForm.$valid) {
      $scope.signup.profile = profile;
      $scope.signupFinal.profile = profile;
      delete $scope.signupFinal.passwordreenter;

      $http
        .post("/auth/signup", {
          contactInfo: $scope.signup,
          authInfo: $scope.signupFinal
        })
        .then(
          function(data) {
            if (data.data.alert == "userIDError") {
              $scope.userIDerror = "User ID not available. Try a new one";
            } else {
              $("#signupModal").modal("toggle");
              toastr.success(
                "Thank you! Your Registration form was successfully submitted. Confirmation mail will be sent to you once its verified."
              );
              $state.go("home");
            }
          },
          function(err) {
            toastr.error("Registration Failed");
          }
        );
    }
  };
});

app.controller("surgeonRegisterController", function(
  $scope,
  $http,
  validationService,
  $rootScope,
  $state
) {
  $scope.genderValues = ["Male", "Female", "Other"];
  $scope.toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  $scope.textChanged = function() {
      if ($scope.signup.pin.length === 6) {
        $scope.loader = true;
        $http.get("/pincode/" + $scope.signup.pin).then(function(response) {
          if (response.data.length > 0) {
            $scope.signup.city = response.data[0].districtname;
            var stateName = response.data[0].statename.toLowerCase();
            $scope.signup.state = $scope.toTitleCase(stateName);
            $scope.loader = false;
          } else {
            alert("Invalid Zip Code");
            $scope.signup.pin = null;
            $scope.signup.state = null;
            $scope.signup.city = null;
            $scope.loader = false;
          }
        });
      }
  };

  $scope.submit = function() {
    $scope.signupFinal = {};
    if (validationService.surgeonValidation()) {
      $("#signupModal").modal();
      $scope.userIDerror = "";
      $scope.signupFinal.username = $scope.signup.email;
    }
  };

  $scope.signupfn = function(profile) {
    if ($scope.signupFinal.password !== $scope.signupFinal.passwordreenter) {
      $scope.showError = true;
      return;
    }
    if ($scope.signupForm.$valid) {
      $scope.signup.profile = profile;
      $scope.signupFinal.profile = profile;
      delete $scope.signupFinal.passwordreenter;

      $http
        .post("/auth/signup", {
          contactInfo: $scope.signup,
          authInfo: $scope.signupFinal
        })
        .then(
          function(data) {
            if (data.data.alert == "userIDError") {
              $scope.userIDerror = "User ID not available. Try a new one";
            } else {
              $("#signupModal").modal("toggle");
              toastr.success(
                "Thank you! Your Registration form was successfully submitted. Confirmation mail will be sent to you once its verified."
              );
              $state.go("home");
            }
          },
          function(err) {
            toastr.error("Registration Failed");
          }
        );
    }
  };
});

app.controller("forgotPassController", function($scope, $http) {
  $scope.forgotPassSubmit = function() {
    $scope.showSuccessText = true;
    $http.post("/auth/forgotPassword", { username: $scope.username }).then(
      function(data) {
        console.log("mail successfully sent");
      },
      function(err) {
        console.log(err);
      }
    );
  };
});

app.controller("menubarController", function(
  $scope,
  $http,
  $rootScope,
  $state,
  $location,
  $anchorScroll
) {
  $scope.logout = function() {
    $rootScope.userLoggedin = false;
    localStorage.removeItem("DantalayaUser", JSON.stringify($scope.user));
    $http.get("/auth/logout").then(
      function(data) {
        console.log("logout success");
        $state.go("home");
        $rootScope.userType = undefined;
        $rootScope.userLoggedin = false;
        $rootScope.userId = undefined;
        $rootScope.userData = undefined;
        localStorage.removeItem("DantalayaUser");
        $rootScope.token = undefined;
      },
      function(err) {
        console.log(err);
      }
    );
    $state.go("home");
  };

  $scope.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  };
});

app.controller("profileController", function(
  $scope,
  $http,
  $rootScope,
  $state
) {
  $rootScope.nobank = false;
  $scope.signup = {};
  $scope.signup.photo = "../images/doctor1.png";

  $scope.$on("fileSizeError", function() {
    $scope.showError = true;
    $scope.$apply();
  });

  $http.post("/getprofile", { userid: $rootScope.userId }).then(
    function(data) {
      $scope.signup = data.data.data;

      $scope.signup.dob = new Date($scope.signup.dob);

      $scope.bank = $scope.signup.bank;
    },
    function(err) {
      toastr.error(err);
    }
  );

  $scope.save = function() {
    $http
      .post("/profilesave", {
        userid: $rootScope.userId,
        data: $scope.signup
      })
      .then(
        function(data) {
          toastr.success("Your Changes Have Been Saved");
        },
        function(err) {
          toastr.error(err);
        }
      );
  };

  $scope.openBankModal = function() {
    $("#bankdetailsmodal").modal("show");
  };

  $scope.updateBankDetails = function() {
    $scope.error = false;
    if ($scope.bankForm.$valid) {
      if ($scope.bank.bankaccno !== $scope.bank.rebankaccno) {
        $scope.error = true;
        return;
      }
      var bankdetails = angular.copy($scope.bank);
      delete bankdetails.rebankaccno;
      $http
        .post("/updateBankDetails", {
          userid: $rootScope.userId,
          bankdata: bankdetails,
          userdata: $scope.signup
        })
        .then(
          function(data) {
            toastr.success("Bank Details Updated Successfully");
          },
          function(err) {
            $scope.apierror = err.data;
          }
        );
    }
  };
});

app.controller("changePassController", function(
  $scope,
  $http,
  $rootScope,
  $state
) {
  $scope.changepass = function() {
    if ($scope.pass.newpass !== $scope.pass.newpassfinal) {
      $scope.showError = true;
      return false;
    }

    delete $scope.pass.newpassfinal;

    $http
      .post("/changepassword", {
        userid: $rootScope.userId,
        data: $scope.pass
      })
      .then(
        function(data) {
          if (data.data == "failure") {
            toastr.error(
              "Entered Old password is wrong.Kindly Enter the right one"
            );
          } else {
            toastr.success("Your Changes Have Been Saved");
          }
        },
        function(err) {
          toastr.error(err);
        }
      );
  };
});
app.directive("appFilereader", function($q) {
  var slice = Array.prototype.slice;

  return {
    restrict: "A",
    require: "?ngModel",
    link: function(scope, element, attrs, ngModel) {
      if (!ngModel) return;

      ngModel.$render = function() {};

      element.bind("change", function(e) {
        var element = e.target;
        if (element.files[0].size > attrs.size) {
          scope.$emit("fileSizeError");
          return false;
        }

        $q
          .all(slice.call(element.files, 0).map(readFile))
          .then(function(values) {
            if (element.multiple) ngModel.$setViewValue(values);
            else ngModel.$setViewValue(values.length ? values[0] : null);
          });

        function readFile(file) {
          var deferred = $q.defer();

          var reader = new FileReader();
          reader.onload = function(e) {
            deferred.resolve(e.target.result);
          };
          reader.onerror = function(e) {
            deferred.reject(e);
          };
          reader.readAsDataURL(file);

          return deferred.promise;
        }
      }); //change
    } //link
  }; //return
});

app.filter("capitalize", function() {
  return function(input) {
    if (input) {
      if (input.indexOf(" ") !== -1) {
        var inputPieces, i;

        input = input.toLowerCase();
        inputPieces = input.split(" ");

        for (i = 0; i < inputPieces.length; i++) {
          inputPieces[i] = capitalizeString(inputPieces[i]);
        }

        return inputPieces.toString().replace(/,/g, " ");
      } else {
        input = input.toLowerCase();
        return capitalizeString(input);
      }
    }

    function capitalizeString(inputString) {
      return (
        inputString.substring(0, 1).toUpperCase() + inputString.substring(1)
      );
    }
  };
});

app.controller("formCtrl", function($scope, $http, $location) {
  $scope.contactName = null;
  $scope.contactEmail = null;
  $scope.contactPhone = null;
  $scope.contactMessage = null;
  $scope.contactForms = function() {
    var dataObj = {
      contactName: $scope.contactName,
      contactEmail: $scope.contactEmail,
      contactPhone: $scope.contactPhone,
      contactMessage: $scope.contactMessage
    };
    var res = $http.post("/contactmailsend", dataObj);
    res.success(function(data, status, headers, config) {
      alert("We have received your response. We will get back to you shortly!");
      $location.path("/#/home");
    });
    res.error(function(data, status, headers, config) {
      alert("failure message: " + JSON.stringify({ data: data }));
    });
  };
});

app.filter("searchFilter", function() {
  return function(data, search) {
    if (search) {
      var out = data.filter(function(obj) {
        if (obj.data.firstname && obj.data.lastname) {
          if (!obj.data.username) {
            return (
              obj.data.firstname.toLowerCase().includes(search.toLowerCase()) ||
              obj.data.lastname.toLowerCase().includes(search.toLowerCase())
            );
          } else {
            return (
              obj.data.firstname.toLowerCase().includes(search.toLowerCase()) ||
              obj.data.lastname.toLowerCase().includes(search.toLowerCase()) ||
              obj.data.username.toLowerCase().includes(search.toLowerCase())
            );
          }
        }
      });
      return out;
    } else {
      return data;
    }
  };
});

app.controller("addPatientController", function(
  $scope,
  $http,
  $rootScope,
  $state
) {
  $scope.checkPatient = function() {
    if ($scope.searchPatient.$valid) {
      var email = $("#example-email");
      var phone = $("#example-phone");
      $http
        .post("/searchpatientdetails", {
          email: $(email).val(),
          phone: $(phone).val()
        })
        .then(function(data) {
          if (data.data.alert) {
            $scope.noMatches = true;
            $scope.queriedPatients = [];
          } else {
            $scope.noMatches = false;
            $scope.queriedPatients = data.data;
          }
        });
    }
  };

  $scope.linkPatient = function(id, dataa) {
    var agree = confirm("Are You Sure You Want to Add the Patient");
    if (agree == true) {
      $http
        .post("/addPatientToDoctor", {
          patientId: id,
          doctorId: $rootScope.userId
        })
        .then(function(data) {
          if (data.data == "success") {
            toastr.success("Patient Successfully Added");
            $state.go("doctor.treatmentDetails", { data: dataa });
          } else {
            toastr.warning(data.data);
          }
        });
    } else {
      return false;
    }
  };
});

app.controller("addNewPatientController", function(
  $scope,
  $http,
  $rootScope,
  $state,
  $window,
  $stateParams
) {
  $scope.signup = {};
  if ($stateParams.data.length) {
    $scope.dependant = "Dependant";
    $scope.signup.email = $stateParams.data;
  }
  $scope.addNewPatient = addNewPatient;
  function addNewPatient() {
    if ($stateParams.data.length) {
      addNewPatientasDependant();
      return;
    }
    $scope.signup.addedFromDoctor = true;
    $scope.signup.profile = "patient";
    $http
      .post("/addNewPatient", {
        data: $scope.signup,
        doctorId: $rootScope.userId
      })
      .then(function(data) {
        if (data.data.success) {
          toastr.success("Patient Successfully Added");
          $state.go("doctor.treatmentDetails", data.data);
        } else if (data.data.emailAlreadyPresent) {
          $("#dependantModal").modal("show");
        } else {
          toastr.warning(data.data);
        }
      });
  }

  $scope.addNewPatientasDependant = addNewPatientasDependant;
  function addNewPatientasDependant() {
    $scope.signup.addedFromDoctor = true;
    $scope.signup.profile = "patient";
    $http
      .post("/addNewPatientasDependant", {
        data: $scope.signup,
        doctorId: $rootScope.userId
      })
      .then(function(data) {
        if (data.data.success) {
          toastr.success("Patient Successfully Added");
          $state.go("doctor.treatmentDetails", data.data);
        } else {
          toastr.warning(data.data);
        }
      });
  }
});

app.controller("viewAllPatientsController", function(
  $scope,
  $http,
  $rootScope,
  $state
) {
  $scope.$on("fetchedUserData", function() {
    runHome();
  });

  $scope.formatDate = function(data) {
    return new Date(data);
  };

  function runHome() {
    $scope.todayEvents = [];
    $scope.refreshCalendar = function() {
      setTimeout(function() {
        $("#calendar").fullCalendar("refetchEvents");
      }, 300);
    };
    $http
      .post("/viewAllPatients", { doctorId: $rootScope.userId })
      .then(function(data) {
        $scope.allPatients = data.data;
      });

    $http
      .post("/viewEvents", { doctorId: $rootScope.userId })
      .then(function(data) {
        if (data.data.data) {
          $scope.allEventData = data.data.data.events;

          var todayDate = new Date();
          $scope.allEventData.map(function(obj) {
            var selectDate = new Date(obj.start);
            if (
              todayDate.getDate() +
                todayDate.getMonth() +
                todayDate.getFullYear() ==
              selectDate.getDate() +
                selectDate.getMonth() +
                selectDate.getFullYear()
            ) {
              $scope.todayEvents.push(obj);
              $("#calendar").fullCalendar("renderEvent", obj, true);
            }
          });
        }

        $("#calendar").fullCalendar("today");
      });

    $("#calendar").fullCalendar({
      defaultView: "agendaDay",
      selectable: true,
      selectHelper: true,
      eventLimit: true,
      timezone: false,
      events: $scope.allEventData,
      height: 700,
      eventClick: function(calEvent, jsEvent, view) {
        if (calEvent.className.includes("openAppointment")) {
          $scope.showAction = true;
          $("#confirmDialog").modal("show");
          $scope.currentEvent = calEvent;
          //$scope.currentEvent.start =  $scope.currentEvent.start._i;
          //$scope.currentEvent.end =  $scope.currentEvent.end._i;
          delete $scope.currentEvent.source;
          delete $scope.currentEvent._allDay;
          delete $scope.currentEvent._start;
          delete $scope.currentEvent._end;
          $scope.$apply();
        } else {
          $scope.showAction = false;
          $("#confirmDialog").modal("show");
          $scope.currentEvent = calEvent;
          //$scope.currentEvent.start =  $scope.currentEvent.start._i;
          //$scope.currentEvent.end =  $scope.currentEvent.end._i;
          delete $scope.currentEvent.source;
          delete $scope.currentEvent._allDay;
          delete $scope.currentEvent._start;
          delete $scope.currentEvent._end;
          $scope.$apply();
        }
      }
    });

    function updateEvent(status) {
      $http
        .post("/updateEvents", {
          doctorId: $rootScope.userId,
          data: $scope.newAllEventData,
          eventId: $scope.currentEvent.id,
          status: status,
          patientId: $scope.currentEvent.patientId
        })
        .then(function(data) {
          $("#calendar").fullCalendar("removeEvents");
          $scope.newAllEventData.map(function(obj) {
            $("#calendar").fullCalendar("renderEvent", obj, true);
          });
          var message;
          if (status == "accept") {
            message =
              "Dantalaya - Your Appointment with Dr." +
              $scope.currentEvent.doctorName +
              " for " +
              $scope.currentEvent.title +
              " at " +
              moment($scope.currentEvent.start).format("DD-MMM-YYYY hh:mm A") +
              " has been confirmed";
          } else {
            message =
              "Dantalaya - Your Appointment with Dr." +
              $scope.currentEvent.doctorName +
              " for " +
              $scope.currentEvent.title +
              " at " +
              moment($scope.currentEvent.start).format("DD-MMM-YYYY hh:mm A") +
              " has been declined";
          }

          $http
            .post("/sendSms", {
              message: message,
              phone: "+91" + $scope.currentEvent.patientPhone,
              subject: "Dantalaya Appointment"
            })
            .then(function(data) {});

          $http
            .post("/appointmentmail", {
              origin: "doctor",
              data: $scope.currentEvent,
              status: status
            })
            .then(function(data) {});
        });
    }

    $scope.changeAppointMentStatus = function(status) {
      $scope.newAllEventData = [];

      var events = $("#calendar").fullCalendar("clientEvents");
      events = events.map(function(obj, index) {
        var attrs = {
          className: obj.className,
          end: obj.end._i,
          start: obj.start._i,
          doctorUser: obj.doctorUser,
          doctorName: obj.doctorName,
          patientId: obj.patientId,
          patientName: obj.patientName,
          title: obj.title,
          doctorMail: obj.doctorMail,
          patientMail: obj.patientMail,
          patientPhone: obj.patientPhone,
          doctorPhone: obj.doctorPhone,
          id: obj.id
        };

        if (obj._id === $scope.currentEvent._id) {
          if (status == "accept") {
            attrs.className = ["confirmAppointment"];
            $scope.newAllEventData.push(attrs);
          }
        } else {
          $scope.newAllEventData.push(attrs);
        }
      });
      updateEvent(status);
    };
  }
  runHome();
});

app.controller("doctorPatientController", function(
  $scope,
  $http,
  $stateParams
) {
  $scope.patientData = $stateParams.data;

  $scope.patientData.data.dob = new Date($scope.patientData.data.dob);

  $scope.updatePatientDetails = function() {
    $http
      .post("/editDetails", {
        id: $scope.patientData._id,
        data: $scope.patientData.data
      })
      .then(function(data) {
        toastr.success("Details Successfully Updated");
      });
  };
});

app.controller("PatientTreatmentDetailsController", function(
  $scope,
  $http,
  $rootScope,
  $state,
  $stateParams,
  uiGridConstants
) {
  $("#myTabs a").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
  $scope.treatmentHistory = [];
  $scope.patientData = $rootScope.userData;

  $scope.payOnline = function() {
    /*$scope.a = Instamojo.open("https://instamojo.com/@Dantalayaindia", function(obj){
			console.log(obj);
		});*/
    if ($scope.pendingAmount.amountLeft < $("#payAmount").val()) {
      toastr.warning(
        "Amount to be Paid exceeds the total cost of the Treatment. Kindly Re-check the amount"
      );
      return;
    }

    $scope.bill = {};
    $scope.bill.profile = "bill";
    $scope.bill.date = new Date();
    $scope.bill.chiefcomplaint = $scope.treatmentData.data.chiefcomplaint;
    $scope.bill.patientname =
      $rootScope.userData.data.firstname +
      " " +
      $rootScope.userData.data.lastname;
    $scope.bill.patientemail = $rootScope.userData.data.email;
    $scope.bill.doctorname = $scope.treatmentData.data.name;
    $scope.bill.paymentmethod = "onlinepayment";
    $scope.bill.amount = $scope.pendingAmount.amountLeft;
    var paymentRequestData = {
      purpose: "Pay",
      amount: $("#payAmount").val(),
      buyer_name: $scope.bill.patientname
      /*'email': $rootScope.userData.data.email,
				'phone': $rootScope.userData.data.mobile,*/
      /*'send_email': 'True',
				'send_sms': 'True'*/
    };

    $http
      .post("/payOnline", {
        doctorusername: $scope.treatmentData.data.doctorusername,
        data: paymentRequestData
      })
      .then(function(data) {
        var payment_request = JSON.parse(data.data.data);
        var instamojoUsername = data.data.username;
        $scope.paymentId = payment_request.id;
        Instamojo.open(payment_request.longurl);

        $scope.bill = {};
        $scope.bill.profile = "bill";
        $scope.bill.date = new Date();
        $scope.bill.chiefcomplaint = $scope.treatmentData.data.chiefcomplaint;
        $scope.bill.patientname =
          $rootScope.userData.data.firstname +
          " " +
          $rootScope.userData.data.lastname;
        $scope.bill.patientemail = $rootScope.userData.data.email;
        $scope.bill.doctorname = $scope.treatmentData.data.name;
        $scope.bill.paymentmethod = "onlinepayment";
        $scope.bill.amount = $("#payAmount").val();
        $scope.bill.instamojoPaymentRequestId = $scope.paymentId;
        $scope.bill.status = "initiated";

        $http
          .post("/addBill", {
            id: $scope.treatmentData._id,
            data: $scope.bill
          })
          .then(function(data) {
            var obj = $scope.treatmentData.data.treatmentanalysislist;

            obj[obj.length - 1].billid = data.data._id;
            obj[obj.length - 1].date = data.data.data.date;
            obj[obj.length - 1].instamojoPaymentRequestId = $scope.paymentId;
            obj[obj.length - 1].paymentmethod = $scope.bill.paymentmethod;
            obj[obj.length - 1].amountpaidbypatient = $scope.bill.amount;
            obj[obj.length - 1].status = "initiated";

            obj.push({
              treatmentanalysis: "",
              amountpaidbypatient: "",
              date: new Date()
            });
            $scope.updateTreatmentDetails();

            $http
              .post("/addToPaymentQueue", {
                id: $scope.treatmentData._id,
                paymentRequestId: $scope.paymentId,
                username: instamojoUsername
              })
              .then(function(data) {});
          });
        $scope.calculatePendingAmount();
      });
  };

  $scope.updateTreatmentDetails = function(close) {
    $http
      .post("/editDetails", {
        id: $scope.treatmentData._id,
        data: $scope.treatmentData.data,
        close: close
      })
      .then(function(data) {
        console.log("updats done");
      });
  };

  function getAllTreatments(fromHistory) {
    if ($scope.patientData) {
      $http
        .post("/viewTreatment", { data: $scope.patientData.data.treatments })
        .then(function(data) {
          $scope.allTreatments = data.data;
          $scope.treatmentHistory = [];
          //$scope.gridOptions.data = data.data;
          $scope.allTreatments.map(function(obj) {
            if (
              Object.keys($scope.patientData.data.currenttreatment).length !== 0
            ) {
              Object.keys($scope.patientData.data.currenttreatment).map(
                function(objs) {
                  if (
                    $scope.patientData.data.currenttreatment[objs] !== obj._id
                  ) {
                    $scope.treatmentHistory.push(obj);
                  }
                }
              );
            } else {
              $scope.treatmentHistory = $scope.allTreatments;
            }
          });

          $scope.gridOptions = {
            enableFiltering: false,
            data: $scope.treatmentHistory,
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            onRegisterApi: function(gridApi) {
              $scope.gridApi = gridApi;
              gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                $scope.treatmentData = $scope.allTreatments.find(function(
                  value,
                  index
                ) {
                  return value._id == row.entity._id;
                });
                $scope.treatment = $scope.treatmentData.data;

                $("#treatmentModal").modal("show");
              });
            },
            columnDefs: [
              {
                field: "_id",
                displayName: "Treatment ID"
              },
              {
                field: "data.chiefcomplaint",
                displayName: "Chief Complaint"
              },
              {
                field: "data.startdate",
                cellFilter: "dateFilter",
                displayName: "Start Date"
              }
            ]
          };

          if ($scope.patientData.data.currenttreatment) {
            $scope.currenTreatmentIds = Object.keys(
              $scope.patientData.data.currenttreatment
            );
            $scope.currenTreatmentValues = Object.values(
              $scope.patientData.data.currenttreatment
            );
            $scope.treatmentData = $scope.allTreatments.find(function(
              value,
              index
            ) {
              return (
                value._id ==
                $scope.patientData.data.currenttreatment[
                  $scope.currenTreatmentIds[0]
                ]
              );
            });
            $scope.currenTreatments = [];
            $scope.allTreatments.map(function(value, index) {
              if ($scope.currenTreatmentValues.includes(value._id)) {
                $scope.currenTreatments.push({
                  doctor: value.data.doctorname,
                  id: value._id
                });
              }
            });
            $scope.selectedCurrenTreatmentId = $scope.currenTreatmentValues[0];
            $scope.treatment = $scope.treatmentData.data;
            if (!fromHistory) {
              $("#currentTreatment").tab("show");
            }
          }

          var paymentIds = [];
          if (!$scope.treatment) {
            return;
          }
          $scope.treatment.treatmentanalysislist.forEach(function(obj) {
            if (obj.billid) {
              paymentIds.push(obj.billid);
            }
          });

          $scope.updateCurrentTreatment = function() {
            $scope.treatmentData = $scope.allTreatments.find(function(
              value,
              index
            ) {
              return value._id == $scope.selectedCurrenTreatmentId;
            });
            $scope.treatment = $scope.treatmentData.data;
          };

          $http
            .post("/viewPayments", { data: paymentIds })
            .then(function(dataa) {
              $scope.allPayments = dataa.data;

              $scope.gridOptionsPayments = {
                enableFiltering: false,
                data: dataa.data,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                onRegisterApi: function(gridApi) {
                  $scope.gridApi = gridApi;
                  gridApi.selection.on.rowSelectionChanged($scope, function(
                    row
                  ) {
                    $scope.paymentData = $scope.allPayments.find(function(
                      value,
                      index
                    ) {
                      return value._id == row.entity._id;
                    });

                    $("#paymentModal").modal("show");
                  });
                },
                columnDefs: [
                  {
                    field: "_id",
                    displayName: "Bill ID"
                  },
                  {
                    field: "data.date",
                    displayName: "Bill Date",
                    cellFilter: "dateFilter"
                  },
                  {
                    field: "data.paymentmethod",
                    displayName: "Payment Method"
                  },
                  {
                    field: "data.amount",
                    displayName: "Bill Amount"
                  }
                ]
              };
            });
          $scope.calculatePendingAmount();
        });
    }
  }

  getAllTreatments();

  $scope.paymentsInfo = function(datas) {
    var paymentIds = [];
    datas.forEach(function(obj) {
      if (obj.billid) {
        paymentIds.push(obj.billid);
      }
    });

    $http.post("/viewPayments", { data: paymentIds }).then(function(dataa) {
      $scope.allPaymentsModal = dataa.data;

      $scope.gridOptionsPaymentsModal = {
        enableFiltering: false,
        data: dataa.data,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        onRegisterApi: function(gridApi) {
          $scope.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.paymentData = $scope.allPaymentsModal.find(function(
              value,
              index
            ) {
              return value._id == row.entity._id;
            });

            $("#paymentModal").modal("show");
          });
        },
        columnDefs: [
          {
            field: "_id",
            displayName: "Bill ID"
          },
          {
            field: "data.date",
            displayName: "Bill Date",
            cellFilter: "dateFilter"
          },
          {
            field: "data.paymentmethod",
            displayName: "Payment Method"
          },
          {
            field: "data.amount",
            displayName: "Bill Amount"
          }
        ]
      };

      $("#allPaymentsModal").modal("show");

      $scope.showAllPymentsModal = true;
    });
  };

  function formatData(obj) {
    return {
      content: [
        {
          text: "Bill Details",
          style: "header"
        },
        {
          style: "tableExample",
          table: {
            widths: ["*", "*"],
            body: [
              ["Bill ID ", obj._id],
              ["Bill Date", obj.data.date],
              ["Chief Complaint", obj.data.chiefcomplaint],
              ["Doctor Name", obj.data.doctorname],
              ["Patient Name", obj.data.patientname],
              ["Bill Amount", obj.data.amount],
              ["Payment Method", obj.data.paymentmethod]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    };
  }

  $scope.dowloadBill = function(obj) {
    var docDefinition = formatData(obj);
    pdfMake.createPdf(docDefinition).download("bill.pdf");
  };

  $scope.printBill = function(obj) {
    var docDefinition = formatData(obj);
    pdfMake.createPdf(docDefinition).print();
  };

  function formatPrescriptionData(obj) {
    bodyText = [
      [
        {
          text: "#",
          style: "tableHeader"
        },
        {
          text: "Prescription",
          style: "tableHeader"
        },
        {
          text: "Schedule",
          style: "tableHeader"
        }
      ]
    ];

    obj.map(function(each, index) {
      bodyText.push([
        index + 1,
        each.prescription ? each.prescription : "",
        each.schedule ? each.schedule : ""
      ]);
    });

    return {
      content: [
        {
          text: "Prescription",
          style: "header"
        },
        {
          style: "tableExample",
          table: {
            widths: ["5%", "*", "*"],
            headerRows: 1,
            body: bodyText
          },
          layout: "lightHorizontalLines"
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black"
        }
      }
    };
  }
  $scope.downloadPrescription = function(obj) {
    var docDefinition = formatPrescriptionData(obj);
    pdfMake.createPdf(docDefinition).download("prescription.pdf");
  };

  $scope.printPrescription = function(obj) {
    var docDefinition = formatPrescriptionData(obj);
    pdfMake.createPdf(docDefinition).print();
  };

  $("#treatmentHistory").click(function() {
    $scope.showAllTreatments = false;
    getAllTreatments(true);
    $scope.showAllTreatments = true;
    //$scope.$apply();
  });

  $("#paymentInfo").click(function() {
    $scope.showAllPayments = true;
    $scope.$apply();
  });

  $("#currentTreatment").click(function() {
    $scope.treatment = $scope.treatmentData.data;
    $scope.$apply();
  });

  $scope.toggleFiltering = function() {
    $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  };

  $scope.showPaymentFn = function() {
    $scope.showPayment = true;
  };

  $scope.calculatePendingAmount = function() {
    $scope.pendingAmount = {
      amountLeft: null,
      limit: ""
    };
    var pending = $scope.treatment.treatmentcost;
    $scope.treatment.treatmentanalysislist.map(function(obj) {
      if (obj.amountpaidbypatient) {
        if (obj.status !== "initiated") {
          pending = pending - obj.amountpaidbypatient;
        }
      }
    });
    $scope.pendingAmount.amountLeft = pending;
    if (pending > 0) {
      $scope.pendingAmount.limit = "under";
    } else if (pending < 0) {
      $scope.pendingAmount.limit = "exceeded";
    } else {
      $scope.pendingAmount.limit = "onpar";
    }
    $scope.payAmount = angular.copy($scope.pendingAmount.amountLeft);
    $scope.pendingAmountValue = $scope.pendingAmount.amountLeft;
  };
});

app.controller("treatmentDetailsController", function(
  $scope,
  $http,
  $rootScope,
  $state,
  $stateParams,
  uiGridConstants
) {
  $scope.treatmentHistory = [];
  $scope.$on("fileSizeError", function() {
    $scope.showError = true;
    $scope.$apply();
  });

  $("#myTabs a").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
  $scope.treatment = {};
  $scope.treatment.treatmentanalysislist = [
    {
      treatmentanalysis: "",
      amountpaidbypatient: "",
      date: new Date()
    }
  ];
  $scope.patientData = $stateParams.data;

  function getAllTreatments(fromHistory) {
    if ($scope.patientData) {
      $http
        .post("/getuserDetailsById", { id: $stateParams.data._id })
        .then(function(userdata) {
          $scope.patientData = userdata.data;

          $http
            .post("/viewTreatment", {
              data: $scope.patientData.data.treatments,
              doctorusername: $rootScope.userData.data.username
            })
            .then(function(data) {
              $scope.allTreatments = data.data;
              $scope.treatmentHistory = [];
              //$scope.gridOptions.data = data.data;
              $scope.allTreatments.map(function(obj) {
                if (
                  Object.keys($scope.patientData.data.currenttreatment)
                    .length !== 0
                ) {
                  Object.keys($scope.patientData.data.currenttreatment).map(
                    function(objs) {
                      if (
                        $scope.patientData.data.currenttreatment[objs] !==
                        obj._id
                      ) {
                        $scope.treatmentHistory.push(obj);
                      }
                    }
                  );
                } else {
                  $scope.treatmentHistory = $scope.allTreatments;
                }
              });

              $scope.gridOptions = {
                enableFiltering: false,
                data: $scope.treatmentHistory,
                enableRowSelection: true,
                enableRowHeaderSelection: false,
                multiSelect: false,
                onRegisterApi: function(gridApi) {
                  $scope.gridApi = gridApi;
                  gridApi.selection.on.rowSelectionChanged($scope, function(
                    row
                  ) {
                    $scope.treatmentData = $scope.allTreatments.find(function(
                      value,
                      index
                    ) {
                      return value._id == row.entity._id;
                    });
                    $scope.treatment = $scope.treatmentData.data;

                    $("#treatmentModal").modal("show");
                  });
                },
                columnDefs: [
                  {
                    field: "_id",
                    displayName: "Treatment ID"
                  },
                  {
                    field: "data.chiefcomplaint",
                    displayName: "Chief Complaint"
                  },
                  {
                    field: "data.startdate",
                    cellFilter: "dateFilter",
                    displayName: "Start Date"
                  }
                ]
              };

              if ($scope.patientData.data.currenttreatment) {
                $scope.treatmentData = $scope.allTreatments.find(function(
                  value,
                  index
                ) {
                  return (
                    value._id ==
                    $scope.patientData.data.currenttreatment[
                      $rootScope.userData._id
                    ]
                  );
                });
                if ($scope.treatmentData) {
                  $scope.treatment = $scope.treatmentData.data;
                  if (!fromHistory) {
                    $("#currentTreatment").tab("show");
                  }
                }
              }

              var paymentIds = [];
              $scope.treatment.treatmentanalysislist.forEach(function(obj) {
                if (obj.billid) {
                  paymentIds.push(obj.billid);
                }
              });

              $http
                .post("/viewPayments", { data: paymentIds })
                .then(function(dataa) {
                  $scope.allPayments = dataa.data;

                  $scope.gridOptionsPayments = {
                    enableFiltering: false,
                    data: dataa.data,
                    enableRowSelection: true,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    onRegisterApi: function(gridApi) {
                      $scope.gridApi = gridApi;
                      gridApi.selection.on.rowSelectionChanged($scope, function(
                        row
                      ) {
                        $scope.paymentData = $scope.allPayments.find(function(
                          value,
                          index
                        ) {
                          return value._id == row.entity._id;
                        });

                        $("#paymentModal").modal("show");
                      });
                    },
                    columnDefs: [
                      {
                        field: "_id",
                        displayName: "Bill ID"
                      },
                      {
                        field: "data.date",
                        displayName: "Bill Date",
                        cellFilter: "dateFilter"
                      },
                      {
                        field: "data.paymentmethod",
                        displayName: "Payment Method"
                      },
                      {
                        field: "data.amount",
                        displayName: "Bill Amount"
                      }
                    ]
                  };
                });

              $scope.calculatePendingAmount();
            });
        });
    }
  }

  getAllTreatments();

  $scope.paymentsInfo = function(datas) {
    var paymentIds = [];
    datas.forEach(function(obj) {
      if (obj.billid) {
        paymentIds.push(obj.billid);
      }
    });

    $http.post("/viewPayments", { data: paymentIds }).then(function(dataa) {
      $scope.allPaymentsModal = dataa.data;

      $scope.gridOptionsPaymentsModal = {
        enableFiltering: false,
        data: dataa.data,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        multiSelect: false,
        onRegisterApi: function(gridApi) {
          $scope.gridApi = gridApi;
          gridApi.selection.on.rowSelectionChanged($scope, function(row) {
            $scope.paymentData = $scope.allPaymentsModal.find(function(
              value,
              index
            ) {
              return value._id == row.entity._id;
            });

            $("#paymentModal").modal("show");
          });
        },
        columnDefs: [
          {
            field: "_id",
            displayName: "Bill ID"
          },
          {
            field: "data.date",
            displayName: "Bill Date",
            cellFilter: "dateFilter"
          },
          {
            field: "data.paymentmethod",
            displayName: "Payment Method"
          },
          {
            field: "data.amount",
            displayName: "Bill Amount"
          }
        ]
      };

      $("#allPaymentsModal").modal("show");

      $scope.showAllPymentsModal = true;
    });
  };

  function formatData(obj) {
    return {
      content: [
        {
          text: "Bill Details",
          style: "header"
        },
        {
          style: "tableExample",
          table: {
            widths: ["*", "*"],
            body: [
              ["Bill ID ", obj._id],
              ["Bill Date", obj.data.date],
              ["Chief Complaint", obj.data.chiefcomplaint],
              ["Doctor Name", obj.data.doctorname],
              ["Patient Name", obj.data.patientname],
              ["Bill Amount", obj.data.amount],
              ["Payment Method", obj.data.paymentmethod]
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    };
  }

  $scope.dowloadBill = function(obj) {
    var docDefinition = formatData(obj);
    pdfMake.createPdf(docDefinition).download("bill.pdf");
  };

  $scope.printBill = function(obj) {
    var docDefinition = formatData(obj);
    pdfMake.createPdf(docDefinition).print();
  };

  function formatPrescriptionData(obj) {
    bodyText = [
      [
        {
          text: "#",
          style: "tableHeader"
        },
        {
          text: "Prescription",
          style: "tableHeader"
        },
        {
          text: "Schedule",
          style: "tableHeader"
        }
      ]
    ];

    obj.map(function(each, index) {
      bodyText.push([
        index + 1,
        each.prescription ? each.prescription : "",
        each.schedule ? each.schedule : ""
      ]);
    });

    return {
      content: [
        {
          text: "Prescription",
          style: "header"
        },
        {
          style: "tableExample",
          table: {
            widths: ["5%", "*", "*"],
            headerRows: 1,
            body: bodyText
          },
          layout: "lightHorizontalLines"
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black"
        }
      }
    };
  }
  $scope.downloadPrescription = function(obj) {
    var docDefinition = formatPrescriptionData(obj);
    pdfMake.createPdf(docDefinition).download("prescription.pdf");
  };

  $scope.printPrescription = function(obj) {
    var docDefinition = formatPrescriptionData(obj);
    pdfMake.createPdf(docDefinition).print();
  };

  $("#newTreamtment").click(function() {
    $scope.treatment = {};
    $scope.treatment.treatmentanalysislist = [
      {
        treatmentanalysis: "",
        amountpaidbypatient: "",
        date: new Date()
      }
    ];
    $scope.treatment.showTreatment = false;
    //$scope.$apply();
  });

  $("#treatmentHistory").click(function() {
    $scope.showAllTreatments = false;
    getAllTreatments(true);
    $scope.showAllTreatments = true;
    //$scope.$apply();
  });

  $("#paymentInfo").click(function() {
    $scope.showAllPayments = true;
    $scope.$apply();
  });

  $("#currentTreatment").click(function() {
    $scope.treatment = $scope.treatmentData.data;
    $scope.$apply();
  });

  $scope.addTreatment = function(fromsubaddTreatment, obj) {
    if ($scope.treatment.showTreatment) {
      if (!$scope.treatment.treatmentcost) {
        toastr.warning(
          "Treatment Estimated Cost cannot be empty if Availed Treatment."
        );
        return;
      }
    }

    $scope.treatment.profile = "treatment";
    $scope.treatment.startdate = new Date();
    $scope.treatment.doctorname =
      $rootScope.userData.data.firstname +
      " " +
      $rootScope.userData.data.lastname;
    $scope.treatment.doctorusername = $rootScope.userData.data.username;
    $scope.treatment.doctordciregno = $rootScope.userData.data.dciregno;
    $scope.treatment.doctoruserid = $rootScope.userData._id;

    if (fromsubaddTreatment) {
      $http
        .post("/addTreatment", {
          id: $scope.patientData._id,
          data: $scope.treatment
        })
        .then(function(data) {
          $("#currentTreatment").tab("show");
          $scope.treatmentData = data.data;
          $scope.treatment = data.data.data;
          $scope.subaddTreatment(obj);
        });
    } else {
      $http
        .post("/addTreatment", {
          id: $scope.patientData._id,
          data: $scope.treatment
        })
        .then(function(data) {
          toastr.success("Treatment Details Successfully Added");
          $("#currentTreatment").tab("show");
          $scope.treatmentData = data.data;
          $scope.treatment = data.data.data;
        });
    }
  };

  $scope.updateTreatmentDetails = function(close) {
    $http
      .post("/editDetails", {
        id: $scope.treatmentData._id,
        data: $scope.treatmentData.data
      })
      .then(function(data) {
        if (close == "close") {
          $http
            .post("/closeTreatment", { id: $scope.patientData._id })
            .then(function(data) {
              toastr.success("Treatment Successfully Closed");
              $("#newTreamtment").click();
              /*Object.values($scope.patientData.data.currenttreatment).map(function(obj,index){
						if(obj == $scope.treatmentData._id){
							delete $scope.patientData.data.currenttreatment[Object.keys($scope.patientData.data.currenttreatment)[index]];
						}
					});*/
              $scope.treatmentData = undefined;
            });
        } else {
          toastr.success("Treatment Details Successfully Updated");
        }
      });
  };

  $scope.toggleFiltering = function() {
    $scope.gridOptions.enableFiltering = !$scope.gridOptions.enableFiltering;
    $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  };

  $scope.invokeAvailTreatment = function() {
    $("#newTreatmentCheckbox").click();
  };

  $scope.subaddTreatment = function(obj) {
    if (!$scope.treatment.treatmentcost) {
      toastr.warning("Treatment Estimated Cost cannot be Empty");
      return;
    }
    if (!obj[obj.length - 1].treatmentanalysis) {
      toastr.warning("Treatment Analysis cannot be Empty");
      return;
    }
    if (
      obj[obj.length - 1].amountpaidbypatient == null ||
      obj[obj.length - 1].amountpaidbypatient == undefined ||
      obj[obj.length - 1].amountpaidbypatient === ""
    ) {
      toastr.warning("Amount Paid by Patient cannot be Empty");
      return;
    }
    if ($scope.pendingAmountValue < obj[obj.length - 1].amountpaidbypatient) {
      toastr.warning(
        "Amount to be Paid exceeds the total cost of the Treatment. Kindly Re-check the amount"
      );
      return;
    }
    if (!$scope.treatmentData) {
      $scope.addTreatment(true, obj);
      return;
    }

    $scope.bill = {};
    $scope.bill.profile = "bill";
    $scope.bill.date = new Date();
    $scope.bill.chiefcomplaint = $scope.treatment.chiefcomplaint;
    $scope.bill.patientname =
      $scope.patientData.data.firstname +
      " " +
      $scope.patientData.data.lastname;
    $scope.bill.patientemail = $scope.patientData.data.email;
    $scope.bill.doctorname =
      $rootScope.userData.data.firstname +
      " " +
      $rootScope.userData.data.lastname;
    $scope.bill.paymentmethod = "directpayment";
    $scope.bill.amount = obj[obj.length - 1].amountpaidbypatient;

    $http
      .post("/addBill", {
        id: $scope.treatmentData._id,
        data: $scope.bill
      })
      .then(function(data) {
        obj[obj.length - 1].billid = data.data._id;
        obj[obj.length - 1].date = data.data.data.date;
        obj[obj.length - 1].paymentmethod = $scope.bill.paymentmethod;
        obj.push({
          treatmentanalysis: "",
          amountpaidbypatient: "",
          date: new Date()
        });
        $scope.treatment.treatmentanalysislist = obj;
        var chargesheetData = {
          billid: data.data._id,
          amount: $scope.bill.amount,
          time: new Date(),
          treatmentId: $scope.treatmentData._id
        };

        var month = new Date().toLocaleString("en-us", { month: "long" });
        if ($scope.bill.amount !== 0) {
          $http
            .post("/addToChargeSheet", {
              month: month,
              year: new Date().getFullYear(),
              data: chargesheetData,
              doctorid: $rootScope.userData._id
            })
            .then(function(data) {
              $scope.updateTreatmentDetails();
            });
        }

        $scope.calculatePendingAmount();
      });
  };

  $scope.calculatePendingAmount = function() {
    $scope.pendingAmount = {
      amountLeft: null,
      limit: ""
    };
    var pending = $scope.treatment.treatmentcost;
    $scope.treatment.treatmentanalysislist.map(function(obj) {
      if (obj.amountpaidbypatient) {
        if (obj.status !== "initiated") {
          pending = pending - obj.amountpaidbypatient;
        }
      }
    });
    $scope.pendingAmount.amountLeft = pending;
    if (pending > 0) {
      $scope.pendingAmount.limit = "under";
    } else if (pending < 0) {
      $scope.pendingAmount.limit = "exceeded";
    } else {
      $scope.pendingAmount.limit = "onpar";
    }
    $scope.pendingAmountValue = $scope.pendingAmount.amountLeft;
  };

  $scope.closeTreatment = function() {
    $scope.calculatePendingAmount();
    if ($scope.treatment.patientacceptedtreatment) {
      if ($scope.pendingAmount.limit == "under") {
        toastr.warning(
          "Still Pending amount Left to be Paid before you can close the treatment"
        );
        return false;
      }
      if ($scope.pendingAmount.limit == "exceeded") {
        toastr.warning(
          "Amount paid for Treatment exceeded the original cost.Tally it before you can close the treatment"
        );
        return false;
      }
    }
    $scope.updateTreatmentDetails("close");
  };

  $scope.openDentalBox = function(num) {
    $scope.currentTooth = num;
    $("#dentalBox").modal("show");
  };

  $scope.addPrescription = function() {
    console.log($scope.newpresciption);
    if ($scope.newpresciption == null) {
      alert("Prescription cannot be empty");
    } else {
      if (!$scope.treatment.prescription) {
        $scope.treatment.prescription = [];
        $scope.treatment.prescription.push(angular.copy($scope.newpresciption));
      } else if ($scope.treatment.prescription.length == 0) {
        $scope.treatment.prescription = [];
        $scope.treatment.prescription.push(angular.copy($scope.newpresciption));
      } else {
        $scope.treatment.prescription.push(angular.copy($scope.newpresciption));
      }
      // $scope.newpresciption = {prescription : '', schedule: ''};
      $scope.newpresciption = null;
    }
  };

  $scope.deletePrescription = function(index) {
    $scope.treatment.prescription.splice(index, 1);
  };
});

app.filter("dateFilter", function($filter) {
  return function(input) {
    return $filter("date")(input);
  };
});

app.controller("schedulerController", function(
  $scope,
  $state,
  $http,
  $rootScope
) {
  $scope.currentEvent;
  $http
    .post("/viewEvents", { doctorId: $rootScope.userId })
    .then(function(data) {
      $scope.allEventData = data.data.data.events;
      $scope.allEventData.map(function(obj) {
        $("#calendar").fullCalendar("renderEvent", obj, true);
      });
    });

  $("#calendar").fullCalendar({
    header: {
      left: "prev,next today",
      center: "title",
      right: "month,agendaWeek,agendaDay"
    },
    eventClick: function(calEvent, jsEvent, view) {
      if (calEvent.className.includes("openAppointment")) {
        $scope.showAction = true;
        $("#confirmDialog").modal("show");
        $scope.currentEvent = calEvent;
        //$scope.currentEvent.start =  $scope.currentEvent.start._i;
        //$scope.currentEvent.end =  $scope.currentEvent.end._i;
        delete $scope.currentEvent.source;
        delete $scope.currentEvent._allDay;
        delete $scope.currentEvent._start;
        delete $scope.currentEvent._end;
        $scope.$apply();
      } else {
        $scope.showAction = false;
        $("#confirmDialog").modal("show");
        $scope.currentEvent = calEvent;
        //$scope.currentEvent.start =  $scope.currentEvent.start._i;
        //$scope.currentEvent.end =  $scope.currentEvent.end._i;
        delete $scope.currentEvent.source;
        delete $scope.currentEvent._allDay;
        delete $scope.currentEvent._start;
        delete $scope.currentEvent._end;
        $scope.$apply();
      }
    },
    defaultView: "month",
    navLinks: true, // can click day/week names to navigate views
    selectable: true,
    selectHelper: true,
    longpressDelay: 10,
    timezone: false,
    select: function(start, end) {
      if ($("#calendar").fullCalendar("getView").name == "month") {
        return false;
      }

      var title = prompt("Event Title:");
      var eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        $scope.eventData = eventData;
        addEvent();
      }
      $("#calendar").fullCalendar("unselect");
    },
    editable: true,
    eventLimit: true,
    events: $scope.allEventData
  });

  function addEvent() {
    $http
      .post("/addEvent", {
        doctorId: $rootScope.userId,
        data: $scope.eventData
      })
      .then(function(data) {
        $("#calendar").fullCalendar("renderEvent", $scope.eventData, true);
      });
  }

  function updateEvent(status) {
    $http
      .post("/updateEvents", {
        doctorId: $rootScope.userId,
        data: $scope.newAllEventData,
        eventId: $scope.currentEvent.id,
        status: status,
        patientId: $scope.currentEvent.patientId
      })
      .then(function(data) {
        $("#calendar").fullCalendar("removeEvents");
        $scope.newAllEventData.map(function(obj) {
          $("#calendar").fullCalendar("renderEvent", obj, true);
        });
        var message;
        if (status == "accept") {
          message =
            "Dantalaya - Your Appointment with " +
            $scope.currentEvent.doctorName +
            " for " +
            $scope.currentEvent.title +
            " at " +
            moment($scope.currentEvent.start).format("DD-MMM-YYYY hh:mm A") +
            " has been confirmed";
        } else {
          message =
            "Dantalaya - Your Appointment with " +
            $scope.currentEvent.doctorName +
            " for " +
            $scope.currentEvent.title +
            " at " +
            moment($scope.currentEvent.start).format("DD-MMM-YYYY hh:mm A") +
            " has been declined";
        }

        $http
          .post("/sendSms", {
            message: message,
            phone: "+91" + $scope.currentEvent.patientPhone,
            subject: "Dantalaya Appointment"
          })
          .then(function(data) {});

        $http
          .post("/appointmentmail", {
            origin: "doctor",
            data: $scope.currentEvent,
            status: status
          })
          .then(function(data) {});
      });
  }

  $scope.formatDate = function(data) {
    return new Date(data);
  };
  $scope.changeAppointMentStatus = function(status) {
    $scope.newAllEventData = [];

    var events = $("#calendar").fullCalendar("clientEvents");
    events = events.map(function(obj, index) {
      var attrs = {
        className: obj.className,
        end: obj.end._i,
        start: obj.start._i,
        doctorUser: obj.doctorUser,
        doctorName: obj.doctorName,
        patientId: obj.patientId,
        patientName: obj.patientName,
        title: obj.title,
        doctorMail: obj.doctorMail,
        patientMail: obj.patientMail,
        patientPhone: obj.patientPhone,
        doctorPhone: obj.doctorPhone,
        id: obj.id
      };

      if (obj._id === $scope.currentEvent._id) {
        if (status == "accept") {
          attrs.className = ["confirmAppointment"];
          $scope.newAllEventData.push(attrs);
        }
      } else {
        $scope.newAllEventData.push(attrs);
      }
    });
    updateEvent(status);
  };
});
