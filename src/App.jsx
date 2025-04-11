import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const operations = {
    upperCase: (text) => text.toUpperCase(),
    lowerCase: (text) => text.toLowerCase(),
    reverse: (text) => text.split("").reverse().join(""),
    clear: () => { 
      setInput(""); 
      return "Text cleared!"; 
    },
    copy: (text) => {
      navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    },
    removeSpaces: (text) => text.replace(/\s+/g, ""),
    removeNumbers: (text) => text.replace(/[0-9]/g, ""),
    removeSpecialChars: (text) => text.replace(/[^a-zA-Z0-9\s]/g, ""),
    removeVowels: (text) => text.replace(/[aeiouAEIOU]/g, ""),
    removeConsonants: (text) => text.replace(/[^aeiouAEIOU\s]/g, ""),
    removePunctuation: (text) => text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ""),
    removeDuplicateSpaces: (text) => text.replace(/\s+/g, " ").trim(),
    capitalizeFirstLetter: (text) => {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    },
    capitalizeEachWord: (text) => {
      return text.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },
    sentenceCase: (text) => {
      return text.toLowerCase().replace(/(^\w|[.!?]\s+\w)/g, letter => letter.toUpperCase());
    },
    titleCase: (text) => {
      const minorWords = ['a', 'an', 'the', 'in', 'on', 'at', 'for', 'to', 'of', 'with', 'by'];
      return text.toLowerCase().split(' ')
        .map((word, index) => {
          if (index === 0 || !minorWords.includes(word)) {
            return word.charAt(0).toUpperCase() + word.slice(1);
          }
          return word;
        })
        .join(' ');
    },
    toggleCase: (text) => {
      return text.split('').map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
      ).join('');
    },
    wordCount: (text) => {
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      return `Word count: ${words.length}`;
    },
    charCount: (text) => `Character count: ${text.length}`,
    lineCount: (text) => `Line count: ${text.split('\n').length}`,
    paragraphCount: (text) => {
      const paragraphs = text.split('\n\n').filter(para => para.trim().length > 0);
      return `Paragraph count: ${paragraphs.length}`;
    },
    findAndReplace: (text) => {
      const find = prompt("Enter text to find:");
      if (!find) return text;
      const replace = prompt("Enter text to replace with:");
      if (replace === null) return text;
      try {
        return text.replace(new RegExp(find, 'gi'), replace);
      } catch (error) {
        alert("Invalid search pattern");
        return text;
      }
    },
    findAndHighlight: (text) => {
      const find = prompt("Enter text to highlight:");
      if (!find) return text;
      try {
        return text.replace(new RegExp(find, 'gi'), 
          match => `<span class="highlight">${match}</span>`);
      } catch (error) {
        alert("Invalid search pattern");
        return text;
      }
    },
    findAndCount: (text) => {
      const find = prompt("Enter text to count:");
      if (!find) return "0 occurrences found";
      try {
        const matches = text.match(new RegExp(find, 'gi'));
        return `Found ${matches ? matches.length : 0} occurrences`;
      } catch (error) {
        alert("Invalid search pattern");
        return "0 occurrences found";
      }
    },
    findAndRemove: (text) => {
      const find = prompt("Enter text to remove:");
      if (!find) return text;
      try {
        return text.replace(new RegExp(find, 'gi'), '');
      } catch (error) {
        alert("Invalid search pattern");
        return text;
      }
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleConvert = () => {
    if (!input.trim() && selectedOption !== 'clear') {
      setOutput("Please enter some text first!");
      return;
    }

    if (selectedOption && typeof operations[selectedOption] === "function") {
      try {
        const result = operations[selectedOption](input);
        setOutput(result);
      } catch (error) {
        console.error("Conversion error:", error);
        setOutput("An error occurred during conversion. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h1>Text Converter</h1>
      
      <div className="input-section">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your text here..."
          rows="8"
        />
      </div>

      <div className="select-container">
        <div className="select-and-convert">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="operation-select"
          >
            <option value="">Select an operation</option>
            
            <optgroup label="Basic Transformations">
              <option value="upperCase">UPPERCASE</option>
              <option value="lowerCase">lowercase</option>
              <option value="reverse">Reverse</option>
              <option value="clear">Clear</option>
              <option value="copy">Copy</option>
            </optgroup>

            <optgroup label="Text Cleanup">
              <option value="removeSpaces">Remove Extra Spaces</option>
              <option value="removeNumbers">Remove Numbers</option>
              <option value="removeSpecialChars">Remove Special Chars</option>
              <option value="removeVowels">Remove Vowels</option>
              <option value="removeConsonants">Remove Consonants</option>
              <option value="removePunctuation">Remove Punctuation</option>
              <option value="removeDuplicateSpaces">Remove Duplicate Spaces</option>
            </optgroup>

            <optgroup label="Case Transformations">
              <option value="capitalizeFirstLetter">Capitalize First Letter</option>
              <option value="capitalizeEachWord">Capitalize Each Word</option>
              <option value="sentenceCase">Sentence Case</option>
              <option value="titleCase">Title Case</option>
              <option value="toggleCase">Toggle Case</option>
            </optgroup>

            <optgroup label="Counting Functions">
              <option value="wordCount">Word Count</option>
              <option value="charCount">Character Count</option>
              <option value="lineCount">Line Count</option>
              <option value="paragraphCount">Paragraph Count</option>
            </optgroup>

            <optgroup label="Find and Replace">
              <option value="findAndReplace">Find and Replace</option>
              <option value="findAndHighlight">Find and Highlight</option>
              <option value="findAndCount">Find and Count</option>
              <option value="findAndRemove">Find and Remove</option>
            </optgroup>
          </select>
          
          <button
            onClick={handleConvert}
            className="convert-button"
            disabled={!selectedOption}
          >
            Convert
          </button>
        </div>
      </div>

      <div className="output-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Result:</h2>
          {output && (
            <button
              onClick={() => {
                const tempEl = document.createElement("textarea");
                tempEl.value = output.replace(/<[^>]+>/g, "");
                document.body.appendChild(tempEl);
                tempEl.select();
                document.execCommand("copy");
                document.body.removeChild(tempEl);
                setOutput("Result copied to clipboard!");
              }}
              className="convert-button"
              style={{ padding: "0.4rem 0.8rem", fontSize: "0.9rem", minWidth: "auto" }}
            >
              Copy Result
            </button>
          )}
        </div>

        <div className="output-content">
          {typeof output === "number" ? (
            <p>{output}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: output }} />
          )}
        </div>
      </div>

      <footer className="footer">
        <p>Made with ❤️ by Raj Aryan</p>
      </footer>
    </div>
  );
};

export default App;
