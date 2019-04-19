export default function timeFormat (timestamp) {
  var _date = new Date(timestamp * 1000)
  var _year = _date.getFullYear()
  var _month = (_date.getMonth() + 1)
  if (_month < 10) {
    _month = '0' + _month
  }
  var _day = _date.getDate()
  if (_day < 10) {
    _day = '0' + _day
  }
  var _hour = _date.getHours()
  if (_hour < 10) {
    _hour = '0' + _hour
  }
  var _mint = _date.getMinutes()
  if (_mint < 10) {
    _mint = '0' + _mint
  }
  return _year + '.' + _month + '.' + _day + '  ' + _hour + ':' + _mint
}
