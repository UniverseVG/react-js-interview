import { useState } from 'react';

const Folder = ({
  explorer,
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [showEdit, setShowEdit] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpanded(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleRenameFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowEdit({
      visible: true,
      isFolder,
    });
  };

  const handleDeleteFolder = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };

  const addNewFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  const renameFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleEditNode(explorer.id, e.target.value, showInput.isFolder);
      setShowEdit({ ...showEdit, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div
          className="folder"
          onClick={() => {
            if (!showEdit.visible) {
              setExpanded(!expanded);
            } else setExpanded(false);
          }}
        >
          {showEdit.visible ? (
            <div className="inputContainer">
              <span>{showEdit.isFolder ? '📁' : '📄'}</span>
              <input
                className="inputContainer__input"
                type="text"
                autoFocus
                onKeyDown={(e) => renameFolder(e)}
                onBlur={() => {
                  setShowEdit({ ...showEdit, visible: false });
                }}
              />
            </div>
          ) : (
            <span>📁 {explorer.name}</span>
          )}
          {!showEdit.visible && (
            <div>
              <button onClick={(e) => handleNewFolder(e, true)}>
                Folder +
              </button>
              <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
              <button onClick={(e) => handleRenameFolder(e, true)}>✏️</button>
              <button onClick={(e) => handleDeleteFolder(e)}>🗑️</button>
            </div>
          )}
        </div>

        <div style={{ display: expanded ? 'block' : 'none', paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? '📁' : '📄'}</span>
              <input
                className="inputContainer__input"
                type="text"
                autoFocus
                onKeyDown={(e) => addNewFolder(e)}
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                }}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
                handleEditNode={handleEditNode}
                handleDeleteNode={handleDeleteNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return showEdit.visible ? (
      <div className="inputContainer">
        <span>{showEdit.isFolder ? '📁' : '📄'}</span>
        <input
          className="inputContainer__input"
          type="text"
          autoFocus
          onKeyDown={(e) => renameFolder(e)}
          onBlur={() => {
            setShowEdit({ ...showEdit, visible: false });
          }}
        />
      </div>
    ) : (
      <div className="fileContainer">
        <span className="file">📁 {explorer.name}</span>
        <div style={{ display: 'flex', gap: 5 }}>
          <button onClick={(e) => handleRenameFolder(e, false)}>✏️</button>
          <button onClick={(e) => handleDeleteFolder(e)}>🗑️</button>
        </div>
      </div>
    );
  }
};

export default Folder;
