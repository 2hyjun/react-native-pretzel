const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'pretzel.summertime@gmail.com',
        pass: 'pretzel123',
    }
});

let mailOptions = {  
    from: '프레첼 <pretzel.summertime@pusan.ac.kr>',
    to: 'biper94@pusan.ac.kr',
    subject: 'Nodemailer 테스트',
    text: '평문 보내기 테스트 '
};

transporter.sendMail(mailOptions);
const sendMail = () => {
    transporter.sendMail(mailOptions)
        .then((info) => {
            console.log(info);
        })
        .catch(e => console.error(e));
};

module.exports = sendMail;
