function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	},
	noticeTime:function(timeStamp){ // 显示今天、明天、后天、日期，月份、年
		var diff = timeStamp - new Date().getTime();
		console.log(diff)
		var timeStart = new Date(timeStamp);
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		if(diff < this.UNITS['天']){
			return '今天';
		}else if(diff/this.UNITS['天']<3){
			return '明天';
		}else if(diff/this.UNITS['天']<4){
			return '后天';
		}else if(diff<this.UNITS['月']){
			return _format(timeStart.getDate())+'日';
		}else if(diff<this.UNITS['年']){
			return  _format(timeStart.getMonth() + 1) + '-' + _format(timeStart.getDate());
		}else{
			return timeStart.getFullYear() + '-' + _format(timeStart.getMonth() + 1) + '-' + _format(timeStart.getDate())
		}
	}
};
function playCount(number){
	if(number>=100000000){
		return Number.parseFloat(number/100000000).toFixed(2)+'亿';
	}else if(number>=100000){
		return Number.parseFloat(number/100000).toFixed(2)+'万';
	}else{
		return number;
	}
}; 
 // 将相同字段title的值放到同一数组中
function mergeObject(data,type,bucket,iv,url) {
    var arrayFilted = [];
    data.forEach(function(value, key) {
        if(arrayFilted.length == 0) {
            arrayFilted.push({
                title: value[type],
                bucket: [value[bucket]],
                iv: [value[iv]],
				url:value[url]
            });
        } else {
            arrayFilted.forEach(function(item, index) {
                if(item.title && item.title !== value[type]) {
                    arrayFilted.push({
                        title: value[type],
                        bucket: [value[bucket]],
                        iv: [value[iv]],
						url:value[url]
                    });
                } else if(item.title && item.title === value[type]) {
                    item.bucket.push(value[bucket])
                    item.iv.push(value[iv])
                }
            });
        }
    });
    return arrayFilted;
};

 //去重
function Es5duplicate(arr, type) {
    var newArr = [];
    var tArr = [];
    if(arr.length == 0) {
        return arr;
    } else {
        if(type) {
            for(var i = 0; i < arr.length; i++) {
                if(!tArr[arr[i][type]]) {
                    newArr.push(arr[i]);
                    tArr[arr[i][type]] = true;
                }
            }
            return newArr;
        } else {
            for(var i = 0; i < arr.length; i++) {
                if(!tArr[arr[i]]) {
                    newArr.push(arr[i]);
                    tArr[arr[i]] = true;
                }
            }
            return newArr;
        }
    }
};
module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	playCount:playCount,
	mergeObject:mergeObject,
	Es5duplicate:Es5duplicate
}
