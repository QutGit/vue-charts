// 将url参数转为对象类型
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse(
      '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
    )
}
// 修正 toFixed方法 四舍五入问题
Number.prototype.toFixed = String.prototype.toFixed = function (decimal) {
  decimal = decimal || 0;
  var s = String(this);
  var decimalIndex = s.indexOf('.');
  if (decimalIndex < 0) {
      var fraction = '';
      for (var i = 0; i < decimal; i++) {
          fraction += '0';
      }
      return s + '.' + fraction;
  }
  var numDigits = s.length - 1 - decimalIndex;
  if (numDigits <= decimal) {
      var fraction = '';
      for (var i = 0; i < decimal - numDigits; i++) {
          fraction += '0';
      }
      return s + fraction;
  }
  var digits = s.split('');
  var pos = decimalIndex + decimal;
  var roundDigit = digits[pos + 1];
  if (roundDigit > 4) {
      //跳过小数点
      if (pos == decimalIndex) {
          --pos;
      }
      digits[pos] = Number(digits[pos] || 0) + 1;
      //循环进位
      while (digits[pos] == 10) {
          digits[pos] = 0;
          --pos;
          if (pos == decimalIndex) {
              --pos;
          }
          digits[pos] = Number(digits[pos] || 0) + 1;
      }
  }
  //避免包含末尾的.符号
  if (decimal == 0) {
      decimal--;
  }
  return digits.slice(0, decimalIndex + decimal + 1).join('');
}

// 流下载
export function downloadFile (blob, tagFileName, fileType) {
  let downloadElement = document.createElement('a')
  let href = blob
  if (typeof blob == 'string') {
    downloadElement.target = '_blank'
  } else {
    href = window.URL.createObjectURL(blob) //创建下载的链接
  }
  downloadElement.href = href
  downloadElement.download = tagFileName + '.' + fileType //下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() //点击下载
  document.body.removeChild(downloadElement) //下载完成移除元素
  if (typeof blob != 'string') {
    window.URL.revokeObjectURL(href) //释放掉blob对象
  }
}

// 获取文件后缀名
export function getExt(filePath){
	var startIndex = filePath.lastIndexOf(".")
	if(startIndex != -1)
		return filePath.substring(startIndex+1, filePath.length).toLowerCase()
	else return ""
}

// 验证移动端
export function isMobile () {
  let info = navigator.userAgent;
  let agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod", "iPad"];
  for(let i = 0; i < agents.length; i++){
    if(info.indexOf(agents[i]) >= 0) return true;
  }
  return false;
}

/**
 * 判断是否支持webp格式图片
 */
 export function supportWebp() {
  try {
    return (
      document
        .createElement('canvas')
        .toDataURL('image/webp', 0.5)
        .indexOf('data:image/webp') === 0
    )
  } catch (err) {
    return false
  }
}
