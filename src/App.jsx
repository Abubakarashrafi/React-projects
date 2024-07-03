import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, isNumber] = useState(false);
  const [characters, isCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    let pass = "";
    if (number) str += "1234567890";
    if (characters) str += "~`!@#$%^&*()_-+={[}]|:;'<,>.?/";
    for (let i = 1; i <= length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pass);
  }, [length, number, characters]);

  useEffect(() => {
    generatePassword();
  }, [length, characters, generatePassword, number]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center">
        <div className="bg-slate-800 w-[45%] h-[20%] mt-10 rounded-xl">
          <div className="bg-white w-[92%] h-[40%] my-4 mx-3 rounded-2xl flex relative">
            <input
              className="w-full h-full px-4 text-2xl rounded-2xl outline-none"
              type="text"
              placeholder="Password"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button
              className="text-white absolute right-0 bg-blue-700 h-full w-[15%] rounded-r-2xl text-center text-2xl font-semibold hover:bg-blue-800"
              onClick={copyPassword}>
              copy
            </button>
          </div>
          <div className="text-orange-500 ">
            <input
              className="mx-3 cursor-pointer"
              type="range"
              min={8}
              max={50}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />

            <label>Length: {length}</label>

            <input
              className="ml-3 cursor-pointer"
              type="checkBox"
              defaultChecked={number}
              onChange={() => {
                isNumber((prev) => !prev);
              }}
            />
            <label>Numbers</label>
            <input
              className="ml-3 cursor-pointer"
              type="checkBox"
              defaultChecked={characters}
              onChange={() => {
                isCharacter((prev) => !prev);
              }}
            />

            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
