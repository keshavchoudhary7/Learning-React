import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const passwordRef = useRef(null);

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setAlertMessage('Password copied to clipboard!');
    setTimeout(() => setAlertMessage(''), 2000);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*_';
    let str = letters;

    if (numberAllowed) str += numbers;
    if (charAllowed) str += specialChars;

    if (numberAllowed) pass += numbers.charAt(Math.floor(Math.random() * numbers.length));
    if (charAllowed) pass += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

    while (pass.length < length) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass.split('').sort(() => 0.5 - Math.random()).join(''));
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg p-6 bg-gray-800 text-orange-500'>
        <h1 className='text-white text-center mb-6 text-2xl'>Password Generator</h1>
        <div className='flex flex-col sm:flex-row items-center shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-2 px-4 bg-gray-700 text-white'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button
            className='outline-none bg-blue-700 text-white px-4 py-2 mt-2 sm:mt-0 sm:ml-2'
            onClick={copyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center'>
            <input
              type='range'
              min={6}
              max={100}
              value={length}
              className='cursor-pointer w-half'
              onChange={(e) => setLength(e.target.value)}
            />
            <label className='ml-3 text-white'>Length: {length}</label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={charAllowed}
              id='characterInput'
              onChange={() => setCharAllowed((prev) => !prev)}
              className='cursor-pointer'
            />
            <label htmlFor='characterInput' className='ml-2 text-white'>Include Special Characters</label>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              checked={numberAllowed}
              id='numberAllowed'
              onChange={() => setNumberAllowed((prev) => !prev)}
              className='cursor-pointer'
            />
            <label htmlFor='numberAllowed' className='ml-2 text-white'>Include Numbers</label>
          </div>
        </div>
        {alertMessage && (
          <div className='mt-4 p-3 bg-green-600 text-white rounded'>
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
