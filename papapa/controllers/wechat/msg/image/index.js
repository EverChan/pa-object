'use strict';

/**
 * Module dependencies.
 */

var debug = require('debug')('maoxu-web:controllers:wechat');

var wechat = require('wechat');

var Users = require('../../../../models/wechat_users');
var ResModel = require('../../../../models/wechat_res');

var Utils = require('../../../../lib/utils');


//get /wechat
exports.resMsg = function * (req, raw,openid)
{

    var param = req.param;

    var remoteUrl = param.picUrl;
    var res = {
        msgType: 'image',
        content: {
            title: "你好，" + raw.ToUserName + '。你的头像已修改成功：' + raw.Content,
            picUrl: remoteUrl,
            mediaId: param.mediaId
        }
    };

    var fileData = Utils.downloadFile(remoteUrl, 'images');

    var url = fileData.urlPath + fileData.name + "." + fileData.suffix;

    yield ResModel.newRes({
        openid: openid,
        path: fileData.path,
        url: url,
        name: fileData.name,
        suffix: fileData.suffix
    });

    yield Users.updateByOpenId(openid, {
        pic: url
    });


    return yield res;
}