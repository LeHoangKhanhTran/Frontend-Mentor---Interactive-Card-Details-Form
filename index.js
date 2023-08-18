function Replace(s, index, replaceStr) {
    return s.substring(0, index) + replaceStr + s.substring(index + replaceStr.length);
}

let numbers = [" ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function isAllNumber(val) {
    for (let i = 0; i < val.length; i++)
    {
        if(!numbers.includes(val[i]))
        {
            return false;      
        }
    }
    return true;
}

function endOfform() {
    let form = document.querySelector(".form");
    console.log(form);
    form.style.display = "none";
    let completeState = document.querySelector(".complete-state");
    completeState.style.display = "flex";
}

let changeable = true;

document.addEventListener("DOMContentLoaded", () => {
    let inputFields = document.getElementsByClassName("input-field");
    let inputs = document.querySelectorAll(".form-input");
    let nameInput = document.getElementById("input-name");
    let name = document.getElementById("user-name");
    let nameWarning = document.getElementById("card-name-warning");
    let numCardInput = document.getElementById("input-number");
    let cardNum = document.getElementById("card-num");
    let numWarning = document.getElementById("card-num-warning");
    let monthInput = document.getElementById("exp-month");
    let expDate = document.getElementById("expire-date");
    let dateWarning = document.getElementById("card-date-warning");
    let yearInput = document.getElementById("exp-year");
    let cvcInput = document.getElementById("cvc");
    let cvcNum = document.getElementById("cvc-num");
    let warnings = document.getElementsByClassName("warning");
    let button = document.getElementById("btn-confirm"); 
    for(let i = 0; i < inputFields.length; i++)
    {
        inputFields[i].addEventListener("keyup", () => {
            inputFields[i].classList.remove("warned");
                if (i < 2)
                {
                    warnings[i].innerText = "";
                }
                else if ((i == 2 || i == 3) && (inputFields[2].value.length > 0 && inputFields[3].value.length > 0))
                {
                    warnings[2].innerText = "";
                }
                else if (i > 3)
                {
                    warnings[i - 1].innerText = "";
                }
        })
    }
    
    nameInput.addEventListener("keyup", () => {
        let val = nameInput.value;
        setTimeout(() => {
            if (val.length === 0) {
                name.innerHTML = "JANE APPLESEED";
            }
            else {
                name.innerHTML = val.toUpperCase();
            }
        }, 100);
    })

    numCardInput.addEventListener("keyup", (e) => {
        let val2 = numCardInput.value;
        setTimeout(() => {
            if (e.key === "Backspace") {
                cardNum.innerHTML = "0000 0000 0000 0000";
            }
            if (!isAllNumber(val2))
            {
                numCardInput.classList.add("warned");
                numWarning.innerText = "Wrong format, numbers only";
                changeable = false;
            }   
            else {
                numCardInput.classList.remove("warned");
                changeable = true;
            }
            if (val2.length > 0 && val2.length % 5 === 0 && val2[val2.length - 1] !== " ")
            {
                numCardInput.value = Replace(val2, val2.length - 1, " " + val2[val2.length - 1]);
            }
            cardNum.innerHTML = Replace(cardNum.innerHTML, 0, numCardInput.value);
        }, 50);
    })

    
    monthInput.addEventListener("keyup", (e) => {
        let val3 = monthInput.value;
        if (val3.length <= 2) {
            setTimeout(() => {
                if (e.key === "Backspace") {
                    let year = expDate.innerHTML.substring(2);
                    expDate.innerHTML = "00" + year;   
                }
                expDate.innerHTML = Replace(expDate.innerHTML, val3.length % 2, val3);
            }, 100);
        }
    })

    
    yearInput.addEventListener("keyup", (e) => {
        let val4 = yearInput.value;
        if (yearInput.value.length <= 4) {
            setTimeout(() => {
                if (e.key === "Backspace") {
                    let month = expDate.innerHTML.substring(0, 3);
                    expDate.innerHTML = month + "00";
                }
                expDate.innerHTML = Replace(expDate.innerHTML, 3, val4.substring(2));
            }, 100);
        }
    })

    
    cvcInput.addEventListener("keyup", (e) => {
        let val5 = cvcInput.value;
        setTimeout(() => {
            if (e.key === "Backspace")
            {
                cvcNum.innerHTML = "000";
            }
            cvcNum.innerHTML = Replace(cvcNum.innerHTML, 0, val5);
        }, 100);
    })

    button.addEventListener("click", () => {
        for (let i = 0; i < inputFields.length; i++)
        {
            if (inputFields[i].value.length == 0)
            {
                inputFields[i].classList.add("warned");
                if (i < 2)
                {
                    warnings[i].innerText = "Can't be blank."
                }
                else if (i == 2 || i == 3)
                {
                    warnings[2].innerText = "Can't be blank."
                }
                else 
                {
                    warnings[i - 1].innerText = "Can't be blank."
                }
                changeable = false;
            }
        }
        if (changeable)
        {
            endOfform();
        }
    })

})
