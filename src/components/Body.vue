<template>
    <div class="inputArea">
        <div class="expression">
            <input type="text" @keyup="evaluate" placeholder="Expression" v-model="exp" id="exp">
            <input type="text" @keyup="evaluate" placeholder="Flags" v-model="flags" id="flags">
            <button class="save" @click="save">Save</button>
        </div>
        <input type="text" @keyup="evaluate" :placeholder="exp" v-model="text" id="text">
    </div>
    <div class="outputArea">
    </div>
    <div class="savedExpressions">
        <table id="savedExp">
            <tr>
                <th>Expression</th>
                <th>Flags</th>
            </tr>
            <tr>
            </tr>
        </table>
    </div>
    <button id="viewSheet" @click="show">Show Cheat Sheet</button>
    <div class="sheet hidden" id="sheet1">
        <table>
            <tr>
                <td> /abc/ </td>
                <td> A sequence of characters </td>
            </tr>
            <tr>
                <td> /[abc]/ </td>
                <td> Any character from a set of characters </td>
            </tr>
            <tr>
                <td> /[^abc]/ </td>
                <td> Any character not in a set of characters </td>
            </tr>
            <tr>
                <td> /[0-9]/ </td>
                <td> Any character in a range of characters </td>
            </tr>
            <tr>
                <td> /x+/ </td>
                <td> One or more occurrences of the pattern x </td>
            </tr>
            <tr>
                <td> /x+?/ </td>
                <td> One or more occurrences, nongreedy </td>
            </tr>
            <tr>
                <td> /x*/ </td>
                <td> Zero or more occurrences </td>
            </tr>
            <tr>
                <td> /x?/ </td>
                <td> Zero or one occurrence </td>
            </tr>
            <tr>
                <td> /x{2,4}/ </td>
                <td> Two to four occurrences </td>
            </tr>
        </table>
        <table>
             <tr>
                <td> /(abc)/ </td>
                <td> A group </td>
            </tr>
            <tr>
                <td> /a|b|c/ </td>
                <td> Any one of several patterns </td>
            </tr>
            <tr>
                <td> /\d/ </td>
                <td> Any digit character </td>
            </tr>
            <tr>
                <td> /\w/ </td>
                <td> An alphanumeric character (“word character”) </td>
            </tr>
            <tr>
                <td> /\s/ </td>
                <td> Any whitespace character </td>
            </tr>
            <tr>
                <td> /./ </td>
                <td> Any character except newlines </td>
            </tr>
            <tr>
                <td> /\b/ </td>
                <td> A word boundary </td>
            </tr>
            <tr>
                <td> /^/ </td>
                <td> Start of input </td>
            </tr>
            <tr>
                <td> /$/ </td>
                <td> End of input </td>
            </tr>
        </table>
    </div>
    
</template>

<script>
export default {
    name: "Body",
    data() {
        return {
            exp: "",
            flags: "",
            text: "Here is -some- 123 ex@ample text",
            result: "",
            sheetHidden: true,
            savedExp: [],
        }
    },
    methods: {
        evaluate() {
            document.getElementsByClassName("outputArea")[0].innerHTML = "";
            let exp = new RegExp(this.exp, this.flags);
            this.result = exp.exec(this.text);
            for (let i = 0; i < this.result.length; i++) {
                let output = document.createElement('div');
                output.textContent = this.result[i];
                output.classList = "output";
                document.getElementsByClassName("outputArea")[0].appendChild(output)
            }
        },
        show() {
            const sheet = document.getElementById("sheet1");
            if (this.sheetHidden) {
                sheet.classList = "sheet"
                this.sheetHidden = false;
                document.getElementById("viewSheet").textContent = "Hide Cheat Sheet"
            } else {
                sheet.classList = "sheet hidden"
                this.sheetHidden = true;
                document.getElementById("viewSheet").textContent = "Show Cheat Sheet"
            }
        },
        save() {
            localStorage.setItem(this.exp, this.flags);
            let expColumn = document.createElement('td');
            expColumn.textContent = this.exp;
            let flagsColumn = document.createElement('td');
            flagsColumn.textContent = this.flags;
            let row = document.createElement('tr');
            row.appendChild(expColumn);
            row.appendChild(flagsColumn);
            document.getElementById('savedExp').appendChild(row);
        },
        createTable() {
            for ( let i = 0; i < localStorage.length; i++) {
                if (localStorage.getItem(localStorage.key(i)) == 'SILENT') continue;
                console.log(localStorage.getItem(localStorage.key(i)))
                let expColumn = document.createElement('td');
                expColumn.textContent = localStorage.key(i);
                let flagsColumn = document.createElement('td');
                flagsColumn.textContent = localStorage.getItem(localStorage.key(i));
                let row = document.createElement('tr');
                row.appendChild(expColumn);
                row.appendChild(flagsColumn);
                document.getElementById('savedExp').appendChild(row);
            }
        }
    },
      mounted() {
        this.createTable();
    },
}
</script>

<style>
body {
    text-align: center;

}
.inputArea {
    display: flex;
    flex-direction: column;
    width: 100%;    
    justify-content: center;
}
input {
    width: 70%;
    margin: 40px auto 0px;
    font-size: 20px;
    padding: 10px;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border: none;
    border-radius: 10px;
}

.expression {
    margin: 0 auto;
    display: flex;
    width: 80%;
    align-items: baseline;
}

.expression #exp {
    width: 70%;
}
.expression #flags {
    width: 20%;
    margin: 0px 5px;
}

.savedExpressions {
    width: 100%;
}

.savedExpressions table {
    margin: 15px auto 0px;
    width: 70%;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.savedExpressions td, .savedExpressions th {
    font-size: 20px;
}

.outputArea {
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    height: auto;
    margin: 0 auto;
}

.output {    
    margin: 30px 10px 10px;
    padding: 15px;
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
}

.sheet {
    width: 100%;
    padding: 30px;
    display: flex;
    justify-content: center;
    transform: translateX(0%);
    transition: .3s;
}

table {
    margin: 20px 5px;
    width: 300px;
    border-collapse: collapse;
    transition: .3s;
}


td, tr, th {
    border: 1px solid rgba(0, 0, 0, 0.377);
    padding: 10px;
    font-size: 15px;
    letter-spacing: 2px;
    font-weight: bold;
}

.hidden {
    transform: translateX(-150%);
}

#viewSheet, .save {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    border: none;
    border-radius: 10px;
    background: rgba(20, 33, 61, 0.795);
    color: white;
    font-weight: 500;
    cursor: pointer;
    padding: 15px;
    margin: 20px;
    font-size: 20px;
    transition: .3s;
}

#viewSheet:hover, .save:hover {
    background: rgb(20,33,61);;
}


.save {
    margin: 30px 10px 10px;
    padding: 10px;

}
</style>