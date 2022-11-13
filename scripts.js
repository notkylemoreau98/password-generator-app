const slider = document.getElementById("charCount");
const charCount = document.getElementById("charLen");
const password = document.getElementById("password");
const passwordStrengthMessage = document.getElementById("strength");
const passwordStrength = document.getElementById("strengthBars");

const clipboard = document.getElementById("clipboard");
clipboard.addEventListener("click", copyPassword);

const generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", formatPassword);

// Run once on load
window.addEventListener("load", () => formatPassword());

// Checkbox vars
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const nums = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const randomPassword = {
  upper: getRandomUpper,
  lower: getRandomLower,
  nums: getRandomNumber,
  symbols: getRandomSymbol,
};

// Display the default slider value
charCount.innerHTML = slider.value;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
  charCount.innerHTML = this.value;
};

// Need a script to generate random letters based off of charCount
function formatPassword() {
  /* Check which boxes have been selected and generate a random password based of that */
  const length = slider.value;
  const hasUpper = uppercase.checked;
  const hasLower = lowercase.checked;
  const hasNums = nums.checked;
  const hasSymbols = symbols.checked;

  password.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNums,
    hasSymbols,
    length
  );

  const strength = getPasswordStrength(password.innerText);
  // passwordStrength.innerText = strength;
  passwordStrengthMessage.innerText = generateStrengthText(strength);
  generateStrengthColor(strength);
}

function generatePassword(upper, lower, nums, symbols, length) {
  let newPassword = "";
  const filtersChecked = upper + lower + nums + symbols;

  if (filtersChecked === 0) return "ERROR: Must Select One Filter";

  const filtersArr = [{ upper }, { lower }, { nums }, { symbols }].filter(
    (item) => Object.values(item)[0]
  );

  for (let i = 0; i < length; i += filtersChecked) {
    filtersArr.forEach((filter) => {
      const funcName = Object.keys(filter)[0];
      newPassword += randomPassword[funcName]();
    });
  }

  const finalPassword = newPassword.slice(0, length);

  return finalPassword;
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbolChars = "!~@#$%^&*></,.{}";
  return symbolChars[Math.floor(Math.random() * symbolChars.length)];
}

function copyPassword() {
  const textarea = document.createElement("textarea");
  const passwordToCopy = password.innerText;

  if (!passwordToCopy) return;

  textarea.value = passwordToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  // alert("Password copied to clipboard");
}

function getPasswordStrength(password) {
  let strength = 0;
  if (password.match(/[a-z]+/)) strength += 1;

  if (password.match(/[A-Z]+/)) strength += 1;

  if (password.match(/[0-9]+/)) strength += 1;

  if (password.match(/[$@#&!]+/)) {
    if (password.length > 10) {
      strength += 2;
    } else {
      strength += 1;
    }
  }
  password.length > 15 ? (strength += 1) : strength;

  strength > 4 ? (strength = 4) : strength;

  return strength;
}

function generateStrengthText(strength) {
  if (strength == 4) {
    return "Strong";
  } else if (strength === 2 || strength === 3) {
    return "Medium";
  } else if (strength == 1) {
    return "Weak";
  }

  return;
}

function generateStrengthColor(strength) {
  const box1 = document.getElementById("box1");
  const box2 = document.getElementById("box2");
  const box3 = document.getElementById("box3");
  const box4 = document.getElementById("box4");

  if (strength == 1) {
    box1.style.backgroundColor = "red";
    box2.style.backgroundColor = "transparent";
    box3.style.backgroundColor = "transparent";
    box4.style.backgroundColor = "transparent";
  }

  if (strength == 2) {
    box1.style.backgroundColor = "#ff781f";
    box2.style.backgroundColor = "#ff781f";
    box3.style.backgroundColor = "transparent";
    box4.style.backgroundColor = "transparent";
  }

  if (strength == 3) {
    box1.style.backgroundColor = "#FFAE42";
    box2.style.backgroundColor = "#FFAE42";
    box3.style.backgroundColor = "#FFAE42";
    box4.style.backgroundColor = "transparent";
  }

  if (strength == 4) {
    box1.style.backgroundColor = "green";
    box2.style.backgroundColor = "green";
    box3.style.backgroundColor = "green";
    box4.style.backgroundColor = "green";
  }
}
