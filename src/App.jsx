import React, { useEffect, useState, useRef } from 'react';

function App() {
  const [messegestate, setmessegestate] = useState('hidden');
  const [copymessege, setcopymessege] = useState('');
  const passwordRef = useRef(null);

  const [specialscharsAllowed, setspecialscharsAllowed] = useState(false);
  const [numbersAllowed, setnumbersAllowed] = useState(false);
  const [password, setpassword] = useState('');
  const [length, setlength] = useState(10);

  const reversenumber = (prev) => {
    setnumbersAllowed(!prev);
  };
  const reversesigns = (prev) => {
    setspecialscharsAllowed(!prev);
  };
  const handlelength = (e) => {
    setlength(e.target.value);
  };

  const GeneratePassword = () => {
    let looppass = '';
    let numbers = '0123456789';
    let specialschars = '!@#$%^&*';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numbersAllowed) str += numbers;
    if (specialscharsAllowed) str += specialschars;

    for (let i = 1; i <= length; i++) {
      let randomidx = Math.floor(Math.random() * str.length);
      looppass += str.charAt(randomidx);
    }
    setpassword(looppass);
  };

  const handleCopyPassword = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
    setcopymessege('✅ Password copied!');
    setmessegestate('block');
    setTimeout(() => {
      setcopymessege('');
      setmessegestate('hidden');
    }, 2000);
  };

  useEffect(GeneratePassword, [length, numbersAllowed, specialscharsAllowed]);

  return (
    <>
      <div className="bg-gradient-to-br from-slate-900 to-gray-800 text-white min-h-screen p-5 flex flex-col items-center justify-start gap-6 relative">

        {/* Copy Message Toast */}
        <div className={`absolute top-5 ${messegestate} transition-all duration-300 px-5 py-2 rounded-lg bg-emerald-600 text-white font-medium shadow-lg`}>
          {copymessege}
        </div>

        <div className="text-4xl font-bold mt-8 text-teal-300">Password Generator</div>

        {/* Password Display */}
        <div className="w-full max-w-md">
          <input
            type="text"
            readOnly
            ref={passwordRef}
            value={password}
            className="w-full p-3 rounded-lg text-black bg-white font-semibold tracking-wider shadow-inner outline-none"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 w-full max-w-md">
          <div className="w-full">
            <label className="block text-teal-400 font-semibold mb-1">
              Password Length: <span className="text-white">{length}</span>
            </label>
            <input
              type="range"
              min="8"
              max="24"
              value={length}
              onChange={handlelength}
              className="w-full accent-teal-500"
            />
          </div>

          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2 text-blue-300 text-lg">
              <input
                type="checkbox"
                onChange={() => reversenumber(numbersAllowed)}
                className="w-5 h-5 accent-blue-500"
              />
              Numbers
            </label>

            <label className="flex items-center gap-2 text-purple-300 text-lg">
              <input
                type="checkbox"
                onChange={() => reversesigns(specialscharsAllowed)}
                className="w-5 h-5 accent-purple-500"
              />
              Special Characters
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={GeneratePassword}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all duration-200"
            >
              Generate Again
            </button>
            <button
              onClick={handleCopyPassword}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-xl font-semibold shadow-md transition-all duration-200"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
