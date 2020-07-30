let db;
//create db request
const request = indexedDB.open("budget", 1);
//create objectStore
request.onupgradeneeded = event => {
    const db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = event => {
    db = event.target.result;
//check if app is online before reading from db
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = event => console.log("Error:" + event.target.errorCode);

saveRecord = record => {
    //create transaction on the pending db w/ readwrite access
    const transaction = db.transaction(["pending"], "readwrite");
    //access pending objectStore
    const store = transaction.objectStore("pending");
    //addc record to store 
    store.add(record);
};


