const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../models')
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({  //첫번째 객체와 그에대한 두번째 함수. 함수에서 로그인 전략 구상한다
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where: { email: email }
            });
            if (!user) {
                return done(null, false, { reason: '존재하지 않는 사용자입니다!' })   //첫번째 매개변수: 서버에러, 두번째: 성공, 세번째: 클라이언트 에러

            };
            const result = await bcrypt.compare(password, user.password)  //사용자가 입력한 password와 db에 저장된 password 비교 
            if (result) {
                return done(null, user)  //두번째 인수인 성공햇을 때 사용자 정보 넘겨주기

            }
            return done(null, false, { reason: '비밀번호가 틀렸습니다.' })

        } catch (error) {
            console.error(error);
            return done(error);

        }



    }))
}