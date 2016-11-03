var umfp = (function(options) {

    vex.defaultOptions.className = 'vex-theme-plain'

    return {

        setOptions: function(options) {
            umfp.options = options;
        },

        isLogedIn: function() {
            var accessToken = Cookies.get('accessToken');
            if (!accessToken)
                return umfp.showLogin();
            return accessToken;
        },

        showLogin: function() {

            vex.dialog.open({
                message: umfp.options.loginPopupTitle,
                input: [
                    '<input name="userName" type="text" placeholder="Username" required />',
                    '<input name="password" type="password" placeholder="Password" required />'
                ].join(''),
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {
                        text: 'Login'
                    }),
                    $.extend({}, vex.dialog.buttons.NO, {
                        text: 'Cancel'
                    })
                ],
                callback: function(data) {

                    if (data) tryToAuthenticate(data);
                }
            })


            function tryToAuthenticate(userData) {

                $.ajax({
                    type: 'POST',
                    url: umfp.options.loginUrl,
                    data: userData,
                    success: function(result) {
                        Cookies.set('accessToken', result);

                        window.location.href = umfp.options.loginSuccessRedirectionUrl;

                    },
                    error: function(err) {
                        umfp.showLogin();
                    }

                })



            }
        },

        logout: function() {
            Cookies.remove('accessToken');
            umfp.showLogin();
        },

        getAuthorizationHeader: function() {

            return { 'authorization': umfp.getAccessToken() };
        },

        getAccessToken: function() {
            return Cookies.get('accessToken');
        },

        showSignUp: function() {
            vex.dialog.open({
                message: umfp.options.signupPopupTitle,
                input: [
                    '<input name="userName" type="text" placeholder="Username" required />',
                    '<input name="password" type="password" placeholder="Password" required />',
                    '<input name="reenteredPassword" type="password" placeholder="Reenter Password" required />',
                    '<input name="firstName" type="text" placeholder="FirstName" required />',
                    '<input name="lastName" type="text" placeholder="LastName" required />',
                    '<input name="email" type="text" placeholder="Email" required />',
                    '<input name="phone" type="text" placeholder="Phone" required />',
                    '<input name="address" type="text" placeholder="Address" required />',
                    '<input name="additionalInfo" type="text" placeholder="AdditionalInfo"/>'
                ].join(''),
                buttons: [
                    $.extend({}, vex.dialog.buttons.YES, {
                        text: 'Sign Up'
                    }),
                    $.extend({}, vex.dialog.buttons.NO, {
                        text: 'Cancel'
                    })
                ],
                callback: function(data) {

                    if (data) tryToRegisterNewUser(data);
                }
            });

            function tryToRegisterNewUser(userData) {
                $.ajax({
                    type: 'POST',
                    url: umfp.options.signupUrl,
                    data: userData,
                    success: function(result) {
                        vex.dialog.alert('Thanks');
                    },
                    error: function(err) {
                        
                        vex.dialog.alert(err.responseJSON.message);
                    }
                });
            }




        }

    }

})();
