import React, { Component } from "react";
import "./App.css";
import NestedDropdown from "./components/NestedDropdown";
class App extends Component {
  state = {
    terms: [
      {
        id: 1,
        pid: 1,
        name: "terme1",
        selected: false,
        children: [
          {
            id: 4,
            pid: 1,
            name: "terme4",
            selected: false,
            children: [
              { id: 6, pid: 1, name: "terme6", selected: false },
              {
                id: 7,
                pid: 1,
                name: "terme7",
                selected: false,
                children: [
                  { id: 8, pid: 1, name: "terme8", selected: false },
                  { id: 9, pid: 1, name: "terme9", selected: false }
                ]
              }
            ]
          },
          { id: 5, pid: 1, name: "terme5", selected: false }
        ]
      },
      { id: 2, pid: 1, name: "terme2", selected: false },
      { id: 3, pid: 1, name: "terme3", selected: false }
    ]
  };
  handleDropdownToggle = (e, index_table) => {
    //console.log("dans handleDropdownToggle");
    //console.log("index_table : ", index_table);
    e.preventDefault();
    const state = { ...this.state };
    // on gère les selected et les non-selected grâce à une fonction recursive
    this.browseTreeToManageSelected(state.terms, index_table);
    this.setState(state);
  };
  /**
   * L'idée est ici de rappeler cette fonction avec
   * le niveau de profondeur
   */
  browseTreeToManageSelected = (terms, index_table, depth = 0) => {
    terms.forEach((term, i) => {
      console.log("dans forEach de browseTreeToManageSelected");

      if (index_table.length > depth && index_table[depth] === i) {
        // dans le cas où l'on a cliqué sur un term de niveau 0
        // et que le terme est déjà sélectionné, on le déselectionne
        if (depth === 0 && term.selected && index_table.length === 1)
          term.selected = false;
        else term.selected = true;
      } else term.selected = false;
      if (term.hasOwnProperty("children")) {
        this.browseTreeToManageSelected(term.children, index_table, depth + 1);
      }
    });
  };
  render() {
    return (
      <ul className="App">
        {this.state.terms.map((term, index) => (
          <NestedDropdown
            key={term.id}
            id={term.id}
            name={term.name}
            selected={term.selected}
            children={term.children}
            onDropdownToggle={this.handleDropdownToggle}
            index={index}
          />
        ))}
      </ul>
    );
  }
}

export default App;
