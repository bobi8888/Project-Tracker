function pause_timeOutButton() {
  let ss = SpreadsheetApp.getActiveSheet();
  let timezone = Session.getScriptTimeZone();
  let timestamp_format = "HH:mm:ss";
  let currentTime = Utilities.formatDate(new Date(), timezone, timestamp_format);
  let ui = SpreadsheetApp.getUi();
  let fieldToColor = ss.getRange('A2:E2');

  let timeInRange = ss.getRange('D2');
  let timeOutRange = ss.getRange('E2');

  if (timeInRange.getValue() === "") {
    return ui.alert('Please clock in first.')
  }

  let setTimeOut = () =>{
  timeOutRange.setValue(currentTime);
  }
  setTimeOut();

  let print = ss.getRange('A2');
  let newTotal = ss.getRange('H2').getDisplayValue();
  let oldTotal = ss.getRange('G2');

  let copytoprint = () => {
    print.setValue(newTotal);
  }
  copytoprint();

  oldTotal.setValue(newTotal);
  timeInRange.clear();
  timeOutRange.clear();
  fieldToColor.setBackground(null);
}
