import React, { Component } from "react";
/**
 * L'idée générale de cette classe est de créer des listes de liens imbriquées
 * avec la gestion de l'événement click sur les liens.
 * Cet événement transmet les index de la liste imbriqués afin que la propriété
 * "selected" soit modifiée
 */
class NestedDropdown extends React.Component {
  state = {};
  index_table = [];
  dumpMenuClass = (selected, children) => {
    let menu_class = "";
    menu_class = selected ? "selected" : "not-selected";
    menu_class +=
      children && children.length ? " has-children" : " no-children";
    return menu_class;
  };
  /**
   * Affiche les termes de niveau 1 et va chercher ensuite les
   * autres niveaux grâce à la fonction renderSubMenu
   */
  renderDisplay = () => {
    //console.log("dans renderDisplay");

    this.index_table[0] = this.props.index;
    return (
      <li
        key={this.props.id}
        className={this.dumpMenuClass(this.props.selected, this.props.children)}
      >
        <a
          onClick={e => {
            e.preventDefault();

            this.index_table.splice(1);
            this.props.onDropdownToggle(e, this.index_table);
          }}
          href="."
        >
          {this.props.name}
        </a>
        {this.renderSubMenu(this.props.children, this.props.index, 1)}
      </li>
    );
  };

  /**
   * L'idée est de bien tenir à jour l'index_table en fonction des cas de figure
   * soit on a cliqué sur un terme de profondeur (depth) encore non atteinte et on ajoute à index_table
   * soit on est au même niveau et on modifie le niveau en cours
   * soit on est en dessous et on supprime les niveaux supérieur et on met à jour
   * le niveau en cours
   */
  renderSubMenu = (children, index, depth) => {
    //console.log("dans renderSubMenu", children);
    if (children != undefined) {
      return (
        <ul>
          {children.map((term, i) => {
            let submenu =
              term.children != undefined
                ? this.renderSubMenu(term.children, i, depth + 1)
                : undefined;
            return (
              <li
                key={term.id}
                className={this.dumpMenuClass(term.selected, term.children)}
              >
                <a
                  onClick={e => {
                    if (depth > this.index_table.length - 1)
                      this.index_table.push(i);
                    else if (depth === this.index_table.length - 1) {
                      this.index_table[depth] = i;
                      // cas où ce niveau était déja sélectionné : on referme
                      if (this.index_table[depth] == i)
                        this.index_table.splice(depth);
                    } else if (depth < this.index_table.length - 1) {
                      this.index_table.splice(depth + 1);
                      this.index_table[depth] = i;
                    }
                    this.props.onDropdownToggle(e, this.index_table);
                  }}
                  href="."
                  className={term.selected ? "selected" : "not-selected"}
                >
                  {term.name}
                </a>
                {submenu}
              </li>
            );
          })}
        </ul>
      );
    }
  };
  render() {
    return (
      <div className="dropdown dropdown--nested">{this.renderDisplay()}</div>
    );
  }
}
export default NestedDropdown;
