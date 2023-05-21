import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect, useState } from 'react';

import passwordGif from '../../assets/gif/password.gif';
import { ReactComponent as Copy } from '../../assets/icons/copy.svg';
import { ReactComponent as Refresh } from '../../assets/icons/refresh.svg';
import Checkbox from '../Checkbox';
import './index.css';

const PasswordGenerator = () => {
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [password, setPassword] = useState<string>('');
  const [uppercase, setUppercase] = useState<boolean>(true);
  const [lowercase, setLowercase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [specialChars, setSpecialChars] = useState<boolean>(true);
  const [passwordStrength, setPasswordStrength] = useState<string>('Weak');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const onChangePasswordLength = (value: number | number[]) => {
    setPasswordLength(value as number)
  }

  const onChangePasswordRequirement = (req: string) => {
    if (req === 'uppercase') {
      setUppercase(!uppercase);
    }
    if (req === 'lowercase') {
      setLowercase(!lowercase);
    }
    if (req === 'numbers') {
      setNumbers(!numbers);
    }
    if (req === 'specialChars') {
      setSpecialChars(!specialChars);
    }
  }

  const randomPasswordGenerator = (
    passwordLength: number,
    uppercase: boolean,
    lowercase: boolean,
    numbers: boolean,
    specialChars: boolean
  ) => {
    const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const specialCharacters = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    const numberGroup = "0123456789";
    let characters = '';
    let pass = '';
    let charactersSet = [];

    if (uppercase) {
      charactersSet.push(upperCaseLetters);
    }
    if (lowercase) {
      charactersSet.push(lowerCaseLetters);
    }
    if (specialChars) {
      charactersSet.push(specialCharacters);
    }
    if (numbers) {
      charactersSet.push(numberGroup);
    }

    for (let i = 0; i < passwordLength; ++i) {
      const randomNumber = Math.floor(
        Math.random() * charactersSet.length - 1) + 1;
      characters = charactersSet[randomNumber];
      const randomIndex = Math.floor(
        Math.random() * characters.length
      );

      pass += characters.charAt(randomIndex);
    }

    setPassword(pass);
  }

  function passwordStrengthFunc(password: string) {
    // Define the criteria for a strong password
    const minLength = 8;  // Minimum length of 8 characters
    const hasUppercase = /[A-Z]/.test(password);  // Contains at least one uppercase letter
    const hasLowercase = /[a-z]/.test(password);  // Contains at least one lowercase letter
    const hasNumber = /[0-9]/.test(password);  // Contains at least one digit
    const hasSpecialChar = /[!@#$%^&*()_+~`|}{[\]:;?><,./-=]/.test(password);  // Contains at least one special character
    let numberOfFields = 0;
    let atLeastEightCharacters = false;

    // Evaluate the password against the criteria
    if (password.length >= minLength) {
      atLeastEightCharacters = true;
    }
    if (hasUppercase) {
      numberOfFields += 1;
    }
    if (hasLowercase) {
      numberOfFields += 1;
    }
    if (hasNumber) {
      numberOfFields += 1;
    }
    if (hasSpecialChar) {
      numberOfFields += 1;
    }

    if (
      atLeastEightCharacters &&
      numberOfFields === 4
    ) {
      return "Strong";
    }
    else if (
      atLeastEightCharacters &&
      numberOfFields === 3
    ) {
      return "Medium";
    }
    else if (
      !atLeastEightCharacters &&
      (numberOfFields === 3 || numberOfFields === 4)
    ) {
      return "Medium";
    }
    else {
      return "Weak";
    }

  }

  const handleCopy = async (password: string) => {
    try {
      await navigator.clipboard.writeText(password);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 1000);

    } catch (error) {
      console.error('Failed to copy password', error);

    }
  }

  useEffect(() => {
    const checkAllCheckboxes = () => {
      if (
        uppercase === false &&
        lowercase === false &&
        numbers === false &&
        specialChars === false
      ) {
        setLowercase(true);
      }
    }
    checkAllCheckboxes();
    setPasswordStrength(passwordStrengthFunc(password));
  }, [password, uppercase, lowercase, numbers, specialChars]);

  useEffect(() => {
    randomPasswordGenerator(
      passwordLength,
      uppercase,
      lowercase,
      numbers,
      specialChars
    )
  }, [])


  return (
    <div className="password-wrapper">
      <div className="gif">
        <img src={passwordGif} alt="Password Gif" />
      </div>
      <div className="tac">
        <h2 className="title">PASSWORD GENERATOR</h2>
        <p className="subtitle">
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>
      <div className="password-input-wrapper">
        <div className="password-field">
          <input type="text"
            placeholder="your password"
            value={password}
            onChange={() => ''}
          />
          <Refresh onClick={() => randomPasswordGenerator(
            passwordLength,
            uppercase,
            lowercase,
            numbers,
            specialChars
          )} />
        </div>
        <button className="copy-btn"
          onClick={() => handleCopy(password)}
        >
          <Copy />
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <span className={
        `fw-500 ${passwordStrength === "Strong" ? "strong-color" :
          passwordStrength === "Medium" ? "medium-color" : "weak-color"}`
      }
      >
        {passwordStrength}
      </span>
      <div className="slider">
        <div>
          <label id="slider-label">Password Length: </label>
          <span>{passwordLength}</span>
        </div>
        <Slider
          max={30}
          min={5}
          value={passwordLength}
          onChange={onChangePasswordLength}
          className="slider-style"
        />
      </div>
      <div className="elements">
        <Checkbox id="uppercase" label="Uppercase"
          checked={uppercase} name="upper"
          onChange={() => onChangePasswordRequirement('uppercase')}
        />
        <Checkbox id="lowercase" label="Lowercase"
          checked={lowercase} name="lower"
          onChange={() => onChangePasswordRequirement('lowercase')}
        />
        <Checkbox id="numbers" label="Numbers"
          checked={numbers} name="numbers"
          onChange={() => onChangePasswordRequirement('numbers')}
        />
        <Checkbox
          id="special chars" label="Special Characters"
          checked={specialChars} name="specialChars"
          onChange={() => onChangePasswordRequirement('specialChars')}
        />
      </div>
    </div >
  )
}

export default PasswordGenerator
