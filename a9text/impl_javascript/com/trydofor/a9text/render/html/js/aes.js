/**
UTF8(BOM)  LGPL  trydofor.com  Mar.2008
===========================================================
*/
if (typeof (__A9TEXT_AAES__) == 'undefined')
    var __A9TEXT_AAES__ = {
        desImpl: new AESClass(),
        b64Impl: new B64Class(),
        decrypt: function (obj, b64) {
            if (obj == null) return;
            var encryptStr = obj.innerHTML;
            encryptStr = encryptStr.replace(/<.+?>/gim, ''); // html tag
            encryptStr = encryptStr.replace(/--.+\s/gi, ''); // ruler
            encryptStr = encryptStr.replace(/\s/g, ''); // blank
            if (encryptStr.length > 0) {
                var passwd = window.prompt('please input your passwd', '');
                if (passwd != null && passwd != '') {
                    var decryptStr = __A9TEXT_AAES__.desImpl.decrypt(__A9TEXT_AAES__.b64Impl.decode(encryptStr), passwd, 256);
                    var win = window.open('', 'A9Text_AES', 'height=200,width=400,toolbar=no,menubar=no,location=no,status=no,resizable=yes,scrollbars=yes');
                    win.document.write("<!DOCTYPE HTML><html><head> ");
                    win.document.write("<meta content='text/html; charset=utf-8' http-equiv='content-type'>");
                    win.document.write("<meta name='viewport' content='width=device-width, initial-scale=1'/>");
                    win.document.write("</head><body>");
                    if (b64) {
                        if (/^data:.*;base64,/.test(decryptStr)) {
                            if (decryptStr.indexOf('image') >= 0) {
                                win.document.write("<img src='" + decryptStr + "'></img>");
                            } else {
                                win.document.write("<a download='" + decryptStr + "' href='" + decryptStr + "'>click to download</a>");
                            }
                        } else {
                            win.document.write(decryptStr);
                        }
                    } else {
                        win.document.write("<div style='font-size:120%'><p>" + 
                        decryptStr
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/[\r\n]+/g,'</p><p>') + 
                        "</p></div>");
                    }
                    win.document.write("</body></html>");
                    win.document.close();
                }
            }
        }
    }