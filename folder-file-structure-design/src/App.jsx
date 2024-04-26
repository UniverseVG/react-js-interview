import { useState } from 'react';
import './App.css';
import explorer from './data/folder';
import Folder from './components/folder';
import { useTraverseTree } from './hooks/useTraverseTree';

function App() {
  const [explorerData, setExplorerData] = useState(explorer);
  const { insertNode, editNode, deleteNode } = useTraverseTree({
    setExplorerData,
  });

  const handleInsertNode = (folderId, folderName, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, folderName, isFolder);
    return finalTree;
  };

  const handleEditNode = (folderId, folderName, isFolder) => {
    const finalTree = editNode(explorerData, folderId, folderName, isFolder);
    return finalTree;
  };
  const handleDeleteNode = (folderId) => {
    deleteNode(explorerData, folderId);
  };

  return (
    <div className="App">
      <Folder
        explorer={explorerData}
        key={explorer.id}
        handleInsertNode={handleInsertNode}
        handleEditNode={handleEditNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}

export default App;
