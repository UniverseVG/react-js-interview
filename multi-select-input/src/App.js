import Pill from "./components/pill";
import "./styles.css";
import React from "react";
import { debounce } from "./utils";

export default function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const [selecetedUserSet, setSelectedUserSet] = React.useState(new Set());
  const [activeSuggestion, setActiveSuggestion] = React.useState(0);

  const inputRef = React.useRef(null);

  const fetchUsers = React.useMemo(() => {
    return debounce((searchTerm) => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((res) => setSuggestions(res))
        .catch((err) => console.error(err));
    }, 3000);
  }, []);

  React.useEffect(() => {
    fetchUsers(searchTerm);
  }, [fetchUsers, searchTerm]);

  const handleSelect = (user) => {
    setSelectedUsers((prev) => [...prev, user]);
    setSelectedUserSet(new Set([...selecetedUserSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers?.filter((item) => item?.id !== user?.id);
    setSelectedUsers(updatedUsers);
    const updateEmails = new Set(selecetedUserSet);
    updateEmails.delete(user.email);
    setSelectedUserSet(updateEmails);
  };
  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    } else if (e.key === "ArrowDown" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions.users.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === "ArrowUp" && suggestions?.users?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions.users.length
    ) {
      handleSelect(suggestions.users[activeSuggestion]);
    }
  };

  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {selectedUsers?.map((user) => {
          return (
            <Pill
              image={user?.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => handleRemoveUser(user)}
            />
          );
        })}
        <div>
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a user..."
            onKeyDown={handleKeyDown}
          />
          {suggestions?.users?.length > 0 && (
            <ul className="suggestions-list">
              {suggestions?.users?.map((user, index) => {
                return !selecetedUserSet.has(user.email) ? (
                  <li
                    className={index === activeSuggestion ? "active" : ""}
                    key={user?.email}
                    onClick={() => handleSelect(user)}
                  >
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                ) : (
                  <></>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
