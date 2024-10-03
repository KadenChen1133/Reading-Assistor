import React, { useState } from 'react';
import './fonts.css';

const fonts = [
  { name: 'Arial', css: 'Arial' },
  { name: 'Courier New', css: 'Courier New' },
  { name: 'Georgia', css: 'Georgia' },
  { name: 'Times New Roman', css: 'Times New Roman' },
  { name: 'Verdana', css: 'Verdana' },
];

const Fonts: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedFont, setSelectedFont] = useState(fonts[0].name);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleOptionClick = (fontName: string, fontCss: string) => {
    console.log(`Selected font: ${fontName}`);
    setSelectedFont(fontName);
    setIsDropdownVisible(false);

    if (typeof chrome !== "undefined" && chrome.runtime) {
      chrome.runtime.sendMessage(
        { action: "changeFont", fontCss },
        (response) => {
          if (chrome.runtime.lastError) {
            console.error("Error: ", chrome.runtime.lastError.message);
          } else if (response?.status === "fontChanged") {
            console.log("Font changed successfully");
          } else if (response?.status === "error") {
            console.error("Font change failed:", response.message);
          } else {
            console.error("No response received or unexpected response");
          }
        }
      );
    } else {
      console.error("chrome API is not available.");
    }
  };

  return (
    <nav className='fonts'>
      <h1 className='fonts-title'>Font Options</h1>
      <button className='fonts-selected' onClick={toggleDropdown}>
        {selectedFont}
      </button>
      <ul className={`fonts-list ${isDropdownVisible ? 'show' : ''}`}>
        {fonts.map((font) => (
          <li key={font.name} onClick={() => handleOptionClick(font.name, font.css)}>
            {font.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Fonts;
