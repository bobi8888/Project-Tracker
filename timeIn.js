function timeInButton() {
  let ss = SpreadsheetApp.getActiveSheet();
  let timezone = Session.getScriptTimeZone();
  let timestamp_format = "HH:mm:ss";
  let time = Utilities.formatDate(new Date(), timezone, timestamp_format);
  let fieldToColor = ss.getRange('A2:E2');
  let timeInRangeDisplayValue = ss.getRange('C2').getDisplayValue();
  let green = '#31f640';
  let ui = SpreadsheetApp.getUi();
  let timeInRange = ss.getRange('D2');

  if (timeInRangeDisplayValue != ""){
    return ui.alert('You are already clocked in.')
  }

  timeInRange.setValue(time);
  fieldToColor.setBackground(green);
}
