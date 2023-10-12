import React, { useEffect, useState } from "react";

const App = () => {
  const [currentStorage, setCurrentStorage] = useState(localStorage);

  const updateTable = () => {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    const data = JSON.parse(currentStorage.getItem("data")) || [];

    if (data.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.textContent = "Нет сохраненных значений";
      tr.appendChild(td);
      tbody.appendChild(tr);
    } else {
      data.forEach((item, index) => {
        const tr = document.createElement("tr");

        const td1 = document.createElement("td");
        td1.textContent = item.key;
        tr.appendChild(td1);

        const td2 = document.createElement("td");
        td2.textContent = item.value;
        tr.appendChild(td2);

        const td3 = document.createElement("td");
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteItem(item.key);
        td3.appendChild(deleteBtn);
        tr.appendChild(td3);

        tbody.appendChild(tr);
      });
    }
  };

  const getStorage = () => {
    const storageType = document.querySelector("#storageType").value;
    setCurrentStorage(storageType === "local" ? localStorage : sessionStorage);
    updateTable();
  };

  const saveItem = () => {
    const key = document.querySelector("#keyInput").value;
    const value = document.querySelector("#valueInput").value;

    const data = JSON.parse(currentStorage.getItem("data")) || [];
    data.push({ key, value });

    currentStorage.setItem("data", JSON.stringify(data));
    updateTable();
  };

  const deleteItem = (key) => {
    const confirmDelete = window.confirm(
      "Вы уверены, что хотите удалить эту запись?"
    );

    if (confirmDelete) {
      const data = JSON.parse(currentStorage.getItem("data")) || [];
      const newData = data.filter((item) => item.key !== key);
      currentStorage.setItem("data", JSON.stringify(newData));
      updateTable();
    }
  };

  const clearStorage = () => {
    const confirmClear = window.confirm(
      "Вы уверены, что хотите полностью очистить хранилище?"
    );

    if (confirmClear) {
      currentStorage.clear();
      updateTable();
    }
  };

  useEffect(() => {
    window.onload = updateTable;
  }, []);

  return (
    <div className="block">
      <select id="storageType" onChange={getStorage}>
        <option value="local">Local Storage</option>
        <option value="session">Session Storage</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Ключ</th>
            <th>Значение</th>
            <th>Удаление</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div className="inputtt">
        <input type="text" id="keyInput" placeholder="Key" />
        <input type="text" id="valueInput" placeholder="Value" />
        <button onClick={saveItem}>Save</button>
      </div>
      <button onClick={clearStorage}>Clear Storage</button>
    </div>
  );
};

export default App;