// 22 12 20 changes from Orwa

/*
diff --git a/toDoList/app.js b/toDoList/app.js
index 2b3b8a0..255c4c3 100644
--- a/toDoList/app.js
+++ b/toDoList/app.js
@@ -77,9 +77,7 @@ function removeTodo(idToDelete) {
     */
 
     // below is how I opted to do it

/*
-    todos = todos.filter(item => {
-        return item.id !== idToDelete;
-    });
+    todos = todos.filter(item => item.id !== idToDelete);
 
     saveTodos();
 }
@@ -121,30 +119,17 @@ statusBar.innerText = STATUS_TEXT;
 // === The Render function, which includes creating new divs ===
 // create the divs and fill them (this function is for display purposes and not actually updating any variables)
 function render() {
-    document.getElementById('table').innerHTML = '';                // reset the list content div
-
-
-    tableHead = document.createElement('thead');                    // the first row section (that's why we do it BEFORE the loop)
-    firstRow = document.createElement('tr');
     
-    header1 = document.createElement('th');
-    header1.className = "thead";
-    header1.innerText = HEADER1_TEXT;
-    header1.style = "width: 65%";
-    firstRow.appendChild(header1);
-
-    header2 = document.createElement('th');
-    header2.className = "thead";
-    header2.innerText = HEADER2_TEXT;
-    header2.style = "width: 17%";
-    firstRow.appendChild(header2);
-
-    header3 = document.createElement('th');
-    header3.className = "thead";
-    header3.innerText = HEADER3_TEXT;
-    header3.style = "width: 18%";
-    firstRow.appendChild(header3);
-
+    const tableHeaderHTML = `
+    <tr>
+    <th class="thead" style="width: 65%;">${HEADER1_TEXT}</th>
+    <th class="thead" style="width: 17%;">${HEADER2_TEXT}</th>
+    <th class="thead" style="width: 18%;">${HEADER3_TEXT}</th>
+    </tr>
+    `;
+    
+    document.getElementById('table').innerHTML = tableHeaderHTML;                // reset the list content div
+    
     const todoList = document.getElementById('table');
     todoList.appendChild(firstRow);
 
diff --git a/toDoList/styles.css b/toDoList/styles.css
index 1e30c1e..b4c0bf6 100644
--- a/toDoList/styles.css
+++ b/toDoList/styles.css
@@ -1,138 +1,137 @@
+@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@300;600&display=swap");
+
 * {
-    box-sixing: border-box;
-    margin: 0;
-    padding: 0;
-    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
+  box-sizing: border-box;
+  margin: 0;
+  padding: 0;
+  font-family: "Raleway", "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
+    "Lucida Sans", Arial, sans-serif;
 }
 
 em {
-    color: rgb(24, 102, 102);
+  color: rgb(24, 102, 102);
 }
 
 body {
-    display: flex;
-    flex-direction: column;
-    justify-content: none;
-    align-items: center;
-    height: 100vh;
+  display: flex;
+  flex-direction: column;
+  justify-content: none;
+  align-items: center;
+  height: 100vh;
 }
 
-
 h1 {
-    text-align: center;
+  text-align: center;
 }
 
 .button {
-    background-color: #f44336;
-    color: white;    
-    margin: 7px;
+  background-color: #f44336;
+  color: white;
+  margin: 7px;
 
-    padding: 7px 18px;
+  padding: 7px 18px;
 
-    text-align: center;
-    text-decoration: none;
-    display: inline-block;
-    
-    border: none;
-    font-weight: normal;
-    font-size: 16px;
-    border-radius: 22px;
+  text-align: center;
+  text-decoration: none;
+  display: inline-block;
 
-    transition-duration: 0.2s;
-  }
+  border: none;
+  font-weight: normal;
+  font-size: 16px;
+  border-radius: 22px;
+
+  transition-duration: 0.2s;
+}
 
 .button:hover {
-    background-color: #f81b0b;
-    color: #ffffff;
-    
-    transform: scale(1.1);
-  }
+  background-color: #f81b0b;
+  color: #ffffff;
+
+  transform: scale(1.1);
+}
 
 #todo-list {
-    padding: none;
-    display: inline-block;
-    border: 5px solid #fff;
+  padding: none;
+  display: inline-block;
+  border: 5px solid #fff;
 }
 
 #status-bar {
-    background-color: #f44336;
-    color: white;    
-    margin: auto;
-    width: 400px;
+  background-color: #f44336;
+  color: white;
+  margin: auto;
+  width: 400px;
+
+  padding: 3px 12px;
 
-    padding: 3px 12px;
+  text-align: center;
+  text-decoration: none;
 
-    text-align: center;
-    text-decoration: none;
-    
-    
-    border: none;
-    font-weight: normal;
-    font-size: 12px;
-    border-radius: 3px;
+  border: none;
+  font-weight: normal;
+  font-size: 12px;
+  border-radius: 3px;
 
-    transition-duration: 0.3s;
+  transition-duration: 0.3s;
 }
 
 .center {
-    margin: auto;
-    width: 100%;
-    border: 0px solid transparent;
-    padding: 0px;
+  margin: auto;
+  width: 100%;
+  border: 0px solid transparent;
+  padding: 0px;
 }
 
 .tcell {
-    padding: 3px 22px;
-    background-color: rgb(48, 48, 48);
+  padding: 3px 22px;
+  background-color: rgb(48, 48, 48);
 }
 
 .thead {
-    padding: 3px 22px;
-    background-color: rgb(48, 48, 48);
+  padding: 3px 22px;
+  background-color: rgb(48, 48, 48);
 }
 
 #todo-list {
-    width: 810px;
-    padding: 0px;
+  width: 810px;
+  padding: 0px;
 }
 
 .table-class {
-    width: 100%;
-    background-color: #ffffff;
-    color: #fff;
+  width: 100%;
+  background-color: #ffffff;
+  color: #fff;
 }
 
 .main-container {
-    width: 800px;
-    padding: 5px;
-    display: inline-block;
-    border: 5px solid;
-    border-color: rgb(48, 48, 48);
+  width: 800px;
+  padding: 5px;
+  display: inline-block;
+  border: 5px solid;
+  border-color: rgb(48, 48, 48);
 }
 
-
-
 /* tooltip section */

 /*
 .tooltip {
-    position: relative;
-    display: inline-block;
-    border-bottom: 1px dotted black;
-  }
-  
-  .tooltip .tooltiptext {
-    visibility: hidden;
-    width: 320px;
-    background-color: black;
-    color: #fff;
-    text-align: center;
-    border-radius: 6px;
-    padding: 5px 5px;
-  
-    /* position the tooltip */
/*
-    position: absolute;
-    z-index: 1;
-  }
-  
-  .tooltip:hover .tooltiptext {
-    visibility: visible;
-  }
\ No newline at end of file
+  position: relative;
+  display: inline-block;
+  border-bottom: 1px dotted black;
+}
+
+.tooltip .tooltiptext {
+  visibility: hidden;
+  width: 320px;
+  background-color: black;
+  color: #fff;
+  text-align: center;
+  border-radius: 6px;
+  padding: 5px 5px;
+
+  /* position the tooltip */

/*
+  position: absolute;
+  z-index: 1;
+}
+
+.tooltip:hover .tooltiptext {
+  visibility: visible;
+}
\ No newline at end of file
diff --git a/toDoList/todo.html b/toDoList/todo.html
index c8966e6..02d8b33 100644
--- a/toDoList/todo.html
+++ b/toDoList/todo.html
@@ -39,7 +39,7 @@
       <input id="todo-title" type="text" />
       <input id="date-picker" type="date" />
       <button id="add-button" class="button" onclick="addToDo()">
-        Add To-Do
+        Your javascript is broken
       </button>
 
       <button id="reset-button" class="button" onclick="resetOnClick()">
@@ -56,6 +56,6 @@
     <br />
     <div id="todo-list" style="display: block; max-width:100%"><table id="table" class="table-class"></table></div>
 
-    <script src="app.js"></script>
+    <script src="app.js" defer></script>
   </body>
 </html>
 */