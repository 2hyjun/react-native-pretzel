var _ = require('lodash');
exports.b64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

exports.encrypt = (key, data) => {
    xorEncrypt = (key, data) => {
        return _.map(data, function (c, i) {
            return c.charCodeAt(0) ^ key.charCodeAt(Math.floor(i % key.length));
        });
    },

    b64Encode = (data) => {
        var o1, o2, o3, h1, h2, h3, h4, bits, r, i = 0,
            enc = '';
        if (!data) {
            return data;
        }

        do {
            o1 = data[i++];
            o2 = data[i++];
            o3 = data[i++];
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            enc += b64Table.charAt(h1) + b64Table.charAt(h2) + b64Table.charAt(h3) + b64Table.charAt(h4);
        } while (i < data.length);
        r = data.length % 3;
        return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
    },

    data = this.xorEncrypt(key, data);
    return this.b64Encode(data);
};