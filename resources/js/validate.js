
function validRegisteration() {

    $("#signUpForm").validate({
        rules: {
            userName: {
                required: true,
                minlength: 1
            },
            password: {
                required: true,
                minlength: 6,
                legalPassword: true,
            },
            firstName: {
                required: true,
                minlength: 1,
                legalName: true
            },
            lastName: {
                required: true,
                minlength: 1,
                legalName: true
            },
            email: {
                required: true,
                email: true,
                legalEmail: true
            },
            dateOfBirth: {
                required: true,
            }
        },
        messages: {
            userName: {
                required: "Plase provide a userName",
                minlength: "Your userName must be at least 1 character long."
            },
            password: {
                required: "Plase provide a password",
                minlength: "Your password must be at least 6 characters long."
            },
            fullName: {
                required: "Plase provide a full name",
                minlength: "Your full name must be at least 1 character long."
            },
            lastName: {
                required: "Plase provide a last ame",
                minlength: "Your last name must be at least 1 character long."
            },
            email: {
                required: "Plase provide an email",
                email: "Your email is not valid."
            },
            dateOfBirth: {
                required: "Plase provide a birthdate",
            }
        }

    })
    return $("#signUpForm").valid();

};

$.validator.addMethod("legalPassword", function(value, element) {
    return this.optional( element ) || /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/.test( value );
}, "Your password should contains letters and numbers.");

$.validator.addMethod("legalName", function(value, element) {
    return this.optional( element ) || /^[a-zA-Z]+$/.test( value );
}, "Your name should contains only letters.");

$.validator.addMethod("legalEmail", function(value, element) {
    return this.optional( element ) || /\S+@\S+\.\S+/.test( value );
}, "Your email is not valid.");

/*
$.validator.addMethod("legalDate", function() {
    var dateString = $("#birthdate").value;
    var birthDate = new Date(dateString);
    var today = new Date();
    if ( birthDate > today ) { 
        $('#birthdate').after('<p>You cannot enter a date in the future!.</p>');
        return false;
    }
    return true;
});
*/

function validSettings() {

    $("#settingsForm").validate({
        rules: {
            keyUp: {
                required: true
            },
            keyDown: {
                required: true
            },
            keyLeft: {
                required: true
            },
            keyRight: {
                required: true
            },
            numBalls: {
                required: true,
                min: 50,
                max: 90
            },
            color1: {
                required: true,
                color1NotChosen: true,
                diffColors: true
            },
            color2: {
                required: true,
                color2NotChosen: true
            },
            color3: {
                required: true,
                color3NotChosen: true
            },
            time: {
                required: true,
                min: 60
            },
            monsters: {
                required: true,
                monsterNotChosen: true
            }
        
        },
        messages: {
            keyUp: {
                required: "Please press a key"
            },
            keyDown: {
                required: "Please press a key"
            },
            keyLeft: {
                required: "Please press a key"
            },
            keyRight: {
                required: "Please press a key"
            },
            numBalls: {
                required: "Please choose number of balls",
                min: "The minumun number of balls is 60",
                max: "The minumun number of balls is 90"
            },
            color1: {
                required: "Please choose the first color",
                diffColors: "Please choose differnt colors"
            },
            color2: {
                required:  "Please choose the first color"
            },
            color3: {
                required:  "Please choose the first color",
            },
            time: {
                required:  "Please define the time",
                min:  "The minumun time is 60 seconds"
            },
            monsters: {
                required:  "Please choose the number of monsters"
            }
        }

    })
    return $("#settingsForm").valid();

};

$.validator.addMethod("diffColors", function(value, element) {
    var color1 = $("#Color1").value;
    var color2 = $("#Color2").value;
    var color3 = $("#Color3").value;

    return color1 != color2 && color1 != color3 && color2 != color3;
}, "Please choose different colors");

$.validator.addMethod("color1NotChosen", function(value, element) {
    var color = $("#Color1").value;
    return color != "";
}, "Please choose the first color");

$.validator.addMethod("color2NotChosen", function(value, element) {
    var color = $("#Color2").value;
    return color != "";
}, "Please choose the second color");

$.validator.addMethod("color3NotChosen", function(value, element) {
    var color = $("#Color3").value;
    return color != "";
}, "Please choose the third color");

$.validator.addMethod("monsterNotChosen", function(value, element) {
    var monster = $("#monster").value;
    return monster != "";
}, "Please choose the number of monsters");