import React from "react";
import './App.css';

function PasswordGenerator() {
  const [password, setPassword] = React.useState("");
  const [length, setLength] = React.useState(12);
  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeLowercase, setIncludeLowercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  function generatePassword() {
    let characters = "";
    if (includeUppercase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) characters += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) characters += "0123456789";
    if (includeSymbols) characters += "!@#$%^&*()_+-=[]{}|;:,.<>?/";

    if (characters.length === 0) {
      setPassword("Selecciona al menos una opción");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    setPassword(result);
    setCopied(false);
  }

  function copyToClipboard() {
    if (password && password !== "Selecciona al menos una opción") {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="container">
      <h1 className="title">🔐 Generador de Contraseñas</h1>

      <label className="label">
        Longitud:
        <input
          className="input"
          type="number"
          value={length}
          min="4"
          max="32"
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </label>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase((prev) => !prev)}
          />
          Incluir MAYÚSCULAS
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase((prev) => !prev)}
          />
          Incluir minúsculas
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers((prev) => !prev)}
          />
          Incluir números
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols((prev) => !prev)}
          />
          Incluir símbolos
        </label>
      </div>

      <div className="password-box">
        <p className="password-text">{password || "Haz clic para generar una contraseña"}</p>
      </div>

      <div className="buttons">
        <button className="btn" onClick={generatePassword}>Generar</button>
        <button className="btn" onClick={copyToClipboard} disabled={!password}>
          Copiar
        </button>
      </div>

      {copied && <p className="copied">¡Contraseña copiada!</p>}
    </div>
  );
}

export default PasswordGenerator;
