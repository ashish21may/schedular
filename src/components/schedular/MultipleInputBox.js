import React, { useState, useEffect } from "react";

export const MultipleInputBox = ({onEmailUpdate, attendeeEmails, noEmailError}) => {
  const [emailData, setEmailData] = useState([]);
  const [currentEmail, setCurrentEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    attendeeEmails && setEmailData(attendeeEmails);
    noEmailError && setError("Enter atleast one email id and press Enter")
  }, [attendeeEmails, noEmailError])

  const handleKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();
      let value = currentEmail.trim();

      if (value && isEmailValid(value)) {
        setEmailData([...emailData, currentEmail]);
				onEmailUpdate([...emailData, currentEmail])
        setCurrentEmail("");
      }
    }
  };

  const handleCurrentEmail = (e) => {
    setCurrentEmail(e.target.value);
    setError("");
  };

  const deleteEmail = (item) => {
		const presentEmails = [...emailData];
		const updatedEmailDetails = presentEmails.filter((email) => email !== item)
    setEmailData(updatedEmailDetails);
		onEmailUpdate(updatedEmailDetails);
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const copiedEmail = e.clipboardData.getData("text");
    const validEmail = copiedEmail.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (validEmail) {
      const emailsToBeAdded = validEmail.filter(
        (email) => !emailData.includes(email)
      );
      setEmailData([...emailData, ...emailsToBeAdded]);
			onEmailUpdate([...emailData, ...emailsToBeAdded]);
    }
  };

  const isEmailValid = (email) => {
    if (emailData.includes(email)) {
      setError(`${email} is already present in list !!`);
      return false;
    } else if (!isEmail(email)) {
      setError(`${email} is not a valid email !!`);
      return false;
    }
    return true;
  };

  const isEmail = (email) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };

  return (
    <>
      <input
        className={`email-multiple-input ${error ? 'has-error' : '' }`}
        value={currentEmail}
        onKeyDown={handleKeyDown}
        onChange={handleCurrentEmail}
        onPaste={handlePaste}
        placeholder="Type emails and hit enter to add in the list of attendees"
      />

      {emailData.map((item) => (
        <span className="tag-item" key={item}>
          {item}
          <button
            type="button"
            className="button remove-email-button"
            onClick={() => deleteEmail(item)}
          >
            &times;
          </button>
        </span>
      ))}

      {error && <p className="error">{error}</p>}
    </>
  );
};
