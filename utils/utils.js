var fs = require('fs'),
    crypto = require('crypto'),
    path = require('path');

exports.mimes_types = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml"
};

exports.requireUncache = function(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

exports.readFile = function(filePath, charset, callback) {
    path.exists(filePath, function(exists) {
        if (!exists) {
            return callback("文件不存在！");
        } else {
            //找到文件在这里进行处理
            fs.readFile(filePath, charset, function(err, file) {
                if (err) {
                    return callback(err);
                } else {
                    return callback(file.toString());
                }
            });
        }
    });
}

/**
 * [checkFileExist 判断文件在Projects文件夹中是否存在]如果pageName.ejs存在 返回true 否则返回false 其他的文件如若不存在则自动创建
 * @param  {[string]} projectName
 * @param  {[string]} pageName
 * @return {[boolean]}
 */
exports.checkFileExist = function(projectName, pageName, callback) {
    var realPath = path.join(__dirname, '../../Projects/' + projectName + '/pages/' + pageName),
        realPathEjs = realPath + '.ejs',
        realPathConfig = realPath + '.config.json',
        realPathData = realPath + '.data.json';

    fs.exists(realPathEjs, function(exists) {
        if (!exists) {
            return callback(false);
        } else {
            fs.exists(realPathConfig, function(configExists) {
                if (!configExists) {
                    fs.open(realPathConfig, "w", 0644, function(e, fd) {
                        if (e) throw e;
                        fs.write(fd, "{}", 0, 'utf8', function(e) {
                            if (e) throw e;
                            fs.closeSync(fd);
                            // return callback(true);
                        })
                    });
                }else{
                    // return callback(true);
                }
            })
            fs.exists(realPathData, function(dataExists) {
                if (!dataExists) {
                    fs.open(realPathData, "w", 0644, function(e, fd) {
                        if (e) throw e;
                        fs.write(fd, "{}", 0, 'utf8', function(e) {
                            if (e) throw e;
                            fs.closeSync(fd);
                            // return callback(true);
                        })
                    });
                }else{
                    // return callback(true);
                }
            })
            return callback(true);
        }
    });
}

/**
 * [继承]
 * @return 让o1继承o2
 */
exports.extend = function(o1,o2){
    if(typeof o1 === 'object' && typeof o2 === 'object'){
        for(o in o2){
            o1[o] = o2[o];
        }
        return true;
    }else{
        console.error("extend类型异常")
    }
}

/*
 *   读取目录下所有文件的文件名  返回数组
 *   param1 路径名 绝对路径
 *   param2 是否只输出文件名 不带后缀名
 *   param3 得到后缀名为的extName的数组
 *
 */
exports.getDirFileNames = function(filePath, isModule, extName) {
    var files = fs.readdirSync(filePath);
    var fileNames = [];
    for (var i = 0; i < files.length; i++) {
        if (isModule) {
            if (extName) {
                if (path.extname(files[i]) === extName) {
                    fileNames.push(path.basename(files[i], extName));
                }
            } else {
                fileNames.push(path.basename(files[i], path.extname(files[i])));
            }
        } else {
            if (extName) {
                if (path.extname(files[i]) === extName) {
                    fileNames.push(path.basename(files[i]));
                }
            } else {
                fileNames.push(path.basename(files[i]));
            }
        }
    }
    return fileNames;
}

/**
 * 获取随机md5字符串 日期＋随机数字 md5
 */
exports.getRandomMd5 = function() {
    var md5 = crypto.createHash('md5'),
        date = new Date();
    return md5.update((date.getTime() + Math.ceil(Math.random() * 1000)).toString()).digest('hex');
}