'use strict';

/**
 * Global namespace for project
 * @namespace exampleProject
 */
var exampleProject = {
  /** The counter for the current new record **/
  cnt: 0,

  /**
   * Increase the counter when the add record button is clicked
   */
  addRecord: function() {
    $j('#addRecord').click(function() {
      exampleProject.cnt++;
    });
  },

  /**
   * Functions to execute when the page is loaded
   */
  displayPage: function() {
    exampleProject.addRecord();
  }
};

exampleProject.displayPage();
