export const useTraverseTree = ({ setExplorerData }) => {
  const insertNode = (tree, folderId, folderName, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        name: folderName,
        isFolder: isFolder,
        id: new Date().getTime(),
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((item) => {
      return insertNode(item, folderId, folderName, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const editNode = (tree, folderId, folderName) => {
    if (tree.id === folderId) {
      tree.name = folderName;
      return tree;
    }

    const latestNode = tree.items.map((item) => {
      return editNode(item, folderId, folderName);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, folderId) => {
    if (tree.id === folderId) {
      setExplorerData({});
      return null;
    }

    const filteredItems = tree.items
      .map((item) => deleteNode(item, folderId))
      .filter(Boolean);

    setExplorerData({ ...tree, items: filteredItems });
    return { ...tree, items: filteredItems };
  };

  return { insertNode, editNode, deleteNode };
};
