function onEdit(e) {
  const ss = SpreadsheetApp.getActiveSheet();
  const metal = SpreadsheetApp.getActive().getSheetByName('MetalRFQ');
  const mdf = SpreadsheetApp.getActive().getSheetByName('MDFRFQ');

  let criteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(['TRUE']).build();

  if (ss.getSheetName() === 'DRF' || ss.getSheetName() === 'Copy of DRF') {
    if (ss.getCurrentCell().getValue() === true && ss.getCurrentCell().getColumn() === 3) {
      ss.getFilter().setColumnFilterCriteria(3, criteria);
    }
  }

  if (ss.getSheetName() === 'DRF' || ss.getSheetName() === 'Copy of DRF') {
    return;
  } else {
    // let lastCol = ss.getLastColumn();
    if (e !== "") {
      // for (let i=1; i <= lastCol; i ++){
      //   ss.autoResizeColumn(i);
      ss.autoResizeColumn(ss.getActiveRange().getColumn());
      metal.autoResizeColumns(1, metal.getLastColumn());
      mdf.autoResizeColumns(1, mdf.getLastColumn());

    }
  }
}


//DRF CODE
function resetToReviewDrawing() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let filterCriteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(['', 'FALSE']).build();
  let drawnCheckboxes = activeSpreadsheet.getRange("C5:C");
  let toDrawCheckboxes = 2;

  drawnCheckboxes.clearContent();
  activeSpreadsheet.getFilter().setColumnFilterCriteria(toDrawCheckboxes, filterCriteria);
}

function filterToDrawCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let filterCriteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(['', 'FALSE']).build();
  let toDrawCheckboxes = 2;

  activeSpreadsheet.getFilter().setColumnFilterCriteria(toDrawCheckboxes, filterCriteria);
}

function filterDrawnCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let filterCriteria = SpreadsheetApp.newFilterCriteria().setHiddenValues(['TRUE']).build();
  let drawnCheckboxes = 3;

  activeSpreadsheet.getFilter().setColumnFilterCriteria(drawnCheckboxes, filterCriteria);
}

function unfilterToDrawCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let toDrawCheckboxes = 2;

  activeSpreadsheet.getFilter().removeColumnFilterCriteria(toDrawCheckboxes);
}

function unfilterDrawnCheckboxes() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSheet();
  let drawnCheckboxes = 3;

  activeSpreadsheet.getFilter().removeColumnFilterCriteria(drawnCheckboxes);
}

function revisionButton() {
  let activeRange = SpreadsheetApp.getActiveSheet().getActiveRange();
  let activeRangeBackground = activeRange.getBackground();
  let revisionColor = '#f4cccc';

  return (activeRangeBackground === revisionColor) ? activeRange.setBackground(null) : activeRange.setBackground(revisionColor);
}

function fixButton() {
  let activeRange = SpreadsheetApp.getActiveSheet().getActiveRange();
  let activeRangeBackground = activeRange.getBackground();
  let revisionColor = '#cfe2f3';

  return (activeRangeBackground === revisionColor) ? activeRange.setBackground(null) : activeRange.setBackground(revisionColor);
}

function timeIn() {
  let ss = SpreadsheetApp.getActiveSheet();
  let timezone = Session.getScriptTimeZone();
  let timestamp_format = "MM/dd/yy HH:mm:ss";
  let date = Utilities.formatDate(new Date(), timezone, timestamp_format);
  let ui = SpreadsheetApp.getUi();
  let version = ss.getRange('B2');
  let currentV = ss.getRange('B2').getValue();
  let timeField = ss.getRange('B2:F2');
  let pauseCheckbox = ss.getRange('F2').getDisplayValue();
  let checkbox = ss.getRange('F2');
  let timeIn = function () {
    ss.getRange('C2').setValue(date);
    timeField.setBackground('#31f640');
    checkbox.activate();
    ss.getCurrentCell().setValue('FALSE');
    ss.getRange('D2').clearContent();
  }

  if (pauseCheckbox === 'TRUE') {
    timeIn()
    return;
  }

  if (currentV !== 0 || pauseCheckbox === 'TRUE') {
    let newVersionAlert = ui.alert('Are you working on a new version?', ui.ButtonSet.YES_NO);
    newVersionAlert;
    if (newVersionAlert == ui.Button.YES) {
      version.setValue(currentV + 1);
      timeIn()
      return;
    } else {
      timeIn();
      return;
    }
  }

  version.setValue(1);
  timeIn()
}

function pause() {
  let ss = SpreadsheetApp.getActiveSheet();
  let timezone = Session.getScriptTimeZone();
  let timestamp_format = "MM/dd/yy HH:mm:ss";
  let date = Utilities.formatDate(new Date(), timezone, timestamp_format);
  let ui = SpreadsheetApp.getUi();
  let pauseCheckbox = ss.getRange('F2').getDisplayValue();
  let currentV = ss.getRange('B2').getDisplayValue();
  let timeField = ss.getRange('B2:F2');
  let checkbox = ss.getRange('F2');
  let pauseTime = ss.getRange('D2');
  let timeIn = ss.getRange('C2');
  let inAndPause = ss.getRange('C2:D2').getValue();

  const pause = () => {
    pauseTime.setValue(date);
    checkbox.activate();
    ss.getCurrentCell().setValue('TRUE');
    timeField.setBackground('yellow');
    let timeWorked = ss.getRange('E2').getDisplayValue();
    let cTo = ss.getRange('J3');
    cTo.setValue(timeWorked);
    let mFrom = ss.getRange('J3:J20');
    let mTo = ss.getRange('J4');
    mFrom.moveTo(mTo);
  }

  const resume = (color) => {
    timeIn.setValue(date);
    ss.getRange('D2').clearContent();
    timeField.setBackground(color);
    ss.getRange('F2').activate();
    ss.getCurrentCell().setValue('FALSE');
  }

  if (currentV === 0) {
    ui.alert('Could you just...clock in? \nCan you do that for me? \nThanks.')
    return;
  }

  if (currentV > 0 && inAndPause === '') {
    ui.alert('Could you just...clock in? \nCan you do that for me? \nThanks.')
    return;
  }

  if (currentV !== 0 && pauseCheckbox === 'TRUE') {
    resume('#31f640')
  } else {
    pause()
  }
}

function timeOut() {
  let ss = SpreadsheetApp.getActiveSheet();
  let timezone = Session.getScriptTimeZone();
  let timestamp_format = "MM/dd/yy HH:mm:ss";
  let date = Utilities.formatDate(new Date(), timezone, timestamp_format);
  let ui = SpreadsheetApp.getUi();
  let timeField = ss.getRange('B2:F2');
  let wipe = ss.getRangeList(['C2:D2', 'J4:J']);
  let pauseCheckbox = ss.getRange('F2').getDisplayValue();

  const out = () => {
    timeField.setBackground(null);
    ss.getRange('G5:H20').moveTo(ss.getRange('G6'));
    ss.getRange('G5').setValue(ss.getRange('B2').getDisplayValue());
    let versionTotal = ss.getRange('G2').getDisplayValue();
    ss.getRange('H5').setValue(versionTotal);
    ss.getRange('I5').setFormula('=sum(H5:H)');
    wipe.clearContent();
    ss.getRange('G5:H').setHorizontalAlignment('center');
    ss.getRange('F2').setValue('FALSE');
  }

  if (ss.getRange('C2').getValue() === "") {
    ui.alert('Could you just...clock in? \nCan you do that for me? \nThanks.')
  } else if (pauseCheckbox === 'TRUE') {
    out()
  } else {
    ss.getRange('D2').setValue(date);
    let timeWorked = ss.getRange('E2').getDisplayValue();
    let cTo = ss.getRange('J3');
    cTo.setValue(timeWorked);
    let mFrom = ss.getRange('J3:J20');
    let mTo = ss.getRange('J4');
    mFrom.moveTo(mTo);
    out()
  }
}

function measure() {
  let ss = SpreadsheetApp.getActiveSheet();
  ss.insertColumnsAfter(5, 5);
  ss.setColumnWidths(6, 9, 57);
  ss.getRange('J1:J').setBackground(null);
  ss.getRange('A1:D11').copyTo(ss.getRange('f1'));
}
