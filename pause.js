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
