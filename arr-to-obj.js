exports.intoObj = function(arr) {
  let obj = {}
  obj.id = arr[0]
  obj.specs = {}
  obj.specs.mvmt = {}

  let test = ['caseback', 'crystal', 'crown', 'bracelet', 'bezel', 'strap', 'water', 'diameter', 'thickness', 'size']
  // putting movement info into obj.specs.mvmt
  for (var i = 0; i <  arr[1].length; i++) {
    if (arr[1][i] !== '') {
      obj.specs.mvmt['mvmt' + i] = arr[1][i]
    } else {
      arr[1].splice(0, arr[1].indexOf(arr[1][i]))
      break
    }
  }

  let check = (string, num, item) => {
    if (arr[1][num].indexOf(string) >= 0 || arr[1][num].indexOf(string[0].toUpperCase() + string.slice(1, string.length)) >= 0) {
      obj.specs[item] = arr[1][num].split(' ').join(' ')
    }
    else {
      return false
    }
  }

  for (var n = 0; n < arr[1].length; n++) {
    check('steel case', n, 'case')
    check('Titanium case', n, 'case')
    for (var l = 0; l < test.length; l++) {
      if ( obj.specs.hasOwnProperty(test[l]) == false && obj.specs.mvmt.hasOwnProperty(test[l]) == false) {
        check(test[l], n, test[l])
      }
    }
  }
  return obj
}
