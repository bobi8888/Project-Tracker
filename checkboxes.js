function filterDrawnCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let filterCriteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(['TRUE']).build();
  let drawnCheckboxes = 3;

  activeSpreadsheet.getFilter().setColumnFilterCriteria(drawnCheckboxes, filterCriteria);
}

function filterToDrawCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let filterCriteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(['', 'FALSE']).build();
  let toDrawCheckboxes = 2;

  activeSpreadsheet.getFilter().setColumnFilterCriteria(toDrawCheckboxes, filterCriteria);
}

function unfilterDrawnCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let drawnCheckboxes = 3;

  activeSpreadsheet.getFilter().removeColumnFilterCriteria(drawnCheckboxes);
}

function unfilterToDrawCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let toDrawCheckboxes = 2;

  activeSpreadsheet.getFilter().removeColumnFilterCriteria(toDrawCheckboxes);
}
