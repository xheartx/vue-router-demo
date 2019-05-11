var globalCons = {}
try {
  location.search.substr(1).split('&').forEach(function(item) {
    var s = item.split('=')
    globalCons[s[0]] = s[1]
  })
} catch (e) {
  throw new Error(JSON.stringify(e))
}
