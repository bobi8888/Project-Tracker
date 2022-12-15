function fixButton() {
  let activeRange = SpreadsheetApp.getActiveSheet().getActiveRange();
  let activeRangeBackground = activeRange.getBackground();
  let revisionColor = '#cfe2f3';

  return (activeRangeBackground === revisionColor) ? activeRange.setBackground(null) : activeRange.setBackground(revisionColor);
}

function revisionButton() {
  let activeRange = SpreadsheetApp.getActiveSheet().getActiveRange();
  let activeRangeBackground = activeRange.getBackground();
  let revisionColor = '#f4cccc';

  return (activeRangeBackground === revisionColor) ? activeRange.setBackground(null) : activeRange.setBackground(revisionColor);
}

function resetToReviewDrawing() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let filterCriteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(['', 'FALSE']).build();
  let drawnCheckboxes = activeSpreadsheet.getRange("C5:C");
  let toDrawCheckboxes = 2;

  drawnCheckboxes.clearContent();
  activeSpreadsheet.getFilter().setColumnFilterCriteria(toDrawCheckboxes, filterCriteria);
}
